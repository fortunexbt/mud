import { resetHomeSectionAction } from "@/app/admin/actions";
import { getHomeSectionEditorRows } from "@/lib/home-content";
import { localeLabels, locales, type Locale } from "@/lib/i18n-config";
import { HomeSectionForm } from "@/components/admin/home-section-form";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { ConfirmResetForm } from "@/components/admin/ConfirmResetForm";

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
      <AdminPageHeader
        eyebrow="Home"
        title="Seções da Página Inicial"
        description="Edite os textos, chamadas e tópicos que formam a página principal."
      >
        <div className="flex flex-wrap gap-2">
          {locales.map((entry) => (
            <a
              key={entry}
              href={`/admin/content/home?locale=${entry}`}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${entry === locale ? "bg-ink text-white" : "border border-outline/60 bg-white text-ink hover:border-terracotta/35 hover:text-terracotta"}`}
            >
              {localeLabels[entry]}
            </a>
          ))}
        </div>
      </AdminPageHeader>

      {(query.saved === "1" || query.error) && (
        <p className={`rounded-[1.2rem] border px-4 py-3 text-sm ${query.saved === "1" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-800"}`}>
          {query.saved === "1" ? "Alterações salvas." : "Erro ao salvar."}
        </p>
      )}

      <section className="grid gap-5">
        {rows.map((row) => {
          if (row.sectionKey === "location") return null;
          
          return (
            <AdminCard
              key={row.sectionKey}
              title={row.sectionKey.toUpperCase()}
              subtitle={row.isActive ? "Ativo" : "Oculto"}
            >
              <HomeSectionForm 
                locale={locale} 
                sectionKey={row.sectionKey} 
                initialContent={row.contentJson as Record<string, unknown>} 
                isActive={row.isActive} 
              />

              <ConfirmResetForm
                action={resetHomeSectionAction}
                message="Tem certeza que deseja restaurar o texto padrão desta seção?"
              >
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="sectionKey" value={row.sectionKey} />
                <button type="submit" className="inline-flex min-h-10 items-center justify-center rounded-full border border-outline/60 bg-white px-4 text-sm font-semibold text-ink transition hover:border-terracotta/35 hover:text-terracotta">
                  Restaurar texto padrão
                </button>
              </ConfirmResetForm>
            </AdminCard>
          );
        })}
      </section>
    </div>
  );
}
