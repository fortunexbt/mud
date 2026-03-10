"use client";

import { useEffect, useMemo, useState, useTransition, type FormEvent, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import type { SiteDictionary } from "@/content/site";
import type { Locale } from "@/lib/i18n-config";
import { leadSchema, type LeadInput } from "@/lib/forms";
import { cn } from "@/lib/utils";

type FormType = "contact" | "inquiry";
type Interest = NonNullable<LeadInput["interest"]>;

interface LeadFormProps {
  locale: Locale;
  dictionary: SiteDictionary;
  formType: FormType;
  configured: boolean;
  initialInterest?: Interest;
  className?: string;
}

type Status = "idle" | "success" | "error" | "configuration";

const errorMessages = {
  pt: {
    required: "Preencha este campo.",
    email: "Digite um e-mail válido.",
    message: "Escreva uma mensagem com um pouco mais de contexto.",
    interest: "Selecione o tipo de interesse.",
  },
  es: {
    required: "Completa este campo.",
    email: "Escribe un correo válido.",
    message: "Escribe un mensaje con un poco más de contexto.",
    interest: "Selecciona el tipo de interés.",
  },
  en: {
    required: "Please fill out this field.",
    email: "Please enter a valid email.",
    message: "Please share a little more context.",
    interest: "Please choose an interest.",
  },
} as const;

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
  interest: "" as Interest | "",
  preferredLanguage: "",
  availability: "",
  foundUs: "",
  childAge: "",
  consent: false,
  company: "",
};

