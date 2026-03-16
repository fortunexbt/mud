import { resetTeamMemberAction, saveTeamMemberAction } from "@/app/admin/actions";
import { getTeamMemberEditorRows } from "@/lib/team-content";
import { localeLabels, locales, type Locale } from "@/lib/i18n-config";
import { mediaKeys } from "@/lib/media";

export default async function AdminTeamPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const locale = typeof query.locale === "string" && locales.includes(query.locale as Locale) ? (query.locale as Locale) : "pt";
  const rows = await getTeamMemberEditorRows(locale);

  return (
    <div className="space-y-6">
      <section className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-6 shadow-soft">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">Equipe</p>
        <h2 className="mt-2 font-display text-[2rem] leading-tight text-ink">Editar membros da equipe</h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
          Edite informações dos membros da equipe, incluindo fundadora, membro em destaque e faculty. Cada membro tem nome, função, biografia e foto.
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
            href={`/admin/content/team?locale=${entry}`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${entry === locale ? "bg-ink text-white" : "border border-outline/60 bg-white text-ink hover:border-terracotta/35 hover:text-terracotta"}`}
          >
            {localeLabels[entry]}
          </a>
        ))}
      </section>

      <section className="grid gap-5">
        {rows.map((row) => (
          <div key={row.memberKey} className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-5 shadow-soft sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-terracotta">
                  {row.isFeatured ? "Membro em Destaque" : row.memberKey === "founder" ? "Fundadora" : "Faculty"}
                </p>
                <h3 className="mt-1 font-display text-[1.8rem] leading-tight text-ink">{row.name}</h3>
              </div>
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${row.isActive ? "bg-sand text-ink" : "bg-surface text-muted"}`}>
                {row.isActive ? "Ativo" : "Oculto"}
              </span>
            </div>

            <form action={saveTeamMemberAction} className="mt-5 grid gap-4">
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
                <label className="grid gap-2 text-sm font-medium text-ink md:col-span-2">
                  <span>Foto</span>
                  <select name="imageKey" defaultValue={row.imageKey} className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20">
                    {mediaKeys.map((key) => (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-medium text-ink md:col-span-2">
                  <span>Biografia (separe parágrafos com linha vazia)</span>
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
                <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full border border-transparent bg-terracotta px-5 text-sm font-semibold text-white shadow-soft transition hover:bg-clay">
                  Salvar membro
                </button>
              </div>
            </form>

            <form action={resetTeamMemberAction} className="mt-4">
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="memberKey" value={row.memberKey} />
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