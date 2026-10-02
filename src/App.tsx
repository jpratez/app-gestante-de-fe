import { AppHeader } from './components/AppHeader'
import { BottomNavigation } from './components/BottomNavigation'
import { Footer } from './components/Footer'
import { FullPlayer } from './components/FullPlayer'
import { LyricsModal } from './components/LyricsModal'
import { MiniPlayer } from './components/MiniPlayer'
import { Toast } from './components/Toast'
import { PlayerProvider, usePlayer } from './hooks/useAudioPlayer'
import { useRoute } from './lib/router'
import { CategoriesPage } from './pages/CategoriesPage'
import { CategoryPage } from './pages/CategoryPage'
import { FavoritesPage } from './pages/FavoritesPage'
import { Home } from './pages/Home'

function Shell() {
  const path = useRoute()
  const { current } = usePlayer()

  const categoryMatch = path.match(/^\/categoria\/(.+)$/)
  let page
  if (categoryMatch) page = <CategoryPage id={decodeURIComponent(categoryMatch[1])} />
  else if (path === '/categorias') page = <CategoriesPage />
  else if (path === '/favoritas') page = <FavoritesPage />
  else page = <Home />

  return (
    <>
      <AppHeader showBack={path !== '/' && path !== '/categorias' && path !== '/favoritas'} />
      <main className={`mx-auto max-w-xl ${current ? 'pb-48' : 'pb-32'}`}>
        {page}
        <Footer />
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40">
        <div className="mx-auto max-w-xl">
          <MiniPlayer />
        </div>
        <BottomNavigation path={path} />
      </div>

      <FullPlayer />
      <LyricsModal />
      <Toast />
    </>
  )
}

export default function App() {
  return (
    <PlayerProvider>
      <Shell />
    </PlayerProvider>
  )
}
