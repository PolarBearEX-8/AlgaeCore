import Photo, { PHOTOS } from '../components/Photo'
import { Icon } from '../components/icons'
import type { IconName } from '../components/icons'
import { d, SlideHeader } from '../components/ui'

interface ComponentRow {
  icon: IconName
  title: string
  text: string
}

const components: ComponentRow[] = [
  { icon: 'leaf', title: 'Microalgae', text: 'Absorb CO₂ by photosynthesis' },
  { icon: 'panels', title: 'Transparent panel', text: 'Sealed bioreactor on the wall' },
  { icon: 'cycle', title: 'Water circulation', text: 'Keeps nutrients moving' },
  { icon: 'sensor', title: 'CO₂ sensor', text: 'Tracks absorption live' },
]

export default function Slide02() {
  return (
    <div className="s2">
      <SlideHeader step="02" kicker="What is it?" title="What is AlgaeCore?" tone="light" />
      <div className="s2__body">
        <div className="s2__copy">
          <p className="lead" data-anim style={d(2)}>
            A <strong>modular system</strong> that grows microalgae in
            transparent panels installed on building walls.
          </p>
          <p className="s2__lede" data-anim style={d(3)}>Key components</p>
          <ul className="s2__components">
            {components.map((c, i) => (
              <li key={c.title} className="s2__comp" data-anim style={d(3 + i)}>
                <span className="s2__num">0{i + 1}</span>
                <span className="s2__cicon"><Icon name={c.icon} size={16} /></span>
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="s2__photo" data-anim style={d(3)}>
          <Photo photo={PHOTOS.facadeDetail} caption="Real algae panels — BIQ House facade" />
        </div>
      </div>
    </div>
  )
}
