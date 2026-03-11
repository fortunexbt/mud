import Link from "next/link";

import { getLeadStats, listLeads, type LeadStatus } from "@/lib/leads";

const statuses: Array<{ label: string; value: LeadStatus | "all" }> = [
  { label: "Todos", value: "all" },
  { label: "Novos", value: "new" },
  { label: "Contatados", value: "contacted" },
  { label: "Qualificados", value: "qualified" },
  { label: "Encerrados", value: "closed" },
  { label: "Spam", value: "spam" },
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

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

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const activeStatus = typeof query.status === "string" ? query.status : "all";
  const search = typeof query.q === "string" ? query.q : "";
  const leads = await listLeads({
    status: statuses.some((item) => item.value === activeStatus) ? (activeStatus as LeadStatus | "all") : "all",
    search,
  });
  const stats = await getLeadStats();

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-6 shadow-soft">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">Leads</p>
          <h2 className="mt-2 font-display text-[2rem] leading-tight">Formulários recebidos</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            Este painel reúne todos os contatos enviados pelo site. Cada lead fica salvo no banco, mesmo que integrações futuras ainda mudem.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {statuses.map((item) => {
            const count = item.value === "all" ? stats.all : stats[item.value];
            return (
              <div key={item.value} className="rounded-[1.4rem] border border-outline/50 bg-white/78 px-4 py-4 shadow-soft">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted">{item.label}</p>
                <p className="mt-2 font-display text-[2rem] leading-none text-ink">{count}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-5 shadow-soft sm:p-6">
        <form className="grid gap-4 lg:grid-cols-[1fr_auto]" method="GET">
          <label className="grid gap-2 text-sm font-medium text-ink">
            <span>Buscar por nome, e-mail, telefone ou mensagem</span>
            <input
              type="search"
              name="q"
              defaultValue={search}
              placeholder="Ex.: adultos, Juliana, +55..."
              className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
            />
          </label>
          <div className="flex flex-wrap items-end gap-2">
            {statuses.map((item) => (
              <button
                key={item.value}
                type="submit"
                name="status"
                value={item.value}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeStatus === item.value ? "bg-ink text-white" : "border border-outline/60 bg-white text-ink hover:border-terracotta/35 hover:text-terracotta"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </form>

        <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-outline/50">
          <div className="hidden grid-cols-[1.25fr_0.9fr_0.7fr_0.7fr] gap-4 bg-surface/70 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted md:grid">
            <span>Lead</span>
            <span>Interesse</span>
            <span>Status</span>
            <span>Recebido</span>
          </div>

          {leads.length ? (
            <div className="divide-y divide-outline/40 bg-white">
              {leads.map((lead) => (
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
            <div className="px-5 py-10 text-sm text-muted">Nenhum lead encontrado para este filtro.</div>
          )}
        </div>
      </section>
    </div>
  );
}
