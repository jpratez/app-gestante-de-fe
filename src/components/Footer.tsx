import { MantoMark } from './MantoMark'

export function Footer() {
  return (
    <footer className="mx-5 mt-16 overflow-hidden rounded-[2rem] bg-gradient-to-br from-manto-700 via-manto-800 to-manto-900 px-6 pb-9 pt-10 text-center shadow-card">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-ouro-300/60 text-ouro-300">
        <MantoMark className="h-9 w-9" />
      </div>
      <p className="mt-4 font-serif text-[1.7rem] font-semibold text-white">Gestante de Fé</p>
      <div className="divider mx-auto mt-3 justify-center" aria-hidden="true">✦</div>
      <p className="mx-auto mt-3 max-w-xs text-[16px] leading-snug text-manto-100">
        Uma jornada de oração para acompanhar você e seu bebê até o dia do parto.
      </p>
    </footer>
  )
}
