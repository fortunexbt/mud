import Link from "next/link";

import { listAdminBlogPosts } from "@/lib/blog";
import { localeLabels, locales, type Locale } from "@/lib/i18n-config";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const locale = typeof query.locale === "string" && locales.includes(query.locale as Locale) ? (query.locale as Locale) : "all";
  const status = typeof query.status === "string" && ["all", "draft", "published"].includes(query.status)
    ? (query.status as "all" | "draft" | "published")
    : "all";

  const posts = await listAdminBlogPosts({ locale, status });

  return (
    <div className="space-y-6">
      <section className="flex flex-wrap items-start justify-between gap-4 rounded-[1.8rem] border border-outline/50 bg-white/82 p-6 shadow-soft">
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">Blog</p>
          <h2 className="mt-2 font-display text-[2rem] leading-tight text-ink">Posts editáveis</h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
            Aqui entram os posts criados pelo painel. Eles convivem com os posts antigos em Markdown, e quando um slug se repete o conteúdo do painel assume prioridade pública.
          </p>
        </div>

        <Link href="/admin/content/blog/new" className="inline-flex min-h-11 items-center justify-center rounded-full border border-transparent bg-terracotta px-5 text-sm font-semibold text-white shadow-soft transition hover:bg-clay">
          Novo post
        </Link>
      </section>

      <section className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-5 shadow-soft sm:p-6">
        <form method="GET" className="flex flex-wrap gap-3">
          <select name="locale" defaultValue={locale} className="min-h-11 rounded-full border border-outline/60 bg-white px-4 text-sm text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20">
            <option value="all">Todos os idiomas</option>
            {locales.map((entry) => (
              <option key={entry} value={entry}>{localeLabels[entry]}</option>
            ))}
          </select>
          <select name="status" defaultValue={status} className="min-h-11 rounded-full border border-outline/60 bg-white px-4 text-sm text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20">
            <option value="all">Todos os status</option>
            <option value="draft">Rascunhos</option>
            <option value="published">Publicados</option>
          </select>
          <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full border border-outline/60 bg-white px-5 text-sm font-semibold text-ink transition hover:border-terracotta/35 hover:text-terracotta">
            Filtrar
          </button>
        </form>

        <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-outline/50">
          <div className="hidden grid-cols-[0.7fr_1.35fr_0.8fr_0.7fr_0.7fr] gap-4 bg-surface/70 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted lg:grid">
            <span>Idioma</span>
            <span>Post</span>
            <span>Status</span>
            <span>Categoria</span>
            <span>Publicação</span>
          </div>

          {posts.length ? (
            <div className="divide-y divide-outline/40 bg-white">
              {posts.map((post) => (
                <Link key={post.id} href={`/admin/content/blog/${post.id}`} className="grid gap-3 px-5 py-4 transition hover:bg-surface/28 lg:grid-cols-[0.7fr_1.35fr_0.8fr_0.7fr_0.7fr] lg:items-center lg:gap-4">
                  <div className="text-sm font-medium text-ink">{localeLabels[post.locale]}</div>
                  <div>
                    <p className="font-semibold text-ink">{post.title}</p>
                    <p className="mt-1 text-sm text-muted">/{post.slug}</p>
                  </div>
                  <div>
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${post.status === "published" ? "bg-sand text-ink" : "bg-surface text-muted"}`}>
                      {post.status === "published" ? "Publicado" : "Rascunho"}
                    </span>
                  </div>
                  <div className="text-sm text-muted">{post.category}</div>
                  <div className="text-sm text-muted">{formatDate(post.publishedAt)}</div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-5 py-10 text-sm text-muted">Nenhum post gerenciado ainda.</div>
          )}
        </div>
      </section>
    </div>
  );
}
