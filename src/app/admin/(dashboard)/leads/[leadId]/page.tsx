import Link from "next/link";
import { notFound } from "next/navigation";

import { addLeadNoteAction, updateLeadStatusAction } from "@/app/admin/actions";
import { getLeadById, type LeadStatus } from "@/lib/leads";

const statuses: LeadStatus[] = ["new", "contacted", "qualified", "closed", "spam"];

function formatDate(value: string | null) {
  if (!value) return "-";

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

function interestLabel(value: string | null | undefined) {
  if (!value) return "-";
  if (value === "adults") return "Adultos";
  if (value === "kids") return "Infantil";
  if (value === "oneOff") return "Aula avulsa";
  if (value === "groups") return "Grupos / empresas";
  return value;
}

export default async function LeadDetailPage({ params }: { params: Promise<{ leadId: string }> }) {
  const { leadId } = await params;
  const data = await getLeadById(leadId);

  if (!data) {
    notFound();
  }

  const { lead, notes } = data;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/admin/leads" className="text-sm font-semibold text-terracotta hover:text-clay">
            Voltar para leads
          </Link>
          <h2 className="mt-2 font-display text-[2.2rem] leading-tight text-ink">
            {lead.firstName} {lead.lastName}
          </h2>
          <p className="mt-2 text-sm text-muted">Recebido em {formatDate(lead.createdAt)}</p>
        </div>
        <span className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] ${statusColor(lead.status)}`}>
          {statusLabel(lead.status)}
        </span>
      </div>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <div className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-6 shadow-soft">
            <h3 className="font-display text-[1.8rem] text-ink">Mensagem</h3>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">E-mail</dt>
                <dd className="mt-1 text-sm text-ink">{lead.email}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Telefone</dt>
                <dd className="mt-1 text-sm text-ink">{lead.phone}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Tipo</dt>
                <dd className="mt-1 text-sm text-ink">{lead.formType}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Interesse</dt>
                <dd className="mt-1 text-sm text-ink">{interestLabel(lead.interest)}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Idioma</dt>
                <dd className="mt-1 text-sm text-ink">{lead.preferredLanguage || lead.locale}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Disponibilidade</dt>
                <dd className="mt-1 text-sm text-ink">{lead.availability || "-"}</dd>
              </div>
            </dl>

            <div className="mt-6 rounded-[1.5rem] border border-outline/40 bg-surface/40 px-4 py-4 text-sm leading-7 text-ink">
              {lead.message}
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-6 shadow-soft">
            <h3 className="font-display text-[1.8rem] text-ink">Notas internas</h3>
            <form action={addLeadNoteAction} className="mt-5 grid gap-4">
              <input type="hidden" name="leadId" value={lead.id} />
              <textarea
                name="note"
                className="min-h-[8rem] rounded-[1.25rem] border border-outline/60 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                placeholder="Ex.: respondeu no WhatsApp, pediu retorno à tarde, interessada em aula adulta..."
                required
              />
              <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full border border-transparent bg-terracotta px-5 text-sm font-semibold text-white shadow-soft transition hover:bg-clay sm:w-fit">
                Salvar nota
              </button>
            </form>

            <div className="mt-6 grid gap-4">
              {notes.length ? (
                notes.map((note) => (
                  <article key={note.id} className="rounded-[1.35rem] border border-outline/40 bg-surface/36 px-4 py-4">
                    <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.14em] text-muted">
                      <span>{note.authorLabel}</span>
                      <span>{formatDate(note.createdAt)}</span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-ink">{note.body}</p>
                  </article>
                ))
              ) : (
                <p className="text-sm text-muted">Nenhuma nota registrada ainda.</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-6 shadow-soft">
            <h3 className="font-display text-[1.8rem] text-ink">Ações</h3>
            <form action={updateLeadStatusAction} className="mt-5 grid gap-4">
              <input type="hidden" name="leadId" value={lead.id} />
              <label className="grid gap-2 text-sm font-medium text-ink">
                <span>Status do lead</span>
                <select
                  name="status"
                  defaultValue={lead.status}
                  className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {statusLabel(status)}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full border border-outline/60 bg-white px-5 text-sm font-semibold text-ink transition hover:border-terracotta/35 hover:text-terracotta sm:w-fit">
                Atualizar status
              </button>
            </form>
          </div>

          <div className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-6 shadow-soft">
            <h3 className="font-display text-[1.8rem] text-ink">Metadados</h3>
            <dl className="mt-5 grid gap-4 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Página</dt>
                <dd className="mt-1 text-ink">{lead.pagePath || "-"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Referrer</dt>
                <dd className="mt-1 break-all text-ink">{lead.referrer || "-"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">UTM source / medium</dt>
                <dd className="mt-1 text-ink">{lead.utmSource || "-"} / {lead.utmMedium || "-"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">UTM campaign</dt>
                <dd className="mt-1 text-ink">{lead.utmCampaign || "-"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Webhook</dt>
                <dd className="mt-1 text-ink">{lead.webhookStatus} {lead.webhookLastError ? `- ${lead.webhookLastError}` : ""}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Atualizado</dt>
                <dd className="mt-1 text-ink">{formatDate(lead.updatedAt)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}
