import { Loader2, Pause, Play, X } from 'lucide-react'
import { useEffect, useMemo, useRef } from 'react'
import { usePlayer } from '../hooks/useAudioPlayer'
import { categoryById } from '../lib/catalog'

interface Block {
  label?: string
  lines: string[]
}

/** Transforma o texto da letra em estrofes. Linhas como [Refrão] viram títulos discretos. */
function parseLyrics(raw: string): Block[] {
  const blocks: Block[] = []
  let cur: Block = { lines: [] }
  const flush = () => {
    if (cur.lines.length || cur.label) blocks.push(cur)
    cur = { lines: [] }
  }
  for (const line of raw.trim().split('\n')) {
    const t = line.trim()
    const label = t.match(/^\[(.+)\]$/)
    if (label) {
      flush()
      cur.label = label[1]
    } else if (!t) {
      if (cur.lines.length) flush()
    } else {
      cur.lines.push(t)
    }
  }
  flush()
  return blocks
}

export function LyricsModal() {
  const { lyricsPrayer: prayer, closeLyrics, current, playing, loading, playPrayer, queue } = usePlayer()
  const closeRef = useRef<HTMLButtonElement>(null)
  const blocks = useMemo(() => (prayer ? parseLyrics(prayer.lyrics) : []), [prayer])

  useEffect(() => {
    if (!prayer) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeLyrics()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prayer, closeLyrics])

  if (!prayer) return null
  const category = categoryById(prayer.categoryId)
  const isCurrent = current?.id === prayer.id
  const isPlaying = isCurrent && playing

  return (
    <div role="dialog" aria-modal="true" aria-label={`Letra: ${prayer.title}`} className="fixed inset-0 z-[60] flex items-end justify-center">
      <button
        type="button"
        aria-label="Fechar letra"
        tabIndex={-1}
        onClick={closeLyrics}
        className="absolute inset-0 animate-fade-in cursor-default bg-manto-900/45 backdrop-blur-[2px]"
      />
      <section className="relative flex max-h-[90dvh] w-full max-w-xl animate-slide-up flex-col rounded-t-[2rem] bg-cream shadow-float">
        <header className="flex items-start gap-3 border-b border-ouro-300/40 px-6 pb-4 pt-5">
          <div className="min-w-0 flex-1">
            <p className="section-label">Letra</p>
            <h2 className="font-serif text-[1.65rem] font-semibold leading-tight text-manto-900">{prayer.title}</h2>
            <p className="text-sm text-tinta-soft">{category?.title}</p>
          </div>
          <button
            type="button"
            onClick={() => playPrayer(prayer, isCurrent ? queue : undefined)}
            aria-label={isPlaying ? 'Pausar' : 'Ouvir enquanto lê'}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-manto-600 text-white shadow-soft active:scale-95"
          >
            {isCurrent && loading && playing ? (
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            ) : isPlaying ? (
              <Pause className="h-5 w-5 fill-current" aria-hidden="true" />
            ) : (
              <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />
            )}
          </button>
          <button
            ref={closeRef}
            type="button"
            onClick={closeLyrics}
            aria-label="Fechar letra"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-manto-200 bg-white text-manto-700"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <div className="overflow-y-auto px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-6">
          {blocks.length === 0 ? (
            <p className="py-10 text-center text-tinta-soft">A letra desta oração estará disponível em breve.</p>
          ) : (
            <div className="space-y-8">
              {blocks.map((block, i) => (
                <div key={i}>
                  {block.label && (
                    <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.2em] text-ouro-600">{block.label}</p>
                  )}
                  <p className="font-serif text-[1.35rem] leading-[1.75] text-manto-900">
                    {block.lines.map((line, j) => (
                      <span key={j} className="block">{line}</span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
