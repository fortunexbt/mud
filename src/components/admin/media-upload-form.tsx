"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function MediaUploadForm() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const previewUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file],
  );

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const reset = () => {
    setFile(null);
    setAltText("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      setError("Selecione uma imagem antes de enviar.");
      setMessage(null);
      return;
    }

    const formData = new FormData();
    formData.set("file", file);
    formData.set("altText", altText.trim());

    setError(null);
    setMessage(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const payload = (await response.json()) as { registered?: boolean };

        reset();
        setMessage(
          payload.registered === false
            ? "Upload concluído, mas o cadastro no CMS falhou. O arquivo aparecerá como 'Upload sem cadastro'."
            : "Upload concluído. A biblioteca foi atualizada.",
        );
        router.refresh();
      } catch {
        setError("Não foi possível enviar a imagem.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_16rem]">
      <div className="grid gap-4">
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={(event) => {
            const nextFile = event.target.files?.[0] || null;
            setFile(nextFile);
            setError(null);
            setMessage(null);
            if (nextFile) {
              setAltText((current) => current || nextFile.name.replace(/\.[^.]+$/, ""));
            }
          }}
          className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-terracotta file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-clay"
        />
        <label className="grid gap-2 text-sm font-medium text-ink">
          <span>Texto alternativo</span>
          <input
            type="text"
            name="altText"
            value={altText}
            onChange={(event) => setAltText(event.target.value)}
            placeholder="Descreva a imagem para o painel e acessibilidade"
            className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
          />
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-transparent bg-ink px-5 text-sm font-semibold text-white transition hover:bg-clay disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Enviando..." : "Enviar imagem"}
          </button>
          {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
          {error ? <p className="text-sm text-red-700">{error}</p> : null}
        </div>
      </div>

      <div className="overflow-hidden rounded-[1.2rem] border border-outline/40 bg-surface/30">
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt="Pré-visualização do upload"
            className="h-64 w-full object-cover"
          />
        ) : (
          <div className="flex h-64 items-center justify-center px-6 text-center text-sm text-muted">
            A miniatura do upload aparece aqui antes do envio.
          </div>
        )}
      </div>
    </form>
  );
}
