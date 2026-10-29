import { ChevronRight, Lock } from 'lucide-react'
import { usePlayer } from '../hooks/useAudioPlayer'
import { categoryCount } from '../lib/catalog'
import { cn } from '../lib/utils'
import type { Category } from '../types'
import { Link } from './Link'
import { CoverPlaceholder, SmartImage } from './SmartImage'

export function CategoryCard({ category, index = 0 }: { category: Category; index?: number }) {
  const { openComingSoon } = usePlayer()
  const count = categoryCount(category)
  const locked = !category.liberada

  const body = (
    <>
      <div className="relative">
        <SmartImage
          src={category.image}
          alt={locked ? '' : `Imagem da categoria ${category.title}`}
          className={cn('aspect-[16/9] w-full sm:aspect-[4/3]', locked && 'scale-105 blur-[7px] saturate-75')}
          fallback={<CoverPlaceholder tone={category.tone} />}
        />
        {locked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-manto-900/35">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-ouro-300/80 bg-manto-900/60 text-ouro-300 shadow-float backdrop-blur-sm">
              <Lock className="h-7 w-7" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="rounded-full bg-white/90 px-4 py-1 text-[12px] font-bold uppercase tracking-[0.18em] text-manto-800">
              Em breve
            </span>
          </div>
        )}
      </div>
      <div className="relative -mt-px h-1 bg-gradient-to-r from-manto-300 via-manto-600 to-manto-300" aria-hidden="true" />
      <div className="p-5">
        <p className="inline-flex rounded-full bg-manto-100 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.14em] text-manto-700">
          {count} orações
        </p>
        <h3 className="mt-3 font-serif text-[1.55rem] font-semibold leading-tight text-manto-900">{category.title}</h3>
        <p className="mt-2 text-[16px] leading-snug text-tinta-soft">{category.description}</p>
        <p
          className={cn(
            'mt-4 inline-flex items-center gap-1 rounded-full px-5 py-2.5 text-[15px] font-bold shadow-soft transition',
            locked ? 'bg-manto-100 text-manto-700' : 'bg-manto-600 text-white group-hover:bg-manto-700',
          )}
        >
          {locked ? (
            <>
              <Lock className="h-4 w-4" aria-hidden="true" />
              Em breve
            </>
          ) : (
            <>
              Acessar
              <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
            </>
          )}
        </p>
      </div>
    </>
  )

  const cls =
    'group block w-full animate-fade-up overflow-hidden rounded-[1.75rem] text-left card-blue transition duration-300 hover:-translate-y-0.5 hover:shadow-card active:scale-[0.99]'
  const style = { animationDelay: `${Math.min(index, 8) * 60}ms` }

  if (locked) {
    return (
      <button
        type="button"
        onClick={openComingSoon}
        aria-label={`${category.title}, em breve`}
        style={style}
        className={cls}
      >
        {body}
      </button>
    )
  }

  return (
    <Link to={`/categoria/${category.id}`} aria-label={`${category.title}, ${count} orações`} style={style} className={cls}>
      {body}
    </Link>
  )
}
