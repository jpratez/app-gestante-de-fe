import { categories } from '../data/categories'
import { prayers } from '../data/prayers'
import type { Category, Prayer } from '../types'
import { normalize } from './utils'

export const categoryById = (id: string): Category | undefined => categories.find((c) => c.id === id)

export const prayerById = (id: string): Prayer | undefined => prayers.find((p) => p.id === id)

export const prayersByCategory = (categoryId: string): Prayer[] =>
  prayers.filter((p) => p.categoryId === categoryId)

/** Quantidade mostrada no card: a prevista ou a real, a que for maior. */
export const categoryCount = (category: Category) =>
  Math.max(category.total, prayersByCategory(category.id).length)

export const totalPrayers = () => categories.reduce((sum, c) => sum + categoryCount(c), 0)

/** Busca instantânea (sem acento, sem diferenciar maiúsculas) em nome, categoria, tags e letra. */
export function searchPrayers(query: string): Prayer[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean)
  if (!terms.length) return []

  return prayers
    .map((prayer) => {
      const category = categoryById(prayer.categoryId)
      const title = normalize(prayer.title)
      const tags = normalize((prayer.tags ?? []).join(' '))
      const cat = normalize(`${category?.title ?? ''} ${category?.description ?? ''}`)
      const lyrics = normalize(prayer.lyrics)

      let score = 0
      for (const term of terms) {
        let s = 0
        if (title.includes(term)) s += 4
        if (tags.includes(term)) s += 3
        if (cat.includes(term)) s += 2
        if (lyrics.includes(term)) s += 1
        if (!s) return { prayer, score: 0 }
        score += s
      }
      return { prayer, score }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.prayer)
}
