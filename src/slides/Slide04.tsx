import { Icon } from '../components/icons'
import { d, SlideHeader } from '../components/ui'

interface Row {
  title: string
  text: string
}

const benefits: Row[] = [
  { title: 'Absorbs CO₂', text: 'Carbon capture where people already live' },
  { title: 'Uses existing building space', text: 'No extra land needed' },
  { title: 'Modular and expandable', text: 'Scale up panel by panel' },
  { title: 'Produces reusable biomass', text: 'For energy or raw materials' },
]

const limitations: Row[] = [
  { title: 'Requires sunlight', text: 'Shaded walls do not perform' },
  { title: 'Needs regular maintenance', text: 'Water and nutrients need checks' },
  { title: 'Installation can be expensive', text: 'Facade work and plumbing add cost' },
  { title: 'Absorption depends on conditions', text: 'Performance varies with climate' },
]

export default function Slide04() {
  return (
    <div className="s4">
      <SlideHeader step="04" kicker="Analysis" title="Benefits &amp; Limitations" tone="light" />
      <div className="s4__cols">
        <section className="s4__col s4__col--benefits" data-anim style={d(1)}>
          <header className="s4__head">
            <span className="s4__badge s4__badge--benefits"><Icon name="leaf" size={15} /></span>
            Benefits
            <span className="s4__count">04</span>
          </header>
          <ul>
            {benefits.map((b, i) => (
              <li key={b.title} className="s4__row" data-anim style={d(2 + i)}>
                <span className="s4__mark s4__mark--b"><Icon name="plus" size={11} strokeWidth={2.2} /></span>
                <div>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="s4__col s4__col--limits" data-anim style={d(2)}>
          <header className="s4__head">
            <span className="s4__badge s4__badge--limits"><Icon name="minus" size={15} strokeWidth={2.2} /></span>
            Limitations
            <span className="s4__count">04</span>
          </header>
          <ul>
            {limitations.map((l, i) => (
              <li key={l.title} className="s4__row" data-anim style={d(3 + i)}>
                <span className="s4__mark s4__mark--l"><Icon name="minus" size={11} strokeWidth={2.2} /></span>
                <div>
                  <h3>{l.title}</h3>
                  <p>{l.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
