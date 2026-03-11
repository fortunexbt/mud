import type { TeamMember } from "@/content/site/types";
import { TeamPortrait } from "@/components/ui/team-portrait";
import type { Locale } from "@/lib/i18n-config";

interface TeamCardProps {
  member: TeamMember;
  placeholderLabel: string;
  locale: Locale;
}

export function TeamCard({ member, placeholderLabel, locale }: TeamCardProps) {
  return (
    <article className="mx-auto flex h-full w-full max-w-[28rem] flex-col rounded-[1.85rem] border border-outline/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(245,240,233,0.72))] p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card sm:rounded-[2.1rem] sm:p-6 lg:max-w-none">
      <TeamPortrait member={member} placeholderLabel={placeholderLabel} className="mb-5 aspect-[5/4]" locale={locale} />
      <h3 className="font-display text-[1.85rem] leading-tight text-ink">{member.name}</h3>
      <p className="mt-2 text-[0.72rem] uppercase tracking-[0.18em] text-terracotta">{member.role}</p>
      <div className="mt-4 space-y-3 text-sm leading-7 text-muted">
        {member.bio.slice(0, 2).map((paragraph, index) => (
          <p key={`${member.name}-${index}`}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
