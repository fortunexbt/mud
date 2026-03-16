"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-[1.8rem] border border-red-200 bg-red-50 p-8 text-center shadow-soft">
      <h2 className="font-display text-[2rem] text-red-800">Algo deu errado!</h2>
      <p className="mt-2 text-sm text-red-600 max-w-md">
        Ocorreu um erro ao carregar esta página do painel administrativo.
      </p>
      <button
        onClick={() => reset()}
        className="mt-6 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-red-700"
      >
        Tentar novamente
      </button>
    </div>
  );
}
