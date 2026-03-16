import { resetExhibitionAction, saveExhibitionAction } from "@/app/admin/actions";
import { getExhibitionEditorRows } from "@/lib/exhibitions-content";
import { localeLabels, locales, type Locale } from "@/lib/i18n-config";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { ConfirmResetForm } from "@/components/admin/ConfirmResetForm";
import { ExhibitionEditor } from "@/components/admin/exhibition-editor";
import { getMediaAssets } from "@/lib/media-db";

export default async function AdminExhibitionsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const locale = typeof query.locale === "string" && locales.includes(query.locale as Locale) ? (query.locale as Locale) : "pt";
  const [rows, assets] = await Promise.all([
    getExhibitionEditorRows(locale),
    getMediaAssets(),
  ]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Exposições"
        title="Portfólio e Histórico"
        description="Gerencie o histórico de exposições da escola que aparece na página Sobre."
      >
        <div className="flex flex-wrap gap-2">
          {locales.map((entry) => (
            <a
              key={entry}
              href={`/admin/content/exhibitions?locale=${entry}`}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${entry === locale ? "bg-ink text-white" : "border border-outline/60 bg-white text-ink hover:border-terracotta/35 hover:text-terracotta"}`}
            >
              {localeLabels[entry]}
            </a>
          ))}
        </div>
      </AdminPageHeader>

      {(query.saved === "1" || query.error || query.warning) && (
        <p className={`rounded-[1.2rem] border px-4 py-3 text-sm ${query.saved === "1" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-800"}`}>
          {query.saved === "1" ? "Alterações salvas." : query.warning === "translation" ? "Salvo com sucesso, mas a auto-tradução falhou." : "Erro ao salvar."}
        </p>
      )}

      <section className="grid gap-5">
        {rows.map((row) => (
          <AdminCard
            key={row.exhibitionKey}
            title={`${row.year} • ${row.editionLabel}`}
            subtitle={row.title}
          >
            <ExhibitionEditor locale={locale} initialData={row as unknown as Record<string, unknown>} assets={assets} />
            <ConfirmResetForm
              action={resetExhibitionAction}
              message="Tem certeza que deseja restaurar o texto padrão desta exposição?"
            >
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="exhibitionKey" value={row.exhibitionKey} />
              <button type="submit" className="inline-flex min-h-10 items-center justify-center rounded-full border border-outline/60 bg-white px-4 text-sm font-semibold text-ink transition hover:border-terracotta/35 hover:text-terracotta">
                Restaurar texto padrão
              </button>
            </ConfirmResetForm>
          </AdminCard>
        ))}
      </section>
    </div>
  );
}
