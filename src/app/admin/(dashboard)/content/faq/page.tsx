import { resetFaqAction, saveFaqAction } from "@/app/admin/actions";
import { getFaqEditorRows } from "@/lib/faq-content";
import { localeLabels, locales, type Locale } from "@/lib/i18n-config";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { ConfirmResetForm } from "@/components/admin/ConfirmResetForm";

export default async function AdminFaqPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const locale = typeof query.locale === "string" && locales.includes(query.locale as Locale) ? (query.locale as Locale) : "pt";
  
  let rows;
  try {
    rows = await getFaqEditorRows(locale);
  } catch (err) {
    console.error("AdminFaqPage: CRITICAL ERROR fetching FAQ rows:", err);
    throw err;
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="FAQ"
        title="Perguntas Frequentes"
        description="Gerencie as dúvidas dos alunos."
      >
        <div className="flex flex-wrap gap-2">
          {locales.map((entry) => (
            <a
              key={entry}
              href={`/admin/content/faq?locale=${entry}`}
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
            key={row.faqKey}
            title={`${row.question}`}
            subtitle={row.isActive ? "Ativo" : "Oculto"}
          >
            <form action={saveFaqAction} className="grid gap-4">
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
                  Auto-traduzir
                </label>
              </div>

              <div className="flex flex-wrap gap-3 mt-2">
                <SubmitButton label="Salvar FAQ" />
              </div>
            </form>

            <ConfirmResetForm 
              action={resetFaqAction} 
              message="Tem certeza que deseja restaurar o texto padrão desta pergunta?"
            >
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="faqKey" value={row.faqKey} />
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
