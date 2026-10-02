import { ChevronDown, FileText, Loader2, Pause, Play, SkipBack, SkipForward } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { usePlayer } from '../hooks/useAudioPlayer'
import { categoryById } from '../lib/catalog'
import { navigate } from '../lib/router'
import { DownloadButton } from './DownloadButton'
import { FavoriteButton } from './FavoriteButton'
import { PrayerCover } from './PrayerCover'
import { ProgressBar } from './ProgressBar'
import { Skip10 } from './Skip10'

export function FullPlayer() {
  const { current, playing, loading, toggle, next, previous, skip, fullOpen, setFullOpen, openLyrics } = usePlayer()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!fullOpen) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setFullOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [fullOpen, setFullOpen])

  if (!fullOpen || !current) return null
  const category = categoryById(current.categoryId)

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Player: ${current.title}`}
      className="fixed inset-0 z-50 animate-slide-up overflow-y-auto bg-gradient-to-b from-manto-100 via-cream to-cream"
    >
      <div className="mx-auto flex min-h-full max-w-xl flex-col px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
        <div className="flex items-center justify-between">
          <button
            ref={closeRef}
            type="button"
            onClick={() => setFullOpen(false)}
            aria-label="Fechar player"
            className="flex h-12 w-12 items-center justify-center rounded-full text-manto-700 hover:bg-white/60"
          >
            <ChevronDown className="h-7 w-7" aria-hidden="true" />
          </button>
          <p className="section-label">Rezando agora</p>
          <FavoriteButton prayerId={current.id} title={current.title} className="h-12 w-12" />
        </div>

        <PrayerCover
          prayer={current}
          className="mx-auto mt-5 aspect-square w-full max-w-[21rem] rounded-[2rem] shadow-float ring-1 ring-white/70"
        />

        <div className="mt-7 text-center">
          <h2 className="font-serif text-[1.9rem] font-semibold leading-tight text-manto-900">{current.title}</h2>
          <button
            type="button"
            onClick={() => {
              setFullOpen(false)
              navigate(`/categoria/${current.categoryId}`)
            }}
            className="mt-1 text-[15px] font-semibold text-ouro-600 underline-offset-4 hover:underline"
          >
            {category?.title}
          </button>
        </div>

        <div className="mt-5">
          <ProgressBar />
        </div>

        <div className="mt-2 flex items-center justify-between text-manto-700">
          <Skip10 direction="back" onClick={() => skip(-10)} className="hover:bg-white/60" />
          <button type="button" onClick={previous} aria-label="Oração anterior" className="flex h-14 w-14 items-center justify-center rounded-full hover:bg-white/60 active:scale-90">
            <SkipBack className="h-7 w-7 fill-current" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? 'Pausar' : 'Tocar'}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-manto-600 text-white shadow-card transition hover:bg-manto-700 active:scale-95"
          >
            {loading && playing ? (
              <Loader2 className="h-8 w-8 animate-spin" aria-hidden="true" />
            ) : playing ? (
              <Pause className="h-8 w-8 fill-current" aria-hidden="true" />
            ) : (
              <Play className="ml-1 h-8 w-8 fill-current" aria-hidden="true" />
            )}
          </button>
          <button type="button" onClick={next} aria-label="Próxima oração" className="flex h-14 w-14 items-center justify-center rounded-full hover:bg-white/60 active:scale-90">
            <SkipForward className="h-7 w-7 fill-current" aria-hidden="true" />
          </button>
          <Skip10 direction="forward" onClick={() => skip(10)} className="hover:bg-white/60" />
        </div>

        <div className="mt-auto grid gap-3 pt-8">
          <button type="button" onClick={() => openLyrics(current)} className="btn-primary w-full">
            <FileText className="h-5 w-5" aria-hidden="true" />
            Ver letra
          </button>
          <DownloadButton prayer={current} label="Baixar oração" className="btn-soft w-full" />
        </div>
      </div>
    </div>
  )
}
