import { resetContactTextAction, saveContactTextAction } from "@/app/admin/actions";
import { getContactTextEditorRows } from "@/lib/contact-content";
import { localeLabels, locales, type Locale } from "@/lib/i18n-config";

export default async function AdminContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const locale = typeof query.locale === "string" && locales.includes(query.locale as Locale) ? (query.locale as Locale) : "pt";
  const rows = await getContactTextEditorRows(locale);

  return (
    <div className="space-y-6">
      <section className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-6 shadow-soft">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">Contato</p>
        <h2 className="mt-2 font-display text-[2rem] leading-tight text-ink">Textos de Contato</h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
          Edite os textos que aparecem na página de Contato, como título do mapa, descrições e endereços.
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
            href={`/admin/content/contact?locale=${entry}`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${entry === locale ? "bg-ink text-white" : "border border-outline/60 bg-white text-ink hover:border-terracotta/35 hover:text-terracotta"}`}
          >
            {localeLabels[entry]}
          </a>
        ))}
      </section>

      <section className="grid gap-5">
        {rows.map((row) => (
          <div key={row.sectionKey} className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-5 shadow-soft sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-terracotta">Seção: {row.sectionKey}</p>
                <h3 className="mt-1 font-display text-[1.5rem] leading-tight text-ink">{row.title}</h3>
              </div>
            </div>

            <form action={saveContactTextAction} className="mt-5 grid gap-4">
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="sectionKey" value={row.sectionKey} />

              <div className="grid gap-4">
                <label className="grid gap-2 text-sm font-medium text-ink">
                  <span>Título</span>
                  <input name="title" defaultValue={row.title} className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" required />
                </label>
                <label className="grid gap-2 text-sm font-medium text-ink">
                  <span>Texto Base</span>
                  <textarea name="body" defaultValue={row.body} className="min-h-[8rem] rounded-[1.2rem] border border-outline/60 bg-white px-4 py-3 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" required />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 mt-2">
                <label className="inline-flex items-center gap-3 rounded-[1.2rem] border border-amber-200 bg-amber-50/50 px-4 py-3 text-sm text-amber-900">
                  <input type="checkbox" name="autoTranslate" className="h-4 w-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500" />
                  Auto-traduzir (usar IA para traduzir para outros idiomas)
                </label>
              </div>

              <div className="flex flex-wrap gap-3 mt-2">
                <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full border border-transparent bg-terracotta px-5 text-sm font-semibold text-white shadow-soft transition hover:bg-clay">
                  Salvar Seção
                </button>
              </div>
            </form>

            <form action={resetContactTextAction} className="mt-4">
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="sectionKey" value={row.sectionKey} />
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