import { useSyncExternalStore } from 'react'

/**
 * Pequeno "armário" que guarda dados no localStorage do aparelho.
 * Nada é enviado para servidor. Se o navegador bloquear o localStorage,
 * o app continua funcionando (só não lembra entre visitas).
 */
export interface Store<T> {
  get: () => T
  set: (next: T) => void
  subscribe: (listener: () => void) => () => void
}

export function createStore<T>(key: string, initial: T): Store<T> {
  let value = initial
  try {
    const raw = window.localStorage.getItem(key)
    if (raw) value = JSON.parse(raw) as T
  } catch {
    /* ignora */
  }
  const listeners = new Set<() => void>()
  return {
    get: () => value,
    set(next) {
      value = next
      try {
        window.localStorage.setItem(key, JSON.stringify(next))
      } catch {
        /* ignora */
      }
      listeners.forEach((l) => l())
    },
    subscribe(listener) {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
  }
}

export function useStore<T>(store: Store<T>): T {
  return useSyncExternalStore(store.subscribe, store.get, store.get)
}
