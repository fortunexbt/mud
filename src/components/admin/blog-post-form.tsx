import { deleteBlogPostAction, saveBlogPostAction } from "@/app/admin/actions";
import type { AdminBlogPostRecord, ManagedBlogPostStatus } from "@/lib/blog";
import { localeLabels, locales } from "@/lib/i18n-config";
import { mediaKeys } from "@/lib/media";

interface BlogPostFormProps {
  post?: AdminBlogPostRecord | null;
  error?: boolean;
}

const statuses: ManagedBlogPostStatus[] = ["draft", "published"];

function formatDateTimeLocal(value: string) {
  const date = new Date(value);
  const pad = (input: number) => String(input).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function BlogPostForm({ post, error = false }: BlogPostFormProps) {
  return (
    <div className="space-y-6">
      <form action={saveBlogPostAction} className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-6 shadow-soft sm:p-8">
        {post?.id ? <input type="hidden" name="id" value={post.id} /> : null}

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-ink">
            <span>Idioma</span>
            <select
              name="locale"
              defaultValue={post?.locale || "pt"}
              className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
            >
              {locales.map((locale) => (
                <option key={locale} value={locale}>
                  {localeLabels[locale]}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium text-ink">
            <span>Status</span>
            <select
              name="status"
              defaultValue={post?.status || "draft"}
              className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === "draft" ? "Rascunho" : "Publicado"}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium text-ink">
            <span>Slug</span>
            <input
              name="slug"
              defaultValue={post?.slug || ""}
              placeholder="ex.: primeira-aula-mud"
              className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
              required
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-ink">
            <span>Translation key</span>
            <input
              name="translationKey"
              defaultValue={post?.translationKey || ""}
              placeholder="ex.: first-class-mud"
              className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
              required
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-ink md:col-span-2">
            <span>Título</span>
            <input
              name="title"
              defaultValue={post?.title || ""}
              className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
              required
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-ink md:col-span-2">
            <span>Resumo</span>
            <textarea
              name="excerpt"
              defaultValue={post?.excerpt || ""}
              className="min-h-[6rem] rounded-[1.2rem] border border-outline/60 bg-white px-4 py-3 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
              required
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-ink">
            <span>Categoria</span>
            <input
              name="category"
              defaultValue={post?.category || ""}
              placeholder="ex.: Primeira aula"
              className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
              required
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-ink">
            <span>Publicação</span>
            <input
              type="datetime-local"
              name="publishedAt"
              defaultValue={post?.publishedAt ? formatDateTimeLocal(post.publishedAt) : formatDateTimeLocal(new Date().toISOString())}
              className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
              required
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-ink">
            <span>Imagem de capa (`MediaKey`)</span>
            <select
              name="cover"
              defaultValue={post?.cover || "heroProcess"}
              className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
            >
              {mediaKeys.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium text-ink">
            <span>Assinatura</span>
            <input
              name="authorLabel"
              defaultValue={post?.authorLabel || "MUD"}
              className="min-h-11 rounded-[1.2rem] border border-outline/60 bg-white px-4 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-ink md:col-span-2">
            <span>Conteúdo em Markdown</span>
            <textarea
              name="contentMarkdown"
              defaultValue={post?.contentMarkdown || ""}
              className="min-h-[22rem] rounded-[1.2rem] border border-outline/60 bg-white px-4 py-3 font-mono text-sm text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
              required
            />
          </label>
        </div>

        {error ? (
          <p className="mt-4 rounded-[1.2rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            Revise os campos obrigatórios. Também verifique se o slug e a imagem de capa estão válidos.
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full border border-transparent bg-terracotta px-5 text-sm font-semibold text-white shadow-soft transition hover:bg-clay">
            {post ? "Salvar alterações" : "Criar post"}
          </button>
        </div>
      </form>

      {post ? (
        <form action={deleteBlogPostAction} className="rounded-[1.5rem] border border-outline/50 bg-white/78 p-4 shadow-soft">
          <input type="hidden" name="id" value={post.id} />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm leading-6 text-muted">Excluir remove apenas a versão gerenciada no painel. O conteúdo em arquivo continua existindo se houver uma versão estática com o mesmo tema.</p>
            <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full border border-outline/60 bg-white px-5 text-sm font-semibold text-ink transition hover:border-red-300 hover:text-red-700">
              Excluir post
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
