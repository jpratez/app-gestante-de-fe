import { Heart, Home, LayoutGrid } from 'lucide-react'
import { cn } from '../lib/utils'
import { Link } from './Link'

const items = [
  { to: '/', label: 'Início', Icon: Home },
  { to: '/categorias', label: 'Categorias', Icon: LayoutGrid },
  { to: '/favoritas', label: 'Favoritas', Icon: Heart },
]

export function BottomNavigation({ path }: { path: string }) {
  return (
    <nav
      aria-label="Navegação principal"
      className="border-t border-manto-200/70 bg-white/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md"
    >
      <ul className="mx-auto grid max-w-xl grid-cols-3">
        {items.map(({ to, label, Icon }) => {
          const active = to === '/' ? path === '/' : path.startsWith(to)
          return (
            <li key={to}>
              <Link
                to={to}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex min-h-[64px] flex-col items-center justify-center gap-0.5 text-[13px] font-bold transition',
                  active ? 'text-manto-700' : 'text-tinta-soft hover:text-manto-600',
                )}
              >
                <span className={cn('flex h-8 w-14 items-center justify-center rounded-full transition', active && 'bg-manto-100')}>
                  <Icon className="h-6 w-6" strokeWidth={active ? 2.2 : 1.8} aria-hidden="true" />
                </span>
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
