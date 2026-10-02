import { Loader2, Pause, Play, SkipBack, SkipForward, X } from 'lucide-react'
import { usePlayer, usePlayerTime } from '../hooks/useAudioPlayer'
import { categoryById } from '../lib/catalog'
import { PrayerCover } from './PrayerCover'

export function MiniPlayer() {
  const { current, playing, loading, toggle, next, previous, setFullOpen, closePlayer } = usePlayer()
  const { time, duration } = usePlayerTime()
  if (!current) return null

  const category = categoryById(current.categoryId)
  const pct = duration > 0 ? Math.min(100, (time / duration) * 100) : 0

  return (
    <div className="relative mx-3 mb-2 animate-fade-up">
      <button
        type="button"
        onClick={closePlayer}
        aria-label="Fechar player"
        className="absolute -top-3 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-manto-200 bg-white text-manto-800 shadow-soft transition hover:bg-manto-50 active:scale-90"
      >
        <X className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
      </button>
      <div className="overflow-hidden rounded-2xl bg-manto-800 text-white shadow-float">
      <div className="h-[3px] w-full bg-white/15" aria-hidden="true">
        <div className="h-full bg-ouro-300 transition-[width] duration-300" style={{ width: `${pct}%` }} />
      </div>
      <div className="flex items-center gap-1 p-2.5 pr-2">
        <button
          type="button"
          onClick={() => setFullOpen(true)}
          aria-label={`Abrir player: ${current.title}`}
          className="flex min-w-0 flex-1 items-center gap-3 rounded-xl text-left focus-visible:ring-offset-manto-800"
        >
          <PrayerCover prayer={current} className="h-12 w-12 shrink-0 rounded-xl" />
          <span className="min-w-0">
            <span className="block truncate text-[15px] font-bold leading-tight">{current.title}</span>
            <span className="block truncate text-[13px] text-manto-200">{category?.title}</span>
          </span>
        </button>
        <button type="button" onClick={previous} aria-label="Oração anterior" className="flex h-11 w-10 items-center justify-center rounded-full hover:bg-white/10 active:scale-90">
          <SkipBack className="h-5 w-5 fill-current" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pausar' : 'Tocar'}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-manto-800 active:scale-90"
        >
          {loading && playing ? (
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
          ) : playing ? (
            <Pause className="h-5 w-5 fill-current" aria-hidden="true" />
          ) : (
            <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />
          )}
        </button>
        <button type="button" onClick={next} aria-label="Próxima oração" className="flex h-11 w-10 items-center justify-center rounded-full hover:bg-white/10 active:scale-90">
          <SkipForward className="h-5 w-5 fill-current" aria-hidden="true" />
        </button>
      </div>
      </div>
    </div>
  )
}
