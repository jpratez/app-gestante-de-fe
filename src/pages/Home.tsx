import { SearchX } from 'lucide-react'
import { useMemo, useState } from 'react'
import { CategoryGrid } from '../components/CategoryGrid'
import { ContinueListening } from '../components/ContinueListening'
import { HeroCover } from '../components/HeroCover'
import { Link } from '../components/Link'
import { PrayerList } from '../components/PrayerList'
import { SearchBar } from '../components/SearchBar'
import { useFavorites } from '../hooks/useFavorites'
import { prayerById, searchPrayers } from '../lib/catalog'
import type { Prayer } from '../types'

const SUGGESTIONS = ['medo', 'ultrassom', 'dormir', 'Maria', 'consulta', 'ansiedade']

export function Home() {
  const [query, setQuery] = useState('')
  const { ids } = useFavorites()
  const results = useMemo(() => searchPrayers(query), [query])
  const searching = query.trim().length > 0
  const favorites = ids.map(prayerById).filter((p): p is Prayer => !!p)

  return (
    <>
      <HeroCover />

      <div className="relative z-10 -mt-9 px-5">
        <div className="overflow-hidden rounded-[1.75rem] border border-manto-200/70 bg-gradient-to-b from-white to-manto-50 p-5 shadow-card">
          <h2 className="mb-3 font-serif text-[1.6rem] font-semibold leading-tight text-manto-900">
            Que oração você precisa hoje?
          </h2>
          <SearchBar value={query} onChange={setQuery} />
          <div className="no-scrollbar -mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setQuery(s)}
                className="shrink-0 rounded-full bg-manto-100 px-4 py-2 text-[15px] font-semibold text-manto-700 hover:bg-manto-200"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 pt-10">
        {searching ? (
          <section aria-live="polite">
            <p className="section-label mb-3">
              {results.length === 1 ? '1 oração encontrada' : `${results.length} orações encontradas`}
            </p>
            {results.length > 0 ? (
              <PrayerList prayers={results} showCategory />
            ) : (
              <div className="rounded-3xl border border-dashed border-manto-200 bg-white/60 px-6 py-10 text-center">
                <SearchX className="mx-auto h-9 w-9 text-manto-400" aria-hidden="true" />
                <p className="mt-3 font-serif text-[1.4rem] font-semibold text-manto-900">Não encontramos essa oração</p>
                <p className="mt-1 text-tinta-soft">Tente buscar por “medo”, “bebê” ou “parto”.</p>
              </div>
            )}
          </section>
        ) : (
          <>
            <ContinueListening />

            <section aria-labelledby="moments-title">
              <div className="mb-6 text-center">
                <div className="divider justify-center" aria-hidden="true">✦</div>
                <h2 id="moments-title" className="mt-2 font-serif text-[1.9rem] font-semibold leading-tight text-manto-900">
                  Escolha um momento da sua gravidez
                </h2>
              </div>
              <CategoryGrid />
            </section>

            {favorites.length > 0 && (
              <section aria-labelledby="fav-title" className="mt-12">
                <div className="mb-4 flex items-end justify-between">
                  <h2 id="fav-title" className="font-serif text-[1.7rem] font-semibold text-manto-900">
                    Suas favoritas
                  </h2>
                  <Link to="/favoritas" className="py-2 text-[15px] font-bold text-manto-600">
                    Ver todas
                  </Link>
                </div>
                <PrayerList prayers={favorites.slice(0, 3)} showCategory />
              </section>
            )}
          </>
        )}
      </div>
    </>
  )
}
