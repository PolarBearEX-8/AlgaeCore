import { d, SlideHeader } from '../components/ui'

/**
 * Team members shown on the final slide.
 * Edit the entries below to change the team members.
 * Initials are derived automatically from each name.
 */
const MEMBERS = [
  {
    name: 'Tasaphoom Jarattrakul',
  },
  {
    name: 'Witchyut Sangjansiri',
  },
  {
    name: 'Aniwut Mekwimanrat',
  },
  {
    name: 'Amnart Promdee',
  },
  {
    name: 'Auttakorn Mongkonkee',
  },
]

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join('')
}

export default function Slide06() {
  return (
    <div className="s6">
      <SlideHeader step="06" kicker="Team" title="Members" tone="light" />
      <div className="s6__grid">
        {MEMBERS.map((member, i) => (
          <article key={member.name} className="s6__card" data-anim style={d(2 + i)}>
            <span className="s6__avatar" aria-hidden="true">
              {initials(member.name)}
            </span>
            <div className="s6__info">
              <h3 className="s6__name">{member.name}</h3>
            </div>
          </article>
        ))}
      </div>
      <footer className="s6__foot" data-anim style={d(7)}>
        <span className="s6__brand">AlgaeCore</span>
        <span className="s6__thanks">Thank you for watching</span>
      </footer>
    </div>
  )
}
