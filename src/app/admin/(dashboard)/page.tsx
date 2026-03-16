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
  const recentLeads = await listLeads();
  const topRecent = recentLeads.slice(0, 5);

  return (
    <div className="space-y-8">
      <section>
        <h1 className="font-display text-[2.5rem] leading-tight text-ink">Bem-vindo, Diretoria</h1>
        <p className="mt-2 text-base text-muted">Aqui está o resumo da operação do ateliê hoje.</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-[1.4rem] border border-outline/50 bg-white/78 px-6 py-6 shadow-soft">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-muted">Total Recebidos</p>
          <p className="mt-2 font-display text-[2.5rem] leading-none text-ink">{stats.all}</p>
        </div>
        <div className="rounded-[1.4rem] border border-outline/50 bg-white/78 px-6 py-6 shadow-soft">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-terracotta">Aguardando Contato</p>
          <p className="mt-2 font-display text-[2.5rem] leading-none text-ink">{stats.new}</p>
        </div>
        <div className="rounded-[1.4rem] border border-outline/50 bg-white/78 px-6 py-6 shadow-soft">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-emerald-700">Qualificados</p>
          <p className="mt-2 font-display text-[2.5rem] leading-none text-ink">{stats.qualified}</p>
        </div>
        <div className="rounded-[1.4rem] border border-outline/50 bg-white/78 px-6 py-6 shadow-soft">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-muted">Encerrados</p>
          <p className="mt-2 font-display text-[2.5rem] leading-none text-ink">{stats.closed}</p>
        </div>
      </section>

      <section className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-5 shadow-soft sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-[1.8rem] text-ink">Ações Rápidas</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/admin/content/blog/new" className="rounded-[1.2rem] border border-outline/50 bg-surface/30 p-5 hover:bg-surface/60 transition">
            <p className="font-semibold text-ink">Novo Post de Blog</p>
            <p className="text-sm text-muted mt-1">Escrever novo artigo</p>
          </Link>
          <Link href="/admin/content/exhibitions" className="rounded-[1.2rem] border border-outline/50 bg-surface/30 p-5 hover:bg-surface/60 transition">
            <p className="font-semibold text-ink">Gerenciar Exposições</p>
            <p className="text-sm text-muted mt-1">Atualizar portfólio</p>
          </Link>
          <Link
            href="/api/leads/export"
            className="rounded-[1.2rem] border border-outline/50 bg-surface/30 p-5 hover:bg-surface/60 transition cursor-pointer flex flex-col"
          >
            <p className="font-semibold text-ink">Exportar Leads</p>
            <p className="text-sm text-muted mt-1">Baixar CSV de contatos</p>
          </Link>
        </div>
      </section>

      <section className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-5 shadow-soft sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-[1.8rem] text-ink">Últimos contatos</h3>
          <Link href="/admin/leads" className="text-sm font-semibold text-terracotta hover:text-clay">
            Ver todos &rarr;
          </Link>
        </div>
        {/* ... table remains the same ... */}
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
                  </div>
                  <div className="text-sm text-muted">{lead.interest || lead.formType}</div>
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
