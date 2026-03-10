import Link from "next/link";
import type { ReactNode } from "react";

import { logoutAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin-auth";

export const metadata = {
  title: "Admin | MUD",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
  params: Promise<unknown>;
}) {
  const actor = await requireAdmin();

  return (
    <div className="min-h-screen bg-background text-ink">
      <header className="border-b border-outline/50 bg-white/82 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">MUD Admin</p>
            <h1 className="mt-1 font-display text-[1.8rem] leading-tight">Painel da diretoria</h1>
            <p className="mt-2 text-sm text-muted">
              {actor.mode === "user" ? `${actor.fullName} · ${actor.email}` : actor.label}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/admin/leads" className="rounded-full px-4 py-2 text-sm font-medium text-muted transition hover:bg-white hover:text-ink">
              Leads
            </Link>
            <Link href="/admin/content" className="rounded-full px-4 py-2 text-sm font-medium text-muted transition hover:bg-white hover:text-ink">
              Conteúdo
            </Link>
            <Link href="/admin/content/services" className="rounded-full px-4 py-2 text-sm font-medium text-muted transition hover:bg-white hover:text-ink">
              Serviços
            </Link>
            <Link href="/admin/content/blog" className="rounded-full px-4 py-2 text-sm font-medium text-muted transition hover:bg-white hover:text-ink">
              Blog
            </Link>
            <Link href="/admin/users" className="rounded-full px-4 py-2 text-sm font-medium text-muted transition hover:bg-white hover:text-ink">
              Usuários
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="rounded-full border border-outline/60 bg-white px-4 py-2 text-sm font-medium text-ink transition hover:border-terracotta/40 hover:text-terracotta">
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
