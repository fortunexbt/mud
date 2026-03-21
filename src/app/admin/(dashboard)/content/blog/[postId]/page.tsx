import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogPostForm } from "@/components/admin/blog-post-form";
import { getAdminBlogPostById } from "@/lib/blog";
import { getSiteMediaSelectionAssets } from "@/lib/media-db";

export default async function AdminBlogPostDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ postId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { postId } = await params;
  const query = await searchParams;
  const post = await getAdminBlogPostById(postId);
  const assets = getSiteMediaSelectionAssets();

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/content/blog" className="text-sm font-semibold text-terracotta hover:text-clay">
          Voltar para posts
        </Link>
        <h2 className="mt-2 font-display text-[2.1rem] leading-tight text-ink">Editar post</h2>
        <p className="mt-2 text-sm text-muted">ID: {post.id}</p>
        {query.saved === "1" ? (
          <p className="mt-3 rounded-[1.2rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Alterações salvas.
          </p>
        ) : null}
      </div>
      <BlogPostForm post={post} assets={assets} error={query.error === "validation"} />
    </div>
  );
}
