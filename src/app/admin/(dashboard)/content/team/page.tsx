import { resetTeamMemberAction, saveTeamMemberAction } from "@/app/admin/actions";
import { ImageSelector } from "@/components/admin/editors/ImageSelector";
import { getTeamMemberEditorRows } from "@/lib/team-content";
import { localeLabels, locales, type Locale } from "@/lib/i18n-config";
import { getSiteMediaSelectionAssets } from "@/lib/media-db";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { ConfirmResetForm } from "@/components/admin/ConfirmResetForm";

export default async function AdminTeamPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const locale = typeof query.locale === "string" && locales.includes(query.locale as Locale) ? (query.locale as Locale) : "pt";
  const rows = await getTeamMemberEditorRows(locale);
  const mediaAssets = getSiteMediaSelectionAssets([
    "founderPortrait",
    "julianaMorenoPortrait",
    "cristianeBelacianoPortrait",
    "doloresPortrait",
    "brunaLanesPortrait",
    "teamPlaceholder",
  ]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Equipe"
        title="Editar membros da equipe"
        description="Gerencie os membros da equipe (fundadora, faculty, destaque)."
      >
        <div className="flex flex-wrap gap-2">
          {locales.map((entry) => (
            <a
              key={entry}
              href={`/admin/content/team?locale=${entry}`}
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
        {rows.map((row) => (
          <AdminCard
            key={row.memberKey}
            title={row.name}
            subtitle={row.role}
          >
            <form action={saveTeamMemberAction} className="grid gap-4">
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="memberKey" value={row.memberKey} />
              <input type="hidden" name="isFeatured" value={row.isFeatured ? "true" : "false"} />

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-ink">
                  <span>Nome</span>
                  <input name="name" defaultValue={row.name} className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" required />
                </label>
                <label className="grid gap-2 text-sm font-medium text-ink">
                  <span>Função</span>
                  <input name="role" defaultValue={row.role} className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" required />
                </label>
                <div className="md:col-span-2">
                  <ImageSelector
                    label="Foto"
                    name="imageKey"
                    value={row.imageKey}
                    assets={mediaAssets}
                  />
                </div>
                <label className="grid gap-2 text-sm font-medium text-ink md:col-span-2">
                  <span>Biografia</span>
                  <textarea name="bio" defaultValue={row.bio.join("\n\n")} className="min-h-[8rem] rounded-[1.2rem] border border-outline/60 bg-white px-4 py-3 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" required />
                </label>
                {row.isFeatured ? (
                  <>
                    <label className="grid gap-2 text-sm font-medium text-ink md:col-span-2">
                      <span>Tagline</span>
                      <input name="tagline" defaultValue={row.tagline || ""} className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" />
                    </label>
                    <label className="grid gap-2 text-sm font-medium text-ink md:col-span-2">
                      <span>Destaques (um por linha)</span>
                      <textarea name="highlights" defaultValue={row.highlights?.join("\n") || ""} className="min-h-[5.5rem] rounded-[1.2rem] border border-outline/60 bg-white px-4 py-3 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" />
                    </label>
                  </>
                ) : null}
                <label className="grid gap-2 text-sm font-medium text-ink">
                  <span>Ordem</span>
                  <input type="number" name="sortOrder" defaultValue={row.sortOrder} className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" required />
                </label>
              </div>

              <label className="inline-flex items-center gap-3 rounded-[1.2rem] border border-outline/50 bg-surface/40 px-4 py-3 text-sm text-ink">
                <input type="checkbox" name="isActive" defaultChecked={row.isActive} className="h-4 w-4 rounded border-outline/60 text-terracotta focus:ring-terracotta" />
                Exibir este membro no site
              </label>

              <div className="flex flex-wrap gap-3">
                <SubmitButton label="Salvar membro" />
              </div>
            </form>

            <ConfirmResetForm 
              action={resetTeamMemberAction} 
              message="Tem certeza que deseja restaurar o texto padrão deste membro?"
            >
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="memberKey" value={row.memberKey} />
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
