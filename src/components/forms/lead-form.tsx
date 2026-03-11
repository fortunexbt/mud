"use client";

import { useEffect, useActionState } from "react";
import { Button } from "@/components/ui/button";
import type { SiteDictionary } from "@/content/site";
import type { Locale } from "@/lib/i18n-config";
import type { LeadInput } from "@/lib/forms";
import { cn } from "@/lib/utils";
import { submitLeadAction } from "@/app/actions/leads";

type FormType = "contact" | "inquiry";
type Interest = NonNullable<LeadInput["interest"]>;

interface LeadFormProps {
  locale: Locale;
  dictionary: SiteDictionary;
  formType: FormType;
  initialInterest?: Interest;
  className?: string;
}

export function LeadForm({
  locale,
  dictionary,
  formType,
  initialInterest,
  className,
}: LeadFormProps) {
  const [state, formAction, isPending] = useActionState(submitLeadAction, null);


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

  const getResponseMessage = () => {
    if (!state) return null;
    if (state.ok) {
      return {
        title: dictionary.form.successTitle,
        body: dictionary.form.successBody,
        tone: "success",
      };
    }
    if (state.status === 503) {
      return {
        title: dictionary.form.configurationTitle,
        body: dictionary.form.configurationBody,
        tone: "warning",
      };
    }
    return {
      title: dictionary.form.errorTitle,
      body: dictionary.form.errorBody,
      tone: "error",
    };
  };

  const responseMessage = getResponseMessage();

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

      <form className="grid gap-4" action={formAction} noValidate>
        {/* Hidden inputs to capture context that was previously managed via state */}
        <input type="hidden" name="formType" value={formType} />
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="pagePath" value={typeof window !== "undefined" ? window.location.pathname : ""} />
        <input type="hidden" name="referrer" value={typeof window !== "undefined" ? document.referrer : ""} />
        
        {/* UTM Inputs - would need to be populated dynamically, keeping for structure */}
        <input type="hidden" name="utmSource" value="" />
        <input type="hidden" name="utmMedium" value="" />
        <input type="hidden" name="utmCampaign" value="" />
        <input type="hidden" name="utmTerm" value="" />
        <input type="hidden" name="utmContent" value="" />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label={dictionary.form.labels.firstName}
            input={<input name="firstName" className={inputClasses()} placeholder={dictionary.form.placeholders.firstName} autoComplete="given-name" required />}
          />
          <Field
            label={dictionary.form.labels.lastName}
            input={<input name="lastName" className={inputClasses()} placeholder={dictionary.form.placeholders.lastName} autoComplete="family-name" required />}
          />
          <Field
            label={dictionary.form.labels.email}
            input={<input name="email" className={inputClasses()} placeholder={dictionary.form.placeholders.email} type="email" autoComplete="email" required />}
          />
          <Field
            label={dictionary.form.labels.phone}
            input={<input name="phone" className={inputClasses()} placeholder={dictionary.form.placeholders.phone} autoComplete="tel" required />}
          />
          {showInterestField ? (
            <Field
              label={dictionary.form.labels.interest}
              className="sm:col-span-2"
              input={
                <select name="interest" defaultValue={initialInterest || ""} className={inputClasses()} required>
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
            className="sm:col-span-2"
            input={
              <textarea
                name="message"
                className={cn(inputClasses(), "min-h-[9rem] resize-y rounded-[1.25rem] sm:min-h-[10rem] sm:rounded-[1.5rem]")}
                placeholder={dictionary.form.placeholders.message}
                required
              />
            }
          />
        </div>

        <details className="group rounded-[1.5rem] border border-outline/50 bg-white/50 px-4 py-4 shadow-soft transition-colors hover:bg-white/80">
          <summary className="cursor-pointer list-none">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-semibold text-ink">
                {optionalDetails.label}
              </span>
              <span className="text-terracotta transition group-open:rotate-45 text-lg font-bold">+</span>
            </div>
          </summary>

          <div className="mt-4 grid gap-4 border-t border-outline/50 pt-4 sm:grid-cols-2">
            <Field
              label={dictionary.form.labels.preferredLanguage}
              input={
                <select name="preferredLanguage" className={inputClasses()}>
                  <option value="">-</option>
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
              input={<input name="availability" className={inputClasses()} placeholder={dictionary.form.placeholders.availability} />}
            />
            <Field
              label={dictionary.form.labels.foundUs}
              className="sm:col-span-2"
              input={
                <select name="foundUs" className={inputClasses()}>
                  <option value="">—</option>
                  {dictionary.form.foundUsOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              }
            />
          </div>
        </details>

        <input name="company" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        <label className="flex items-start gap-3 rounded-[1.25rem] border border-outline/50 bg-white/72 px-4 py-3 text-sm leading-6 text-muted sm:rounded-[1.5rem]">
          <input type="checkbox" name="consent" className="mt-1 h-4 w-4 rounded border-outline text-terracotta focus:ring-terracotta" required />
          <span>
            <span className="font-medium text-ink">{dictionary.form.labels.consent}</span>
            <span className="mt-1 block text-xs leading-5 text-muted/90">{dictionary.form.consentHint}</span>
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
  className,
}: {
  label: string;
  input: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("grid gap-2 text-sm font-medium text-ink", className)}>
      <span>{label}</span>
      {input}
    </label>
  );
}

function inputClasses() {
  return "min-h-11 rounded-[1.25rem] border border-outline/40 bg-white/60 px-4 text-[0.95rem] text-ink outline-none transition-all placeholder:text-muted/65 focus:border-terracotta focus:bg-white focus:ring-4 focus:ring-terracotta/10 sm:min-h-12 sm:rounded-2xl hover:border-outline/80";
}
