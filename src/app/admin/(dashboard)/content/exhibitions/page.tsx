import { resetExhibitionAction, saveExhibitionAction } from "@/app/admin/actions";
import { getExhibitionEditorRows } from "@/lib/exhibitions-content";
import { localeLabels, locales, type Locale } from "@/lib/i18n-config";
import { mediaKeys } from "@/lib/media";

export default async function AdminExhibitionsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const locale = typeof query.locale === "string" && locales.includes(query.locale as Locale) ? (query.locale as Locale) : "pt";
  const rows = await getExhibitionEditorRows(locale);

  return (
    <div className="space-y-6">
      <section className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-6 shadow-soft">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">Exposições</p>
        <h2 className="mt-2 font-display text-[2rem] leading-tight text-ink">Portfólio e Histórico</h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
          Gerencie o histórico de exposições da escola que aparece na página Sobre.
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
            href={`/admin/content/exhibitions?locale=${entry}`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${entry === locale ? "bg-ink text-white" : "border border-outline/60 bg-white text-ink hover:border-terracotta/35 hover:text-terracotta"}`}
          >
            {localeLabels[entry]}
          </a>
        ))}
      </section>

      <section className="grid gap-5">
        {rows.map((row) => (
          <div key={row.exhibitionKey} className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-5 shadow-soft sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-terracotta">{row.year} • {row.editionLabel}</p>
                <h3 className="mt-1 font-display text-[1.8rem] leading-tight text-ink">{row.title}</h3>
              </div>
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${row.isActive ? "bg-sand text-ink" : "bg-surface text-muted"}`}>
                {row.isActive ? "Ativo" : "Oculto"}
              </span>
            </div>

            <form action={saveExhibitionAction} className="mt-5 grid gap-4">
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="exhibitionKey" value={row.exhibitionKey} />

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-ink">
                  <span>Ano</span>
                  <input name="year" defaultValue={row.year} className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" required />
                </label>
                <label className="grid gap-2 text-sm font-medium text-ink">
                  <span>Selo da Edição</span>
                  <input name="editionLabel" defaultValue={row.editionLabel} className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" required />
                </label>
                <label className="grid gap-2 text-sm font-medium text-ink">
                  <span>Título</span>
                  <input name="title" defaultValue={row.title} className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" required />
                </label>
                <label className="grid gap-2 text-sm font-medium text-ink">
                  <span>Data/Período</span>
                  <input name="date" defaultValue={row.date} className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" required />
                </label>
                <label className="grid gap-2 text-sm font-medium text-ink md:col-span-2">
                  <span>Pôster</span>
                  <select name="posterKey" defaultValue={row.posterKey} className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20">
                    {mediaKeys.map((key) => (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-medium text-ink md:col-span-2">
                  <span>Descrição</span>
                  <textarea name="description" defaultValue={row.description} className="min-h-[6rem] rounded-[1.2rem] border border-outline/60 bg-white px-4 py-3 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" required />
                </label>
                <label className="grid gap-2 text-sm font-medium text-ink md:col-span-2">
                  <span>Localização (uma linha por endereço)</span>
                  <textarea name="location" defaultValue={row.location.join("\n")} className="min-h-[4rem] rounded-[1.2rem] border border-outline/60 bg-white px-4 py-3 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" required />
                </label>
                <label className="grid gap-2 text-sm font-medium text-ink">
                  <span>Ordem</span>
                  <input type="number" name="sortOrder" defaultValue={row.sortOrder} className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" required />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 mt-2">
                <label className="inline-flex items-center gap-3 rounded-[1.2rem] border border-outline/50 bg-surface/40 px-4 py-3 text-sm text-ink">
                  <input type="checkbox" name="isActive" defaultChecked={row.isActive} className="h-4 w-4 rounded border-outline/60 text-terracotta focus:ring-terracotta" />
                  Exibir no site
                </label>
                
                <label className="inline-flex items-center gap-3 rounded-[1.2rem] border border-amber-200 bg-amber-50/50 px-4 py-3 text-sm text-amber-900">
                  <input type="checkbox" name="autoTranslate" className="h-4 w-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500" />
                  Auto-traduzir (usar IA)
                </label>
              </div>

              <div className="flex flex-wrap gap-3 mt-2">
                <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full border border-transparent bg-terracotta px-5 text-sm font-semibold text-white shadow-soft transition hover:bg-clay">
                  Salvar Exposição
                </button>
              </div>
            </form>

            <form action={resetExhibitionAction} className="mt-4" onSubmit={(e) => { if (!confirm("Tem certeza que deseja restaurar o texto padrão desta exposição?")) e.preventDefault(); }}>
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="exhibitionKey" value={row.exhibitionKey} />
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