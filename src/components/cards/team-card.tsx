import type { TeamMember } from "@/content/site/types";
import { TeamPortrait } from "@/components/ui/team-portrait";

interface TeamCardProps {
  member: TeamMember;
  placeholderLabel: string;
}

export function TeamCard({ member, placeholderLabel }: TeamCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-outline/50 bg-white/84 p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card sm:rounded-[2rem] sm:p-6">
      <TeamPortrait member={member} placeholderLabel={placeholderLabel} className="mb-5 aspect-[5/4]" />
      <h3 className="font-display text-2xl text-ink">{member.name}</h3>
      <p className="mt-1 text-[0.72rem] uppercase tracking-[0.18em] text-terracotta">{member.role}</p>
      <div className="mt-4 space-y-3 text-sm leading-7 text-muted">
        {member.bio.map((paragraph, index) => (
          <p key={`${member.name}-${index}`} className={index > 0 ? "hidden sm:block" : "block"}>
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
