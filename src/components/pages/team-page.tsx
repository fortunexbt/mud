import Link from "next/link";

import { TeamCard } from "@/components/cards/team-card";
import type { PageContext } from "@/components/pages/types";
import { ArtImage } from "@/components/ui/art-image";
import { buttonClasses } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

export function TeamPage({ dictionary, whatsappHref }: PageContext) {
  const featuredMember = dictionary.team.featuredMember;

  return (
    <main id="main">
      <section className="border-b border-outline/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8 lg:py-20">
          <div className="space-y-6">
            <SectionHeading
              as="h1"
              eyebrow={dictionary.team.hero.eyebrow}
              title={dictionary.team.hero.title}
              description={dictionary.team.hero.description}
            />
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">
              Victoria Inaudi (Vik) · {dictionary.team.founderRole}
            </p>
            <div className="space-y-4 text-base leading-8 text-muted">
              {dictionary.team.founderBio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="rounded-[1.95rem] border border-outline/45 bg-white/84 p-4 shadow-soft sm:p-5">
            <ArtImage mediaKey="founderPortrait" aspect="aspect-[4/4.35]" filter="sepia(0.15) saturate(0.88) contrast(1.02)" />
          </div>
        </div>
      </section>

      {featuredMember && dictionary.team.featuredTitle && dictionary.team.featuredIntro ? (
        <section className="border-b border-outline/40 bg-surface/42">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              <ArtImage mediaKey={featuredMember.imageKey} aspect="aspect-[4/4.8]" filter="sepia(0.1) saturate(0.94) contrast(1.02)" />
              <div className="rounded-[1.9rem] border border-outline/45 bg-white/84 p-6 shadow-soft sm:p-8">
                <SectionHeading eyebrow={dictionary.team.featuredTitle} title={featuredMember.name} description={featuredMember.tagline} />
                <p className="mt-5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-terracotta">{featuredMember.role}</p>
                <p className="mt-4 text-base leading-8 text-muted">{dictionary.team.featuredIntro}</p>
                <div className="mt-5 space-y-4 text-base leading-8 text-muted">
                  {featuredMember.bio.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <ul className="mt-6 grid gap-3 text-sm leading-7 text-muted sm:grid-cols-2">
                  {featuredMember.highlights.map((highlight) => (
                    <li key={highlight} className="rounded-[1.25rem] bg-surface/78 px-4 py-3">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading eyebrow={dictionary.team.facultyTitle} title={dictionary.team.facultyIntro} align="left" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {dictionary.team.members.map((member) => (
            <TeamCard key={member.name} member={member} placeholderLabel={dictionary.team.portraitPending} />
          ))}
        </div>
      </section>

      <section className="border-t border-outline/40 bg-surface/42">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="rounded-[1.95rem] border border-outline/45 bg-white/84 px-5 py-6 shadow-soft sm:flex sm:items-center sm:justify-between sm:gap-6 sm:px-8 sm:py-8">
            <h2 className="max-w-2xl font-display text-[2rem] leading-tight text-ink sm:text-[2.45rem]">
              {dictionary.team.facultyIntro}
            </h2>
            <Link href={whatsappHref} target="_blank" rel="noreferrer" className={buttonClasses({ className: "mt-5 sm:mt-0" })}>
              {dictionary.team.cta}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
