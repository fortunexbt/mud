"use client";

import { motion } from "framer-motion";

import type { TeamMember } from "@/content/site/types";
import { TeamCard } from "@/components/cards/team-card";
import type { PageContext } from "@/components/pages/types";
import { ArtImage } from "@/components/ui/art-image";
import { SectionHeading } from "@/components/ui/section-heading";

const founderNameAliases = ["victoria", "vik", "inaudi"] as const;
const preferredCardOrder = [
  { imageKey: "julianaMorenoPortrait", aliases: ["juliana"] },
  { imageKey: "cristianeBelacianoPortrait", aliases: ["cris", "cristiane"] },
  { imageKey: "doloresPortrait", aliases: ["dolo", "dolores"] },
  { imageKey: "brunaLanesPortrait", aliases: ["bruna"] },
] as const;

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function matchesAlias(value: string, aliases: readonly string[]) {
  const normalizedValue = normalize(value);
  return aliases.some((alias) => normalizedValue.includes(alias));
}

function isFounderMember(member: TeamMember) {
  return member.imageKey === "founderPortrait" || matchesAlias(member.name, founderNameAliases);
}

export function TeamPage({ locale, dictionary }: PageContext) {
  const featuredMember = dictionary.team.featuredMember;
  const mergedMembers: TeamMember[] = [
    ...(featuredMember
      ? [
          {
            name: featuredMember.name,
            role: featuredMember.role,
            bio: featuredMember.bio,
            imageKey: featuredMember.imageKey,
          } satisfies TeamMember,
        ]
      : []),
    ...dictionary.team.members,
  ];
  const uniqueMembers: TeamMember[] = [];
  const seenMembers = new Set<string>();

  mergedMembers.forEach((member) => {
    const key = `${normalize(member.name)}:${member.imageKey}`;
    if (seenMembers.has(key)) {
      return;
    }
    seenMembers.add(key);
    uniqueMembers.push(member);
  });

  const founderMember = uniqueMembers.find((member) => isFounderMember(member));
  const founderName =
    founderMember && normalize(founderMember.name) !== normalize(founderMember.role)
      ? founderMember.name
      : "Victoria Inaudi (Vik)";
  const founderRole = founderMember?.role || dictionary.team.founderRole;
  const founderBio = founderMember?.bio.length ? founderMember.bio : dictionary.team.founderBio;
  const nonFounderMembers = uniqueMembers.filter((member) => !isFounderMember(member));
  const orderedMembers: TeamMember[] = [];
  const consumedIndexes = new Set<number>();

  preferredCardOrder.forEach(({ imageKey, aliases }) => {
    const foundIndex = nonFounderMembers.findIndex(
      (member, index) =>
        !consumedIndexes.has(index) &&
        (member.imageKey === imageKey || matchesAlias(member.name, aliases)),
    );
    if (foundIndex < 0) {
      return;
    }
    consumedIndexes.add(foundIndex);
    orderedMembers.push(nonFounderMembers[foundIndex]);
  });

  const trailingMembers = nonFounderMembers.filter((_, index) => !consumedIndexes.has(index));
  const teamCards = [...orderedMembers, ...trailingMembers];

  return (
    <main id="main">
      <section className="border-b border-outline/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8 lg:py-14">
          <div className="space-y-6">
            <SectionHeading
              as="h1"
              eyebrow={dictionary.team.hero.eyebrow}
              title={dictionary.team.hero.title}
              description={dictionary.team.hero.description}
            />
            <h2 className="font-display text-[2.3rem] leading-[0.98] text-ink sm:text-[3rem]">{founderName}</h2>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">{founderRole}</p>
            <div className="space-y-4 text-base leading-8 text-muted">
              {founderBio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="rounded-[1.95rem] border border-outline/45 bg-white/84 p-4 shadow-soft sm:p-5">
            <ArtImage
              mediaKey="founderPortrait"
              aspect="aspect-[4/4.35]"
              filter="sepia(0.15) saturate(0.88) contrast(1.02)"
              sizes="(min-width: 1280px) 560px, (min-width: 1024px) 48vw, 100vw"
              priority
              locale={locale}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <SectionHeading eyebrow={dictionary.team.facultyTitle} title={dictionary.team.facultyIntro} align="left" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {teamCards.map((member) => (
            <motion.div
              key={member.name}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
            >
              <TeamCard member={member} placeholderLabel={dictionary.team.portraitPending} locale={locale} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
