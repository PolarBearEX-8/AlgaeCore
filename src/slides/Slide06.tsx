import { d, SlideHeader } from '../components/ui'

/**
 * Team members shown on the final slide.
 * Edit the entries below to change the team members.
 * Member numbers appear in the avatar circles.
 */
const MEMBERS = [
  {
    number: 8,
    name: 'Tasaphoom Jarattrakul',
  },
  {
    number: 16,
    name: 'Witchyut Sangjansiri',
  },
  {
    number: 18,
    name: 'Aniwut Mekwimanrat',
  },
  {
    number: 19,
    name: 'Amnart Promdee',
  },
  {
    number: 27,
    name: 'Auttakorn Mongkonkee',
  },
]

export default function Slide06() {
  return (
    <div className="s6">
      <SlideHeader step="06" kicker="Team" title="Members" tone="light" />
      <div className="s6__grid">
        {MEMBERS.map((member, i) => (
          <article key={member.number} className="s6__card" data-anim style={d(2 + i)}>
            <span className="s6__avatar" aria-hidden="true">
              {member.number}
            </span>
            <div className="s6__info">
              <h3 className="s6__name">
                {member.name} <span className="s6__class">M.5/12</span>
              </h3>
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
