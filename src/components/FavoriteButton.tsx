import { Heart } from 'lucide-react'
import { useFavorites } from '../hooks/useFavorites'
import { cn } from '../lib/utils'

interface Props {
  prayerId: string
  title: string
  className?: string
  tone?: 'light' | 'dark'
}

export function FavoriteButton({ prayerId, title, className, tone = 'light' }: Props) {
  const { isFavorite, toggle } = useFavorites()
  const active = isFavorite(prayerId)
  return (
    <button
      type="button"
      onClick={() => toggle(prayerId)}
      aria-pressed={active}
      aria-label={active ? `Remover ${title} das favoritas` : `Favoritar ${title}`}
      className={cn(
        'flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition active:scale-90',
        tone === 'light' ? 'text-rosa-500 hover:bg-rosa-100' : 'text-white hover:bg-white/10',
        className,
      )}
    >
      <Heart className={cn('h-6 w-6 transition', active && 'fill-current')} strokeWidth={1.8} />
    </button>
  )
}
