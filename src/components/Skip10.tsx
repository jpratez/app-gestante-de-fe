import { RotateCcw, RotateCw } from 'lucide-react'

/** Botão de voltar/avançar 10 segundos. */
export function Skip10({ direction, onClick, className = '' }: { direction: 'back' | 'forward'; onClick: () => void; className?: string }) {
  const Icon = direction === 'back' ? RotateCcw : RotateCw
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'back' ? 'Voltar 10 segundos' : 'Avançar 10 segundos'}
      className={`relative flex h-14 w-14 items-center justify-center rounded-full transition active:scale-90 ${className}`}
    >
      <Icon className="h-8 w-8" strokeWidth={1.6} aria-hidden="true" />
      <span className="absolute text-[11px] font-bold leading-none" aria-hidden="true">10</span>
    </button>
  )
}
