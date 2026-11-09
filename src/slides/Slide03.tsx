import { Icon } from '../components/icons'
import type { IconName } from '../components/icons'
import { d, SlideHeader } from '../components/ui'

interface Benefit {
  no: string
  icon: IconName
  title: string
  text: string
}

const benefits: Benefit[] = [
  { no: '01', icon: 'co2', title: 'Absorbs CO₂', text: 'Captures carbon dioxide straight from the air.' },
  { no: '02', icon: 'o2', title: 'Produces oxygen', text: 'Releases fresh O₂ back into the city.' },
  { no: '03', icon: 'building', title: 'Uses building space', text: 'Turns unused walls into a living system.' },
  { no: '04', icon: 'flask', title: 'Creates biomass', text: 'Harvested algae become useful raw materials.' },
]

export default function Slide03() {
  return (
    <div className="s3">
      <SlideHeader step="03" kicker="Environmental impact" title="How does it help the environment?" />
      <div className="s3__grid">
        {benefits.map((b, i) => (
          <article key={b.no} className="s3__cell" data-anim style={d(1 + i)}>
            <span className="s3__ghost">{b.no}</span>
            <span className="s3__icon"><Icon name={b.icon} size={21} /></span>
            <h3>{b.title}</h3>
            <p>{b.text}</p>
          </article>
        ))}
      </div>
      <div className="s3__flow" data-anim style={d(5)}>
        <span className="s3__pill">CO₂ captured</span>
        <Icon name="arrowR" size={16} strokeWidth={1.3} />
        <span className="s3__pill s3__pill--core">AlgaeCore panel</span>
        <Icon name="arrowR" size={16} strokeWidth={1.3} />
        <span className="s3__pill">O₂ released</span>
        <Icon name="arrowR" size={16} strokeWidth={1.3} />
        <span className="s3__pill">Biomass harvested</span>
      </div>
    </div>
  )
}
