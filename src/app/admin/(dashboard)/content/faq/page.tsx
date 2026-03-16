import { resetFaqAction, saveFaqAction } from "@/app/admin/actions";
import { getFaqEditorRows } from "@/lib/faq-content";
import { localeLabels, locales, type Locale } from "@/lib/i18n-config";

export default async function AdminFaqPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const locale = typeof query.locale === "string" && locales.includes(query.locale as Locale) ? (query.locale as Locale) : "pt";
  const rows = await getFaqEditorRows(locale);

  return (
    <div className="space-y-6">
      <section className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-6 shadow-soft">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">FAQ</p>
        <h2 className="mt-2 font-display text-[2rem] leading-tight text-ink">Perguntas Frequentes</h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
          Edite as perguntas e respostas que aparecem na página de aulas. Você pode ocultar perguntas que não fazem mais sentido ou usar o botão &quot;Auto-traduzir&quot; para usar IA para atualizar os outros idiomas automaticamente.
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
            href={`/admin/content/faq?locale=${entry}`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${entry === locale ? "bg-ink text-white" : "border border-outline/60 bg-white text-ink hover:border-terracotta/35 hover:text-terracotta"}`}
          >
            {localeLabels[entry]}
          </a>
        ))}
      </section>

      <section className="grid gap-5">
        {rows.map((row) => (
          <div key={row.faqKey} className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-5 shadow-soft sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-terracotta">Posição {row.sortOrder + 1}</p>
                <h3 className="mt-1 font-display text-[1.5rem] leading-tight text-ink">{row.question}</h3>
              </div>
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${row.isActive ? "bg-sand text-ink" : "bg-surface text-muted"}`}>
                {row.isActive ? "Ativo" : "Oculto"}
              </span>
            </div>

            <form action={saveFaqAction} className="mt-5 grid gap-4">
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="faqKey" value={row.faqKey} />

              <div className="grid gap-4">
                <label className="grid gap-2 text-sm font-medium text-ink">
                  <span>Pergunta</span>
                  <input name="question" defaultValue={row.question} className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" required />
                </label>
                <label className="grid gap-2 text-sm font-medium text-ink">
                  <span>Resposta</span>
                  <textarea name="answer" defaultValue={row.answer} className="min-h-[8rem] rounded-[1.2rem] border border-outline/60 bg-white px-4 py-3 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" required />
                </label>
                <label className="grid gap-2 text-sm font-medium text-ink md:w-1/3">
                  <span>Ordem (menor aparece primeiro)</span>
                  <input type="number" name="sortOrder" defaultValue={row.sortOrder} className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" required />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="inline-flex items-center gap-3 rounded-[1.2rem] border border-outline/50 bg-surface/40 px-4 py-3 text-sm text-ink">
                  <input type="checkbox" name="isActive" defaultChecked={row.isActive} className="h-4 w-4 rounded border-outline/60 text-terracotta focus:ring-terracotta" />
                  Exibir no site
                </label>
                
                <label className="inline-flex items-center gap-3 rounded-[1.2rem] border border-amber-200 bg-amber-50/50 px-4 py-3 text-sm text-amber-900">
                  <input type="checkbox" name="autoTranslate" className="h-4 w-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500" />
                  Auto-traduzir (usar IA para traduzir para outros idiomas)
                </label>
              </div>

              <div className="flex flex-wrap gap-3 mt-2">
                <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full border border-transparent bg-terracotta px-5 text-sm font-semibold text-white shadow-soft transition hover:bg-clay">
                  Salvar FAQ
                </button>
              </div>
            </form>

            <form action={resetFaqAction} className="mt-4">
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="faqKey" value={row.faqKey} />
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