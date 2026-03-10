import { createAdminUserAction, toggleAdminUserAction, updateAdminUserPasswordAction } from "@/app/admin/actions";
import { getAdminActor } from "@/lib/admin-auth";
import { countAdminUsers, listAdminUsers } from "@/lib/admin-users";

function formatDate(value: string | null) {
  if (!value) return "Nunca";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const actor = await getAdminActor();
  const query = await searchParams;
  const users = await listAdminUsers();
  const userCount = await countAdminUsers();
  const canManageUsers = actor?.mode === "legacy" || actor?.role === "director";

  return (
    <div className="space-y-6">
      <section className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-6 shadow-soft">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">Usuários</p>
        <h2 className="mt-2 font-display text-[2rem] leading-tight text-ink">Contas da diretoria</h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
          Este painel começa com acesso legado por senha compartilhada, mas agora já suporta contas individuais. Cada diretora pode ter e-mail e senha próprios, com histórico de último acesso.
        </p>

        {query.saved === "1" ? (
          <p className="mt-4 rounded-[1.2rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">Alterações salvas.</p>
        ) : null}
        {query.error ? (
          <p className="mt-4 rounded-[1.2rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            Não foi possível concluir a ação. Revise os dados e tente novamente.
          </p>
        ) : null}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[1.5rem] border border-outline/50 bg-white/82 p-5 shadow-soft">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted">Contas cadastradas</p>
          <p className="mt-2 font-display text-[2rem] text-ink">{userCount}</p>
        </div>
        <div className="rounded-[1.5rem] border border-outline/50 bg-white/82 p-5 shadow-soft md:col-span-2">
          <p className="text-sm leading-7 text-muted">
            {canManageUsers
              ? "Você pode criar novas contas, redefinir senhas e desativar acessos."
              : "Você pode ver os usuários cadastrados, mas apenas diretoras conseguem alterar acessos."}
          </p>
        </div>
      </section>

      {canManageUsers ? (
        <section className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-6 shadow-soft sm:p-8">
          <h3 className="font-display text-[1.8rem] leading-tight text-ink">Criar nova conta</h3>
          <form action={createAdminUserAction} className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-ink">
              <span>Nome completo</span>
              <input name="fullName" className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" required />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              <span>E-mail</span>
              <input type="email" name="email" className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" required />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              <span>Senha inicial</span>
              <input type="password" name="password" minLength={10} className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" required />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              <span>Papel</span>
              <select name="role" defaultValue="director" className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20">
                <option value="director">Diretora</option>
                <option value="editor">Editora</option>
              </select>
            </label>
            <div className="md:col-span-2">
              <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full border border-transparent bg-terracotta px-5 text-sm font-semibold text-white shadow-soft transition hover:bg-clay">
                Criar conta
              </button>
            </div>
          </form>
        </section>
      ) : null}

      <section className="grid gap-5">
        {users.length ? (
          users.map((user) => (
            <article key={user.id} className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-5 shadow-soft sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-[1.65rem] leading-tight text-ink">{user.fullName}</h3>
                  <p className="mt-1 text-sm text-muted">{user.email}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex rounded-full bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                    {user.role === "director" ? "Diretora" : "Editora"}
                  </span>
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${user.isActive ? "bg-sand text-ink" : "bg-surface text-muted"}`}>
                    {user.isActive ? "Ativa" : "Desativada"}
                  </span>
                </div>
              </div>

              <div className="mt-4 grid gap-3 text-sm text-muted sm:grid-cols-2">
                <p>Último acesso: {formatDate(user.lastLoginAt)}</p>
                <p>Criada em: {formatDate(user.createdAt)}</p>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
                <form action={updateAdminUserPasswordAction} className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
                  <input type="hidden" name="userId" value={user.id} />
                  <label className="grid gap-2 text-sm font-medium text-ink">
                    <span>Redefinir senha</span>
                    <input type="password" name="password" minLength={10} className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20" required={canManageUsers || actor?.mode === "user" && actor.id === user.id} disabled={!canManageUsers && !(actor?.mode === "user" && actor.id === user.id)} />
                  </label>
                  <button type="submit" disabled={!canManageUsers && !(actor?.mode === "user" && actor.id === user.id)} className="inline-flex min-h-11 items-center justify-center rounded-full border border-outline/60 bg-white px-5 text-sm font-semibold text-ink transition hover:border-terracotta/35 hover:text-terracotta disabled:cursor-not-allowed disabled:opacity-50">
                    Salvar senha
                  </button>
                </form>

                {canManageUsers ? (
                  <form action={toggleAdminUserAction}>
                    <input type="hidden" name="userId" value={user.id} />
                    <input type="hidden" name="nextValue" value={user.isActive ? "false" : "true"} />
                    <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full border border-outline/60 bg-white px-5 text-sm font-semibold text-ink transition hover:border-terracotta/35 hover:text-terracotta">
                      {user.isActive ? "Desativar conta" : "Reativar conta"}
                    </button>
                  </form>
                ) : null}
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-6 shadow-soft text-sm text-muted">
            Nenhuma conta individual cadastrada ainda. Enquanto isso, o acesso legado por senha compartilhada continua funcionando.
          </div>
        )}
      </section>
    </div>
  );
}
