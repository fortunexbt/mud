import { resetServiceTrackAction, saveServiceTrackAction } from "@/app/admin/actions";
import { getServiceTrackEditorRows } from "@/lib/service-content";
import { localeLabels, locales, type Locale } from "@/lib/i18n-config";

function trackLabel(key: string) {
  if (key === "adults") return "Adultos";
  if (key === "kids") return "Infantil";
  if (key === "oneOff") return "Avulsa";
  if (key === "wheel") return "Torno";
  return "Grupos";
}

export default async function AdminServicesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const locale = typeof query.locale === "string" && locales.includes(query.locale as Locale) ? (query.locale as Locale) : "pt";
  const rows = await getServiceTrackEditorRows(locale);

  return (
    <div className="space-y-6">
      <section className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-6 shadow-soft">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">Serviços</p>
        <h2 className="mt-2 font-display text-[2rem] leading-tight text-ink">Aulas e formatos</h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
          Edite os cards que aparecem na home e na página de aulas. Nesta etapa, o painel cobre os formatos principais já existentes no site. Ocultar um card funciona como remoção de vitrine; reativar ou restaurar devolve o formato ao frontend.
        </p>
        {query.saved === "1" ? (
          <p className="mt-4 rounded-[1.2rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">Alterações salvas.</p>
        ) : null}
        {query.error ? (
          <p className="mt-4 rounded-[1.2rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">Revise os campos obrigatórios antes de salvar.</p>
        ) : null}
      </section>

      <section className="flex flex-wrap gap-2">
        {locales.map((entry) => (
          <a
            key={entry}
            href={`/admin/content/services?locale=${entry}`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${entry === locale ? "bg-ink text-white" : "border border-outline/60 bg-white text-ink hover:border-terracotta/35 hover:text-terracotta"}`}
          >
            {localeLabels[entry]}
          </a>
        ))}
      </section>

      <section className="grid gap-5">
        {rows.map((row) => (
          <div key={row.serviceKey} className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-5 shadow-soft sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-terracotta">{trackLabel(row.serviceKey)}</p>
                <h3 className="mt-1 font-display text-[1.8rem] leading-tight text-ink">{row.title}</h3>
              </div>
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${row.isActive ? "bg-sand text-ink" : "bg-surface text-muted"}`}>
                {row.isActive ? "Ativo" : "Oculto"}
              </span>
            </div>

            <form action={saveServiceTrackAction} className="mt-5 grid gap-4">
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="serviceKey" value={row.serviceKey} />

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-ink">
                  <span>Título</span>
                  <input name="title" defaultValue={row.title} className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" required />
                </label>
                <label className="grid gap-2 text-sm font-medium text-ink">
                  <span>Badge</span>
                  <input name="badge" defaultValue={row.badge} className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" required />
                </label>
                <label className="grid gap-2 text-sm font-medium text-ink md:col-span-2">
                  <span>Resumo</span>
                  <textarea name="summary" defaultValue={row.summary} className="min-h-[5.5rem] rounded-[1.2rem] border border-outline/60 bg-white px-4 py-3 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" required />
                </label>
                <label className="grid gap-2 text-sm font-medium text-ink md:col-span-2">
                  <span>Detalhes</span>
                  <textarea name="details" defaultValue={row.details} className="min-h-[6rem] rounded-[1.2rem] border border-outline/60 bg-white px-4 py-3 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" required />
                </label>
                <label className="grid gap-2 text-sm font-medium text-ink">
                  <span>CTA</span>
                  <input name="cta" defaultValue={row.cta} className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" required />
                </label>
                <label className="grid gap-2 text-sm font-medium text-ink">
                  <span>Ordem</span>
                  <input type="number" name="sortOrder" defaultValue={row.sortOrder} className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" required />
                </label>
              </div>

              <label className="inline-flex items-center gap-3 rounded-[1.2rem] border border-outline/50 bg-surface/40 px-4 py-3 text-sm text-ink">
                <input type="checkbox" name="isActive" defaultChecked={row.isActive} className="h-4 w-4 rounded border-outline/60 text-terracotta focus:ring-terracotta" />
                Exibir este formato no site
              </label>

              <div className="flex flex-wrap gap-3">
                <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full border border-transparent bg-terracotta px-5 text-sm font-semibold text-white shadow-soft transition hover:bg-clay">
                  Salvar formato
                </button>
              </div>
            </form>

            <form action={resetServiceTrackAction} className="mt-4">
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="serviceKey" value={row.serviceKey} />
              <button type="submit" className="inline-flex min-h-10 items-center justify-center rounded-full border border-outline/60 bg-white px-4 text-sm font-semibold text-ink transition hover:border-terracotta/35 hover:text-terracotta">
                Restaurar texto padrão
              </button>
            </form>
          </div>
        ))}
      </section>
    </div>
  );
}
