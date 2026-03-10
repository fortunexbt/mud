import Link from "next/link";
import { redirect } from "next/navigation";

import { loginAction } from "@/app/admin/actions";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { hasAdminConfig } from "@/lib/server-env";

export const metadata = {
  title: "Admin Login | MUD",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  if (await isAdminAuthenticated()) {
    redirect("/admin/leads");
  }

  const query = await searchParams;
  const hasError = query.error === "1";

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md rounded-[2rem] border border-outline/50 bg-white/82 p-6 shadow-card sm:p-8">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-terracotta">MUD Admin</p>
        <h1 className="mt-3 font-display text-[2.3rem] leading-tight text-ink">Painel da diretoria</h1>
        <p className="mt-3 text-base leading-7 text-muted">
          Entre para acompanhar os formulários recebidos e a operação do site. Contas de diretoria podem usar e-mail + senha. O acesso legado por senha compartilhada continua disponível enquanto a transição não termina.
        </p>

        {!hasAdminConfig() ? (
          <div className="mt-6 rounded-[1.5rem] border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-6 text-amber-900">
            O painel ainda precisa de configuração de acesso. Defina `ADMIN_PASSWORD` e `ADMIN_SESSION_SECRET` no ambiente antes de usar o admin.
          </div>
        ) : (
          <form action={loginAction} className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm font-medium text-ink">
              <span>E-mail da diretoria</span>
              <input
                type="email"
                name="email"
                className="min-h-12 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                placeholder="Opcional por enquanto"
                autoComplete="email"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              <span>Senha</span>
              <input
                type="password"
                name="password"
                className="min-h-12 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                placeholder="Digite a senha da diretoria"
                required
              />
            </label>
            {hasError ? (
              <p className="rounded-[1.2rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                Credenciais inválidas.
              </p>
            ) : null}
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-transparent bg-terracotta px-5 text-sm font-semibold text-white shadow-soft transition hover:bg-clay"
            >
              Entrar no painel
            </button>
          </form>
        )}

        <div className="mt-6 text-sm text-muted">
          <Link href="/pt" className="text-terracotta hover:text-clay">
            Voltar para o site
          </Link>
        </div>
      </div>
    </main>
  );
}
