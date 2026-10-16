import { team } from '@/config/content'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { TeamMember } from '@/types/team'

/** Silhouette affichée tant que la photo n'est pas fournie. */
function PortraitPlaceholder() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="absolute inset-x-0 bottom-0 mx-auto w-3/4 text-navy/15">
      <circle cx="12" cy="9" r="4.5" fill="currentColor" />
      <path d="M2.5 24a9.5 9.5 0 0 1 19 0z" fill="currentColor" />
    </svg>
  )
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="flex h-full flex-col rounded-card bg-white p-2 shadow-card">
      <div className="relative aspect-4/5 overflow-hidden rounded-[calc(var(--radius-card)-0.5rem)] bg-linear-to-br from-sand via-sand to-coral/45">
        {member.photo ? (
          <img src={member.photo} alt="" loading="lazy" className="size-full object-cover grayscale" />
        ) : (
          <PortraitPlaceholder />
        )}
      </div>
      <div className="flex flex-1 flex-col px-3 pt-5 pb-3 text-center">
        <h3 className="text-xl font-semibold text-navy">{member.name}</h3>
        <p className="mt-1 text-slate">{member.role}</p>
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-btn bg-navy px-4 font-semibold text-cream transition-colors hover:bg-navy-800"
          >
            <Icon name="linkedin" className="size-4" />
            {team.follow}{' '}
            <span className="sr-only">{member.name} sur LinkedIn (nouvel onglet)</span>
          </a>
        )}
      </div>
    </div>
  )
}

export function Team() {
  return (
    <section id="equipe" aria-labelledby="equipe-title" className="py-20 sm:py-28">
      <Container>
        <SectionHeading id="equipe-title" index="04" eyebrow={team.eyebrow} title={team.title} intro={team.intro} align="center" />
        <ul className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3" data-reveal-stagger>
          {team.members.map((member) => (
            <li key={member.role}>
              <MemberCard member={member} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
