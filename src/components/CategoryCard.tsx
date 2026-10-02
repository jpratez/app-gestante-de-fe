import { ChevronRight } from 'lucide-react'
import { categoryCount } from '../lib/catalog'
import type { Category } from '../types'
import { Link } from './Link'
import { CoverPlaceholder, SmartImage } from './SmartImage'

export function CategoryCard({ category, index = 0 }: { category: Category; index?: number }) {
  const count = categoryCount(category)
  return (
    <Link
      to={`/categoria/${category.id}`}
      aria-label={`${category.title}, ${count} orações`}
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
      className="group block animate-fade-up overflow-hidden rounded-[1.75rem] card-blue transition duration-300 hover:-translate-y-0.5 hover:shadow-card active:scale-[0.99]"
    >
      <SmartImage
        src={category.image}
        alt={`Imagem da categoria ${category.title}`}
        className="aspect-[16/9] w-full sm:aspect-[4/3]"
        fallback={<CoverPlaceholder tone={category.tone} />}
      />
      <div className="relative -mt-px h-1 bg-gradient-to-r from-manto-300 via-manto-600 to-manto-300" aria-hidden="true" />
      <div className="p-5">
        <p className="inline-flex rounded-full bg-manto-100 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.14em] text-manto-700">{count} orações</p>
        <h3 className="mt-1 font-serif text-[1.55rem] font-semibold leading-tight text-manto-900">{category.title}</h3>
        <p className="mt-2 text-[16px] leading-snug text-tinta-soft">{category.description}</p>
        <p className="mt-4 inline-flex items-center gap-1 rounded-full bg-manto-600 px-5 py-2.5 text-[15px] font-bold text-white shadow-soft transition group-hover:bg-manto-700">
          Acessar
          <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
        </p>
      </div>
    </Link>
  )
}
