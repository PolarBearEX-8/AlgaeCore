import Photo, { PHOTOS } from '../components/Photo'
import { d } from '../components/ui'

export default function Slide05() {
  return (
    <div className="s5">
      <div className="s5__copy">
        <p className="kicker kicker--mint" data-anim style={d(0)}>
          <span>05</span> Real-life examples · Featured project
        </p>
        <h1 className="s5__title" data-anim style={d(1)}>
          BIQ House
          <span className="s5__title-line">Hamburg, Germany · 2013</span>
        </h1>
        <p className="s5__desc" data-anim style={d(2)}>
          <strong>129 algae-filled panels</strong> grow algae, provide shade,
          and produce biomass and heat used as energy.
        </p>
        <dl className="s5__stats" data-anim style={d(3)}>
          <div>
            <dt>Location</dt>
            <dd>Hamburg, Germany</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>2013</dd>
          </div>
          <div>
            <dt>Algae panels</dt>
            <dd>129</dd>
          </div>
        </dl>
        <div className="s5__foot" data-anim style={d(4)}>
          <p className="s5__source">
            Source: <a href="https://www.arup.com/en-us/projects/solarleaf/" target="_blank" rel="noreferrer">Arup — SolarLeaf project</a>
          </p>
          <p className="s5__note">
            BIQ House is a real, built example of algae-facade technology.
            AlgaeCore is an original concept name for this presentation.
          </p>
        </div>
      </div>
      <div className="s5__photo" data-anim style={d(2)}>
        <Photo photo={PHOTOS.facadeWide} />
      </div>
    </div>
  )
}
