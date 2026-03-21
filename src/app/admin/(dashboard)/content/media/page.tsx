import Image from "next/image";

import { MediaUploadForm } from "@/components/admin/media-upload-form";
import { getAdminMediaSections } from "@/lib/media-db";

export default async function AdminMediaPage() {
  const sections = await getAdminMediaSections();

  return (
    <div className="space-y-6">
      <section className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-6 shadow-soft">
        <h2 className="font-display text-[2rem] text-ink">Biblioteca de Mídia</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
          A biblioteca agora reúne os uploads do painel, a galeria pública e os
          ativos estáticos já usados no site. Os itens do repositório aparecem
          aqui com miniaturas para revisão, mas continuam sendo arquivos
          versionados em Git.
        </p>
        <MediaUploadForm />
      </section>

      {sections.map((section) => (
        <section
          key={section.id}
          className="rounded-[1.8rem] border border-outline/40 bg-white/76 p-6 shadow-soft"
        >
          <div className="max-w-3xl">
            <h3 className="font-display text-[1.65rem] text-ink">{section.title}</h3>
            <p className="mt-2 text-sm leading-7 text-muted">{section.description}</p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {section.items.map((asset) => (
              <article
                key={asset.id}
                className="overflow-hidden rounded-[1.3rem] border border-outline/35 bg-surface/30 shadow-soft"
              >
                <div className="relative aspect-[4/3] bg-sand">
                  <Image
                    src={asset.fileUrl}
                    alt={asset.altText}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 45vw, 100vw"
                  />
                </div>
                <div className="grid gap-2 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-ink px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white">
                      {asset.sourceLabel}
                    </span>
                    {asset.isSelectable ? (
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-emerald-800">
                        Selecionável
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm font-semibold text-ink">{asset.altText || asset.fileKey}</p>
                  <p className="text-xs leading-6 text-muted">{asset.description}</p>
                  <p className="font-mono text-[0.72rem] leading-6 text-muted">
                    {asset.fileKey}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
