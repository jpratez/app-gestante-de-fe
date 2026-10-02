import { Play } from 'lucide-react'
import { Link } from '../components/Link'
import { PrayerList } from '../components/PrayerList'
import { CoverPlaceholder, SmartImage } from '../components/SmartImage'
import { usePlayer } from '../hooks/useAudioPlayer'
import { categoryById, categoryCount, prayersByCategory } from '../lib/catalog'

export function CategoryPage({ id }: { id: string }) {
  const { playPrayer } = usePlayer()
  const category = categoryById(id)

  if (!category) {
    return (
      <div className="px-6 py-20 text-center">
        <h1 className="font-serif text-[2rem] font-semibold text-manto-900">Categoria não encontrada</h1>
        <Link to="/" className="btn-primary mt-6">Voltar ao início</Link>
      </div>
    )
  }

  const list = prayersByCategory(category.id)
  const count = categoryCount(category)

  return (
    <div className="px-5 pt-4">
      <SmartImage
        src={category.image}
        alt={`Imagem da categoria ${category.title}`}
        eager
        className="aspect-[16/10] w-full rounded-[2rem] shadow-card"
        fallback={<CoverPlaceholder tone={category.tone} />}
      />

      <div className="animate-fade-up pt-6">
        <p className="section-label">{count} orações</p>
        <h1 className="mt-1 font-serif text-[2.3rem] font-semibold leading-[1.05] text-manto-900">{category.title}</h1>
        <p className="mt-3 text-[17px] text-tinta-soft">{category.description}</p>

        {list.length > 0 && (
          <button type="button" onClick={() => playPrayer(list[0], list)} className="btn-primary mt-5 w-full sm:w-auto">
            <Play className="h-5 w-5 fill-current" aria-hidden="true" />
            Começar a rezar
          </button>
        )}
      </div>

      <div className="pt-8">
        {list.length > 0 ? (
          <PrayerList prayers={list} />
        ) : (
          <div className="rounded-3xl border border-dashed border-manto-200 bg-white/60 px-6 py-12 text-center">
            <p className="font-serif text-[1.5rem] font-semibold text-manto-900">Em breve</p>
            <p className="mx-auto mt-1 max-w-xs text-tinta-soft">As orações desta jornada estão sendo preparadas com carinho.</p>
          </div>
        )}
        {list.length > 0 && list.length < count && (
          <p className="mt-5 text-center text-[15px] text-tinta-soft">Novas orações chegam em breve a esta categoria.</p>
        )}
      </div>
    </div>
  )
}
