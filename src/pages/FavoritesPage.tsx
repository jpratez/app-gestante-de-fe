import { Heart } from 'lucide-react'
import { Link } from '../components/Link'
import { PrayerList } from '../components/PrayerList'
import { useFavorites } from '../hooks/useFavorites'
import { prayerById } from '../lib/catalog'
import type { Prayer } from '../types'

export function FavoritesPage() {
  const { ids } = useFavorites()
  const favorites = ids.map(prayerById).filter((p): p is Prayer => !!p)

  return (
    <div className="px-5 pt-8">
      <p className="section-label">Favoritas</p>
      <h1 className="mt-1 font-serif text-[2.2rem] font-semibold leading-tight text-manto-900">Minhas Orações</h1>
      <p className="mb-6 mt-2 text-tinta-soft">As orações que você guardou no coração, sempre à mão.</p>

      {favorites.length > 0 ? (
        <PrayerList prayers={favorites} showCategory />
      ) : (
        <div className="rounded-3xl border border-dashed border-rosa-200 bg-white/60 px-6 py-12 text-center">
          <Heart className="mx-auto h-10 w-10 text-rosa-500" strokeWidth={1.6} aria-hidden="true" />
          <p className="mt-3 font-serif text-[1.5rem] font-semibold text-manto-900">Nenhuma favorita ainda</p>
          <p className="mx-auto mt-1 max-w-xs text-tinta-soft">Toque no coração ao lado de uma oração para guardá-la aqui.</p>
          <Link to="/categorias" className="btn-primary mt-6">Escolher uma oração</Link>
        </div>
      )}
    </div>
  )
}
