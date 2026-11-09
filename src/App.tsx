import Presentation from './components/Presentation'
import Slide01 from './slides/Slide01'
import Slide02 from './slides/Slide02'
import Slide03 from './slides/Slide03'
import Slide04 from './slides/Slide04'
import Slide05 from './slides/Slide05'
import type { SlideDef } from './types'

const slides: SlideDef[] = [
  { id: 'title', tone: 'dark', label: 'Name of innovation', element: <Slide01 /> },
  { id: 'what', tone: 'light', label: 'What is it?', element: <Slide02 /> },
  { id: 'environment', tone: 'dark', label: 'Environment', element: <Slide03 /> },
  { id: 'balance', tone: 'light', label: 'Benefits & Limits', element: <Slide04 /> },
  { id: 'example', tone: 'dark', label: 'Real-life example', element: <Slide05 /> },
]

export default function App() {
  return <Presentation slides={slides} />
}
