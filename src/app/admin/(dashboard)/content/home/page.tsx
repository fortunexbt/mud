import { resetHomeSectionAction } from "@/app/admin/actions";
import { getHomeSectionEditorRows } from "@/lib/home-content";
import { localeLabels, locales, type Locale } from "@/lib/i18n-config";
import { HomeSectionForm } from "@/components/admin/home-section-form";

export default async function AdminHomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const locale = typeof query.locale === "string" && locales.includes(query.locale as Locale) ? (query.locale as Locale) : "pt";
  const rows = await getHomeSectionEditorRows(locale);

  return (
    <div className="space-y-6">
      <section className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-6 shadow-soft">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">Home</p>
        <h2 className="mt-2 font-display text-[2rem] leading-tight text-ink">Seções da Página Inicial</h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
          Edite os textos, chamadas e tópicos que formam a página principal. Atenção: devido à flexibilidade dos blocos, alterações grandes em listas (como Adicionar/Remover) afetarão o design do site diretamente.
        </p>
        {query.saved === "1" ? (
          <p className="mt-4 rounded-[1.2rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">Alterações salvas.</p>
        ) : null}
        {query.error ? (
          <p className="mt-4 rounded-[1.2rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">Erro ao salvar, verifique os campos.</p>
        ) : null}
      </section>

      <section className="flex flex-wrap gap-2">
        {locales.map((entry) => (
          <a
            key={entry}
            href={`/admin/content/home?locale=${entry}`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${entry === locale ? "bg-ink text-white" : "border border-outline/60 bg-white text-ink hover:border-terracotta/35 hover:text-terracotta"}`}
          >
            {localeLabels[entry]}
          </a>
        ))}
      </section>

      <section className="grid gap-5">
        {rows.map((row) => {
          if (row.sectionKey === "location") return null;
          
          return (
            <div key={row.sectionKey} className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-5 shadow-soft sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-terracotta">Bloco</p>
                  <h3 className="mt-1 font-display text-[1.5rem] leading-tight text-ink capitalize">{row.sectionKey}</h3>
                </div>
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${row.isActive ? "bg-sand text-ink" : "bg-surface text-muted"}`}>
                  {row.isActive ? "Ativo" : "Oculto"}
                </span>
              </div>

              <HomeSectionForm 
                locale={locale} 
                sectionKey={row.sectionKey} 
                initialContent={row.contentJson} 
                isActive={row.isActive} 
              />

              <form action={resetHomeSectionAction} className="mt-4">
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="sectionKey" value={row.sectionKey} />
                <button type="submit" className="inline-flex min-h-10 items-center justify-center rounded-full border border-outline/60 bg-white px-4 text-sm font-semibold text-ink transition hover:border-terracotta/35 hover:text-terracotta">
                  Restaurar texto padrão
                </button>
              </form>
            </div>
          );
        })}
      </section>
    </div>
  );
}