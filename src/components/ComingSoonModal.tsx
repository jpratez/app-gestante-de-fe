import { Lock, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { usePlayer } from '../hooks/useAudioPlayer'
import { categories } from '../data/categories'
import { navigate } from '../lib/router'
import { MantoMark } from './MantoMark'

/** Pop-up "em breve": aparece ao tocar em algo que ainda não foi liberado. */
export function ComingSoonModal() {
  const { comingSoon, closeComingSoon } = usePlayer()
  const closeRef = useRef<HTMLButtonElement>(null)
  const released = categories.find((c) => c.liberada)

  useEffect(() => {
    if (!comingSoon) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeComingSoon()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [comingSoon, closeComingSoon])

  if (!comingSoon) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="soon-title"
      aria-describedby="soon-text"
      className="fixed inset-0 z-[80] flex items-center justify-center px-5"
    >
      <button
        type="button"
        aria-label="Fechar aviso"
        tabIndex={-1}
        onClick={closeComingSoon}
        className="absolute inset-0 animate-fade-in cursor-default bg-manto-900/55 backdrop-blur-[3px]"
      />
      <section className="relative w-full max-w-sm animate-fade-up overflow-hidden rounded-[2rem] bg-gradient-to-b from-white to-manto-50 text-center shadow-float">
        <div className="h-1.5 bg-gradient-to-r from-ouro-300/0 via-ouro-500 to-ouro-300/0" aria-hidden="true" />
        <button
          ref={closeRef}
          type="button"
          onClick={closeComingSoon}
          aria-label="Fechar"
          className="absolute right-3 top-4 flex h-10 w-10 items-center justify-center rounded-full text-manto-700 hover:bg-manto-100"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="px-7 pb-8 pt-9">
          <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-ouro-300 bg-gradient-to-br from-white via-cream to-ouro-300/40 text-ouro-600 shadow-[0_0_0_6px_rgb(var(--ouro-300)/0.2)]">
            <MantoMark className="h-11 w-11" />
            <span className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-manto-700 text-white ring-4 ring-white">
              <Lock className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>

          <p className="section-label mt-6">Em breve</p>
          <h2 id="soon-title" className="mt-1 font-serif text-[1.75rem] font-semibold leading-tight text-manto-900">
            Estamos preparando com carinho
          </h2>
          <div className="divider mx-auto mt-3 justify-center" aria-hidden="true">✦</div>
          <p id="soon-text" className="mt-3 text-[17px] leading-snug text-tinta-soft">
            Essas músicas estão sendo adicionadas e em breve estarão no aplicativo.
          </p>

          <div className="mt-7 grid gap-3">
            {released && (
              <button
                type="button"
                onClick={() => {
                  closeComingSoon()
                  navigate(`/categoria/${released.id}`)
                }}
                className="btn-primary w-full"
              >
                Ouvir as orações já disponíveis
              </button>
            )}
            <button type="button" onClick={closeComingSoon} className="btn-soft w-full">
              Fechar
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
