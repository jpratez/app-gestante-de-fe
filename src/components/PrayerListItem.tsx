import { FileText, Loader2, Pause, Play } from 'lucide-react'
import { usePlayer } from '../hooks/useAudioPlayer'
import { categoryById } from '../lib/catalog'
import { cn, pad } from '../lib/utils'
import type { Prayer } from '../types'
import { DownloadButton } from './DownloadButton'
import { Equalizer } from './Equalizer'
import { FavoriteButton } from './FavoriteButton'

interface Props {
  prayer: Prayer
  index: number
  queue: Prayer[]
  showCategory?: boolean
}

export function PrayerListItem({ prayer, index, queue, showCategory }: Props) {
  const { current, playing, loading, playPrayer, openLyrics } = usePlayer()
  const isCurrent = current?.id === prayer.id
  const isPlaying = isCurrent && playing
  const category = categoryById(prayer.categoryId)

  return (
    <li
      className={cn(
        'rounded-3xl border p-4 transition',
        isCurrent ? 'border-manto-200 bg-manto-50 shadow-soft' : 'border-manto-100 bg-gradient-to-b from-white to-manto-50/70',
      )}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => playPrayer(prayer, queue)}
          aria-label={isPlaying ? `Pausar ${prayer.title}` : `Ouvir ${prayer.title}`}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-manto-600 text-white shadow-soft transition hover:bg-manto-700 active:scale-95"
        >
          {isCurrent && loading && playing ? (
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
          ) : isPlaying ? (
            <Pause className="h-5 w-5 fill-current" aria-hidden="true" />
          ) : (
            <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 text-sm font-bold tabular-nums text-ouro-600">
            <span>{pad(index + 1)}</span>
            <span className="text-tinta-soft/70" aria-hidden="true">·</span>
            <span className="font-semibold text-tinta-soft">{prayer.duration}</span>
            {isPlaying && <Equalizer />}
          </p>
          <h3 className="font-serif text-[1.3rem] font-semibold leading-snug text-manto-900">{prayer.title}</h3>
          {showCategory && category && <p className="text-sm text-tinta-soft">{category.title}</p>}
        </div>

        <FavoriteButton prayerId={prayer.id} title={prayer.title} />
      </div>

      <div className="mt-3 flex flex-wrap gap-2 pl-[3.75rem]">
        <button type="button" onClick={() => openLyrics(prayer)} aria-label={`Ver letra de ${prayer.title}`} className="pill">
          <FileText className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
          Letra
        </button>
        <DownloadButton prayer={prayer} />
      </div>
    </li>
  )
}
