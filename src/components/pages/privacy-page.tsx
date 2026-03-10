import { SectionHeading } from "@/components/ui/section-heading";
import type { PageContext } from "@/components/pages/types";

export function PrivacyPage({ dictionary }: PageContext) {
  return (
    <main id="main">
      <section className="border-b border-outline/40">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeading
            as="h1"
            eyebrow={dictionary.privacy.hero.eyebrow}
            title={dictionary.privacy.hero.title}
            description={dictionary.privacy.hero.description}
          />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5">
          {dictionary.privacy.sections.map((section) => (
            <article key={section.title} className="rounded-[2rem] border border-outline/50 bg-white/80 p-6 shadow-soft backdrop-blur sm:p-8">
              <h2 className="font-display text-3xl text-ink">{section.title}</h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-muted">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
