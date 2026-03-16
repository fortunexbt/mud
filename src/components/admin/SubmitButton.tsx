"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ label, savingLabel = "Salvando..." }: { label: string; savingLabel?: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-11 items-center justify-center rounded-full border border-transparent bg-terracotta px-5 text-sm font-semibold text-white shadow-soft transition hover:bg-clay disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? savingLabel : label}
    </button>
  );
}
