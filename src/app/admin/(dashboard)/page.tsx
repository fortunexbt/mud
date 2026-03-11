import Link from "next/link";
import { getLeadStats, listLeads, type LeadStatus } from "@/lib/leads";

function statusLabel(status: LeadStatus) {
  if (status === "new") return "Novo";
  if (status === "contacted") return "Contatado";
  if (status === "qualified") return "Qualificado";
  if (status === "closed") return "Encerrado";
  return "Spam";
}

function statusColor(status: LeadStatus) {
  if (status === "new") return "bg-blue-100 text-blue-800";
  if (status === "contacted") return "bg-amber-100 text-amber-800";
  if (status === "qualified") return "bg-emerald-100 text-emerald-800";
  if (status === "closed") return "bg-surface text-ink";
  return "bg-red-100 text-red-800";
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default async function AdminIndexPage() {
  const stats = await getLeadStats();
  const recentLeads = await listLeads(); // Returns 250 by default, ordered by recent
  const topRecent = recentLeads.slice(0, 5); // Just top 5

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-[1fr_auto]">
        <div className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-6 shadow-soft">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">Visão Geral</p>
          <h2 className="mt-2 font-display text-[2rem] leading-tight">Métricas do ateliê</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            Resumo rápido do volume de contatos recebidos através do site.
          </p>
        </div>
        <div className="flex items-center justify-end rounded-[1.8rem] border border-outline/50 bg-white/82 p-6 shadow-soft">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/api/leads/export"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-outline/60 bg-white px-5 text-sm font-semibold text-ink transition hover:border-terracotta/35 hover:text-terracotta"
          >
            Exportar Leads (CSV)
          </a>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-[1.4rem] border border-outline/50 bg-white/78 px-5 py-5 shadow-soft">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-muted">Total Recebidos</p>
          <p className="mt-2 font-display text-[2.5rem] leading-none text-ink">{stats.all}</p>
        </div>
        <div className="rounded-[1.4rem] border border-outline/50 bg-white/78 px-5 py-5 shadow-soft">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-terracotta">Aguardando Contato</p>
          <p className="mt-2 font-display text-[2.5rem] leading-none text-ink">{stats.new}</p>
        </div>
        <div className="rounded-[1.4rem] border border-outline/50 bg-white/78 px-5 py-5 shadow-soft">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-emerald-700">Qualificados</p>
          <p className="mt-2 font-display text-[2.5rem] leading-none text-ink">{stats.qualified}</p>
        </div>
        <div className="rounded-[1.4rem] border border-outline/50 bg-white/78 px-5 py-5 shadow-soft">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-muted">Encerrados</p>
          <p className="mt-2 font-display text-[2.5rem] leading-none text-ink">{stats.closed}</p>
        </div>
      </section>

      <section className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-5 shadow-soft sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-[1.5rem] text-ink">Últimos contatos</h3>
          <Link href="/admin/leads" className="text-sm font-semibold text-terracotta hover:text-clay">
            Ver todos &rarr;
          </Link>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-outline/50">
          <div className="hidden grid-cols-[1.25fr_0.9fr_0.7fr_0.7fr] gap-4 bg-surface/70 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted md:grid">
            <span>Lead</span>
            <span>Interesse</span>
            <span>Status</span>
            <span>Recebido</span>
          </div>

          {topRecent.length ? (
            <div className="divide-y divide-outline/40 bg-white">
              {topRecent.map((lead) => (
                <Link key={lead.id} href={`/admin/leads/${lead.id}`} className="grid gap-3 px-5 py-4 transition hover:bg-surface/28 md:grid-cols-[1.25fr_0.9fr_0.7fr_0.7fr] md:items-center md:gap-4">
                  <div>
                    <p className="font-semibold text-ink">{lead.firstName} {lead.lastName}</p>
                    <p className="mt-1 text-sm text-muted">{lead.email}</p>
                    <p className="mt-1 text-sm text-muted md:hidden">{lead.phone}</p>
                  </div>
                  <div className="text-sm text-muted">
                    <span className="md:hidden font-medium text-ink">Interesse: </span>
                    {lead.interest || lead.formType}
                  </div>
                  <div>
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${statusColor(lead.status)}`}>
                      {statusLabel(lead.status)}
                    </span>
                  </div>
                  <div className="text-sm text-muted">{formatDate(lead.createdAt)}</div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-5 py-10 text-sm text-muted">Nenhum lead recebido ainda.</div>
          )}
        </div>
      </section>
    </div>
  );
}
