import Link from "next/link";

import { BlogPostForm } from "@/components/admin/blog-post-form";
import { getSiteMediaSelectionAssets } from "@/lib/media-db";

export default async function NewAdminBlogPostPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const error = query.error === "validation";
  const assets = getSiteMediaSelectionAssets();

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/content/blog" className="text-sm font-semibold text-terracotta hover:text-clay">
          Voltar para posts
        </Link>
        <h2 className="mt-2 font-display text-[2.1rem] leading-tight text-ink">Novo post</h2>
      </div>
      <BlogPostForm assets={assets} error={error} />
    </div>
  );
}
