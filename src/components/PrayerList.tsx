import type { Prayer } from '../types'
import { PrayerListItem } from './PrayerListItem'

interface Props {
  prayers: Prayer[]
  showCategory?: boolean
}

/** Lista estilo playlist. A "fila" do player é a própria lista exibida. */
export function PrayerList({ prayers, showCategory }: Props) {
  return (
    <ul className="space-y-3">
      {prayers.map((prayer, i) => (
        <PrayerListItem key={prayer.id} prayer={prayer} index={i} queue={prayers} showCategory={showCategory} />
      ))}
    </ul>
  )
}
