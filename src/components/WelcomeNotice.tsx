import { BellRing, CalendarHeart, Gift, Sparkles, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { createStore, useStore } from '../lib/storage'
import { MantoMark } from './MantoMark'

/**
 * AVISO DE ATUALIZAÇÃO
 * Aparece uma vez em cada aparelho. Para mostrar de novo para todo mundo
 * (por exemplo, com um texto novo), mude o número de AVISO_VERSAO.
 */
const AVISO_VERSAO = 1

const seenStore = createStore<number>('smm:aviso', 0)

export function WelcomeNotice() {
  const seen = useStore(seenStore)
  const open = seen < AVISO_VERSAO
  const closeRef = useRef<HTMLButtonElement>(null)
  const close = () => seenStore.set(AVISO_VERSAO)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="aviso-title"
      className="fixed inset-0 z-[90] flex items-center justify-center px-5"
    >
      <button
        type="button"
        aria-label="Fechar aviso"
        tabIndex={-1}
        onClick={close}
        className="absolute inset-0 animate-fade-in cursor-default bg-manto-900/60 backdrop-blur-[3px]"
      />
      <section className="relative max-h-[92vh] w-full max-w-sm animate-fade-up overflow-y-auto rounded-[2rem] bg-gradient-to-b from-white to-manto-50 text-center shadow-float">
        <div className="h-1.5 bg-gradient-to-r from-ouro-300/0 via-ouro-500 to-ouro-300/0" aria-hidden="true" />
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="Fechar"
          className="absolute right-3 top-4 flex h-10 w-10 items-center justify-center rounded-full text-manto-700 hover:bg-manto-100"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="px-7 pb-8 pt-9">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-ouro-300 bg-gradient-to-br from-white via-cream to-ouro-300/40 text-ouro-600 shadow-[0_0_0_6px_rgb(var(--ouro-300)/0.2)]">
            <MantoMark className="h-11 w-11" />
          </div>

          <p className="section-label mt-6">Aviso importante</p>
          <h2 id="aviso-title" className="mt-1 font-serif text-[1.75rem] font-semibold leading-tight text-manto-900">
            Seu app está sendo atualizado
          </h2>
          <div className="divider mx-auto mt-3 justify-center" aria-hidden="true">✦</div>

          <ul className="mt-4 space-y-3 text-left text-[16px] leading-snug text-tinta-soft">
            <li className="flex gap-3">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-ouro-600" aria-hidden="true" />
              <span>
                Estamos adicionando as músicas com todo o carinho. As orações e as próximas categorias vão
                sendo liberadas <strong className="text-manto-900">aos poucos, nos próximos 7 dias</strong>.
              </span>
            </li>
            <li className="flex gap-3">
              <CalendarHeart className="mt-0.5 h-5 w-5 shrink-0 text-ouro-600" aria-hidden="true" />
              <span>Já tem oração para ouvir agora. Volte sempre para ver as novidades.</span>
            </li>
            <li className="flex gap-3">
              <Gift className="mt-0.5 h-5 w-5 shrink-0 text-ouro-600" aria-hidden="true" />
              <span>
                Se você comprou algum produto adicional ou tem direito a algum bônus, você vai receber{' '}
                <strong className="text-manto-900">em breve, nesse mesmo prazo</strong>.
              </span>
            </li>
            <li className="flex gap-3">
              <BellRing className="mt-0.5 h-5 w-5 shrink-0 text-ouro-600" aria-hidden="true" />
              <span>Para saber como e por onde vai receber, acompanhe os avisos no nosso Instagram.</span>
            </li>
          </ul>

          <button type="button" onClick={close} className="btn-primary mt-7 w-full">
            Entendi
          </button>
        </div>
      </section>
    </div>
  )
}
