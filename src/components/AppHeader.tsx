import { ArrowLeft } from 'lucide-react'
import { goBack } from '../lib/router'
import { MantoMark } from './MantoMark'
import { Link } from './Link'

export function AppHeader({ showBack }: { showBack?: boolean }) {
  return (
    <header className="sticky top-0 z-30 bg-gradient-to-b from-cream to-manto-50/95 pt-[env(safe-area-inset-top)] shadow-[0_8px_20px_-14px_rgb(48_77_130_/_0.45)] backdrop-blur-md">
      {/* fio dourado no topo */}
      <div className="h-[3px] bg-gradient-to-r from-ouro-300/0 via-ouro-500 to-ouro-300/0" aria-hidden="true" />

      <div className={`mx-auto flex h-[66px] max-w-xl items-center px-4 ${showBack ? 'justify-between' : 'justify-center'}`}>
        {showBack && (
          <button
            type="button"
            onClick={() => goBack('/')}
            className="-ml-2 flex min-h-[48px] items-center gap-2 rounded-full px-3 text-[16px] font-bold text-manto-700 hover:bg-manto-100/70"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            Voltar
          </button>
        )}

        <Link to="/" aria-label="Gestante de Fé — ir para o início" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ouro-300 bg-gradient-to-br from-white via-cream to-ouro-300/40 text-ouro-600 shadow-[0_0_0_3px_rgb(var(--ouro-300)/0.25)]">
            <MantoMark className="h-7 w-7" />
          </span>
          <span className="flex items-center gap-2">
            <span className="font-serif text-[1.6rem] font-semibold leading-none text-manto-900">Gestante de Fé</span>
            <span className="text-[11px] leading-none text-ouro-500" aria-hidden="true">✦</span>
          </span>
        </Link>
      </div>

      {/* linha dourada dupla com ornamento central */}
      <div className="relative" aria-hidden="true">
        <div className="h-px bg-gradient-to-r from-transparent via-ouro-300 to-transparent" />
        <div className="mx-auto mt-[2px] h-px w-2/3 bg-gradient-to-r from-transparent via-ouro-300/60 to-transparent" />
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-cream px-2 text-[10px] leading-none text-ouro-500">◆</span>
      </div>
    </header>
  )
}
