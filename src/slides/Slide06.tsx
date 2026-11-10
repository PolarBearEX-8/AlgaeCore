import { d, SlideHeader } from '../components/ui'

/**
 * Team members shown on the final slide.
 * Edit the entries below to change names, roles and descriptions.
 * Initials are derived automatically from each name.
 */
const MEMBERS = [
  {
    name: 'Alex Morgan',
    role: 'Research & Content',
    text: 'Algae biology, CO₂ absorption data and sources.',
  },
  {
    name: 'Sam Rivera',
    role: 'Design & Visuals',
    text: 'Slide design, layout and photo selection.',
  },
  {
    name: 'Jordan Lee',
    role: 'Technology & Cases',
    text: 'Panel technology and the BIQ House case study.',
  },
  {
    name: 'Taylor Brooks',
    role: 'Data & Analysis',
    text: 'Performance figures, comparisons and charts.',
  },
  {
    name: 'Casey Nguyen',
    role: 'Presentation & Q&A',
    text: 'Narration, delivery and discussion.',
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
              <p className="s6__role">{member.role}</p>
              <p className="s6__text">{member.text}</p>
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