export function LeadForm({
  locale,
  dictionary,
  formType,
  configured,
  initialInterest,
  className,
}: LeadFormProps) {
  const [form, setForm] = useState({ ...initialValues, interest: initialInterest || "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>(configured ? "idle" : "configuration");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stored = {
      utmSource: params.get("utm_source") || "",
      utmMedium: params.get("utm_medium") || "",
      utmCampaign: params.get("utm_campaign") || "",
      utmTerm: params.get("utm_term") || "",
      utmContent: params.get("utm_content") || "",
    };

    if (Object.values(stored).some(Boolean)) {
      window.localStorage.setItem("mud:utm", JSON.stringify(stored));
    }
  }, []);

  const localeErrors = errorMessages[locale];

  const interestRequired = formType === "inquiry";
  const showInterestField = formType === "inquiry";

  const optionalDetails = {
    pt: {
      label: "Informações complementares",
      hint: "Disponibilidade, idioma e contexto ajudam a MUD a responder com mais precisão.",
    },
    es: {
      label: "Más detalles",
      hint: "Disponibilidad, idioma y contexto ayudan a MUD a responder con más precisión.",
    },
    en: {
      label: "More details",
      hint: "Availability, language, and context help MUD respond with more precision.",
    },
  }[locale];

  const responseMessage = useMemo(() => {
    if (status === "success") {
      return {
        title: dictionary.form.successTitle,
        body: dictionary.form.successBody,
        tone: "success",
      };
    }

    if (status === "error") {
      return {
        title: dictionary.form.errorTitle,
        body: dictionary.form.errorBody,
        tone: "error",
      };
    }

    if (status === "configuration") {
      return {
        title: dictionary.form.configurationTitle,
        body: dictionary.form.configurationBody,
        tone: "warning",
      };
    }

    return null;
  }, [dictionary.form, status]);

  const setField = (field: keyof typeof form, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (status !== (configured ? "idle" : "configuration")) {
      setStatus(configured ? "idle" : "configuration");
    }
    setErrors((current) => {
      if (!current[field as string]) return current;
      const next = { ...current };
      delete next[field as string];
      return next;
    });
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!form.firstName.trim()) nextErrors.firstName = localeErrors.required;
    if (!form.lastName.trim()) nextErrors.lastName = localeErrors.required;
    if (!form.email.trim()) nextErrors.email = localeErrors.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = localeErrors.email;
    if (!form.phone.trim()) nextErrors.phone = localeErrors.required;
    if (!form.message.trim()) nextErrors.message = localeErrors.required;
    else if (form.message.trim().length < 10) nextErrors.message = localeErrors.message;
    if (interestRequired && !form.interest) nextErrors.interest = localeErrors.interest;
    if (!form.consent) nextErrors.consent = localeErrors.required;

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      setStatus(configured ? "idle" : "configuration");
      return;
    }

    startTransition(async () => {
      const storedUtm = window.localStorage.getItem("mud:utm");
      const parsedUtm = storedUtm ? (JSON.parse(storedUtm) as Record<string, string>) : {};

      const payload: LeadInput = {
        formType,
        locale,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        message: form.message,
        interest: (form.interest || undefined) as LeadInput["interest"],
        preferredLanguage: (form.preferredLanguage || locale) as LeadInput["preferredLanguage"],
        availability: form.availability || undefined,
        foundUs: form.foundUs || undefined,
        childAge: form.interest === "kids" && form.childAge ? form.childAge : undefined,
        consent: form.consent,
        company: form.company,
        pagePath: window.location.pathname,
        referrer: document.referrer || undefined,
        utmSource: parsedUtm.utmSource || undefined,
        utmMedium: parsedUtm.utmMedium || undefined,
        utmCampaign: parsedUtm.utmCampaign || undefined,
        utmTerm: parsedUtm.utmTerm || undefined,
        utmContent: parsedUtm.utmContent || undefined,
      };

      const result = leadSchema.safeParse(payload);

      if (!result.success) {
        setStatus("error");
        return;
      }

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      });

      if (response.ok) {
        setStatus("success");
        setForm({ ...initialValues, interest: initialInterest || "" });
        setErrors({});
        return;
      }

      if (response.status === 503) {
        setStatus("configuration");
        return;
      }

      setStatus("error");
    });
  };

  return (
    <div className={cn("space-y-4", className)}>
      {responseMessage ? (
        <div
          className={cn(
            "rounded-[1.25rem] border px-4 py-3 text-sm leading-6 sm:rounded-[1.5rem]",
            responseMessage.tone === "success" && "border-emerald-200 bg-emerald-50 text-emerald-900",
            responseMessage.tone === "error" && "border-red-200 bg-red-50 text-red-900",
            responseMessage.tone === "warning" && "border-amber-200 bg-amber-50 text-amber-900",
          )}
          role="status"
          aria-live="polite"
        >
          <strong className="block font-semibold">{responseMessage.title}</strong>
          <span>{responseMessage.body}</span>
        </div>
      ) : null}

      <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label={dictionary.form.labels.firstName}
            error={errors.firstName}
            input={
              <input
                value={form.firstName}
                onChange={(event) => setField("firstName", event.target.value)}
                className={inputClasses(errors.firstName)}
                placeholder={dictionary.form.placeholders.firstName}
                autoComplete="given-name"
              />
            }
          />
          <Field
            label={dictionary.form.labels.lastName}
            error={errors.lastName}
            input={
              <input
                value={form.lastName}
                onChange={(event) => setField("lastName", event.target.value)}
                className={inputClasses(errors.lastName)}
                placeholder={dictionary.form.placeholders.lastName}
                autoComplete="family-name"
              />
            }
          />
          <Field
            label={dictionary.form.labels.email}
            error={errors.email}
            input={
              <input
                value={form.email}
                onChange={(event) => setField("email", event.target.value)}
                className={inputClasses(errors.email)}
                placeholder={dictionary.form.placeholders.email}
                type="email"
                autoComplete="email"
              />
            }
          />
          <Field
            label={dictionary.form.labels.phone}
            error={errors.phone}
            input={
              <input
                value={form.phone}
                onChange={(event) => setField("phone", event.target.value)}
                className={inputClasses(errors.phone)}
                placeholder={dictionary.form.placeholders.phone}
                autoComplete="tel"
              />
            }
          />
          {showInterestField ? (
            <Field
              label={dictionary.form.labels.interest}
              error={errors.interest}
              input={
                <select
                  value={form.interest}
                  onChange={(event) => setField("interest", event.target.value)}
                  className={inputClasses(errors.interest)}
                >
                  <option value="">—</option>
                  {Object.entries(dictionary.form.interests).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              }
            />
          ) : null}
          <Field
            label={dictionary.form.labels.message}
            error={errors.message}
            className="sm:col-span-2"
            input={
              <textarea
                value={form.message}
                onChange={(event) => setField("message", event.target.value)}
                className={cn(inputClasses(errors.message), "min-h-[9rem] resize-y rounded-[1.25rem] sm:min-h-[10rem] sm:rounded-[1.5rem]")}
                placeholder={dictionary.form.placeholders.message}
              />
            }
          />
        </div>

        <details className="group rounded-[1.5rem] border border-outline/50 bg-white/50 px-4 py-4 shadow-soft transition-colors hover:bg-white/80">
          <summary className="cursor-pointer list-none">
            <span className="flex items-center justify-between gap-4 text-sm font-semibold text-ink">
              {optionalDetails.label}
              <span className="text-terracotta transition group-open:rotate-45">+</span>
            </span>
            <span className="mt-2 block text-[0.85rem] leading-6 text-muted">{optionalDetails.hint}</span>
          </summary>

          <div className="mt-4 grid gap-4 border-t border-outline/50 pt-4 sm:grid-cols-2">
            <Field
              label={dictionary.form.labels.preferredLanguage}
              input={
                <select
                  value={form.preferredLanguage}
                  onChange={(event) => setField("preferredLanguage", event.target.value)}
                  className={inputClasses()}
                >
                  <option value="">{dictionary.form.languages[locale]}</option>
                  {Object.entries(dictionary.form.languages).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              }
            />
            <Field
              label={dictionary.form.labels.availability}
              input={
                <input
                  value={form.availability}
                  onChange={(event) => setField("availability", event.target.value)}
                  className={inputClasses()}
                  placeholder={dictionary.form.placeholders.availability}
                />
              }
            />
            <Field
              label={dictionary.form.labels.foundUs}
              input={
                <select
                  value={form.foundUs}
                  onChange={(event) => setField("foundUs", event.target.value)}
                  className={inputClasses()}
                >
                  <option value="">—</option>
                  {dictionary.form.foundUsOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              }
            />
            {form.interest === "kids" ? (
              <Field
                label={dictionary.form.labels.childAge}
                className="sm:col-span-2"
                input={
                  <input
                    value={form.childAge}
                    onChange={(event) => setField("childAge", event.target.value)}
                    className={inputClasses()}
                    placeholder={dictionary.form.placeholders.childAge}
                  />
                }
              />
            ) : null}
          </div>
        </details>

        <input
          value={form.company}
          onChange={(event) => setField("company", event.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <label className="flex items-start gap-3 rounded-[1.25rem] border border-outline/50 bg-white/72 px-4 py-3 text-sm leading-6 text-muted sm:rounded-[1.5rem]">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(event) => setField("consent", event.target.checked)}
            className="mt-1 h-4 w-4 rounded border-outline text-terracotta focus:ring-terracotta"
          />
          <span>
            <span className="font-medium text-ink">{dictionary.form.labels.consent}</span>
            <span className="mt-1 block text-xs leading-5 text-muted/90">{dictionary.form.consentHint}</span>
            {errors.consent ? <span className="mt-1 block text-xs text-red-700">{errors.consent}</span> : null}
          </span>
        </label>

        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? `${dictionary.common.loading}...` : dictionary.form.labels.submit}
          </Button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  input,
  error,
  className,
}: {
  label: string;
  input: ReactNode;
  error?: string;
  className?: string;
}) {
  return (
    <label className={cn("grid gap-2 text-sm font-medium text-ink", className)}>
      <span>{label}</span>
      {input}
      {error ? <span className="text-xs text-red-700">{error}</span> : null}
    </label>
  );
}

function inputClasses(error?: string) {
  return cn(
    "min-h-11 rounded-[1.25rem] border bg-white/60 px-4 text-[0.95rem] text-ink outline-none transition-all placeholder:text-muted/65 focus:border-terracotta focus:bg-white focus:ring-4 focus:ring-terracotta/10 sm:min-h-12 sm:rounded-2xl",
    error ? "border-red-300" : "border-outline/40 hover:border-outline/80",
  );
}
