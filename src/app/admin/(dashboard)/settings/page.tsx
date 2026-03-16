import { saveSettingsAction } from "@/app/admin/actions";
import { getManagedSettings } from "@/lib/settings-content";

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const settings = await getManagedSettings();

  return (
    <div className="space-y-6">
      <section className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-6 shadow-soft">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">Configurações</p>
        <h2 className="mt-2 font-display text-[2rem] leading-tight text-ink">Informações de Contato e Globais</h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
          Gerencie os canais de contato da escola, como WhatsApp, Instagram, email e horários de funcionamento.
          Essas informações são usadas em todo o site.
        </p>
        {query.saved === "1" ? (
          <p className="mt-4 rounded-[1.2rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">Alterações salvas.</p>
        ) : null}
        {query.error ? (
          <p className="mt-4 rounded-[1.2rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">Revise os campos obrigatórios antes de salvar.</p>
        ) : null}
      </section>

      <section className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-5 shadow-soft sm:p-6">
        <form action={saveSettingsAction} className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-ink">
              <span>Instagram URL</span>
              <input name="instagramUrl" defaultValue={settings.instagramUrl} className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" required />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              <span>WhatsApp Number (apenas números, com código de país)</span>
              <input name="whatsappNumber" defaultValue={settings.whatsappNumber} className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" required />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              <span>Email de Contato</span>
              <input name="email" type="email" defaultValue={settings.email} className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              <span>Horário de Funcionamento (texto livre)</span>
              <input name="hours" defaultValue={settings.hours} className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" />
            </label>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full border border-transparent bg-terracotta px-5 text-sm font-semibold text-white shadow-soft transition hover:bg-clay">
              Salvar Configurações
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}