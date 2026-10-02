import { useEffect, useState } from 'react'

/**
 * Navegação mínima baseada em "#/rota". Funciona em qualquer hospedagem
 * estática, sem precisar configurar redirecionamentos.
 */
const EVENT = 'smm:navigate'

export function getPath() {
  const hash = window.location.hash.replace(/^#/, '')
  return hash.startsWith('/') ? hash : '/'
}

function historyIndex() {
  return (window.history.state?.idx as number | undefined) ?? 0
}

export function navigate(to: string, opts: { replace?: boolean } = {}) {
  if (getPath() === to) {
    window.scrollTo({ top: 0 })
    return
  }
  const state = { idx: opts.replace ? historyIndex() : historyIndex() + 1 }
  if (opts.replace) window.history.replaceState(state, '', `#${to}`)
  else window.history.pushState(state, '', `#${to}`)
  window.dispatchEvent(new Event(EVENT))
  window.scrollTo({ top: 0 })
}

/** Volta uma tela; se a pessoa chegou direto nesta página, vai para o fallback. */
export function goBack(fallback = '/') {
  if (historyIndex() > 0) window.history.back()
  else navigate(fallback, { replace: true })
}

export function useRoute() {
  const [path, setPath] = useState(getPath)
  useEffect(() => {
    const update = () => setPath(getPath())
    window.addEventListener('popstate', update)
    window.addEventListener(EVENT, update)
    return () => {
      window.removeEventListener('popstate', update)
      window.removeEventListener(EVENT, update)
    }
  }, [])
  return path
}
