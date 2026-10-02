import { Play } from 'lucide-react'
import { useResume } from '../hooks/useAudioPlayer'
import { categoryById, prayersByCategory } from '../lib/catalog'
import { formatTime } from '../lib/utils'
import { PrayerCover } from './PrayerCover'

/** Só aparece se esta pessoa já ouviu alguma oração neste aparelho. */
export function ContinueListening() {
  const { prayer, time, resume } = useResume()
  if (!prayer) return null
  const category = categoryById(prayer.categoryId)

  return (
    <section aria-labelledby="continue-title" className="mb-10 animate-fade-up">
      <h2 id="continue-title" className="mb-3 font-serif text-[1.6rem] font-semibold text-manto-900">
        Continue sua oração
      </h2>
      <div className="flex items-center gap-4 rounded-3xl bg-gradient-to-br from-manto-700 to-manto-900 p-3 pr-4 shadow-card">
        <PrayerCover prayer={prayer} className="h-20 w-20 shrink-0 rounded-2xl" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-serif text-[1.25rem] font-semibold leading-tight text-white">{prayer.title}</p>
          <p className="truncate text-sm text-manto-200">
            {category?.title}
            {time > 5 && ` · parou em ${formatTime(time)}`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => resume(prayersByCategory(prayer.categoryId))}
          aria-label={`Continuar ${prayer.title}`}
          className="flex h-12 shrink-0 items-center gap-2 rounded-full bg-white px-4 text-[15px] font-bold text-manto-800 shadow-soft active:scale-95"
        >
          <Play className="h-4 w-4 fill-current" aria-hidden="true" />
          Continuar
        </button>
      </div>
    </section>
  )
}
