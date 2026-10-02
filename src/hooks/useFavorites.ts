import { createStore, useStore } from '../lib/storage'

const store = createStore<string[]>('smm:favorites', [])

/** Favoritos guardados só neste aparelho (localStorage). */
export function useFavorites() {
  const raw = useStore(store)
  const ids = Array.isArray(raw) ? raw : []

  return {
    ids,
    isFavorite: (id: string) => ids.includes(id),
    toggle: (id: string) =>
      store.set(ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]),
  }
}
