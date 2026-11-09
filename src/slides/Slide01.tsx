import Photo, { PHOTOS } from '../components/Photo'
import { d } from '../components/ui'

export default function Slide01() {
  return (
    <>
      <div className="s1">
        <div className="s1__copy">
          <p className="kicker kicker--mint" data-anim style={d(0)}>
            Technology &amp; Environment · Academic Presentation
          </p>
          <h1 className="s1__title" data-anim style={d(1)}>
            AlgaeCore
            <span className="s1__title-line">Living Carbon Filter</span>
          </h1>
          <p className="s1__subtitle" data-anim style={d(2)}>
            Turning buildings into living carbon filters
          </p>
          <p className="s1__desc" data-anim style={d(3)}>
            Microalgae in transparent wall panels absorb CO₂ from the air —
            and give back oxygen.
          </p>
          <div className="s1__foot" data-anim style={d(4)}>
            <span className="chip">Concept study</span>
            <span className="s1__note">
              Original concept — not a deployed product.
            </span>
          </div>
        </div>
      </div>
      <div className="s1__photo" data-anim style={d(2)}>
        <Photo photo={PHOTOS.houseFull} />
      </div>
    </>
  )
}
