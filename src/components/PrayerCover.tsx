import { categoryById } from '../lib/catalog'
import type { Prayer } from '../types'
import { CoverPlaceholder, SmartImage } from './SmartImage'

/** Capa da oração; se não houver, usa a imagem da categoria; se não houver, um placeholder. */
export function PrayerCover({ prayer, className }: { prayer: Prayer; className?: string }) {
  const category = categoryById(prayer.categoryId)
  return (
    <SmartImage
      src={prayer.cover}
      fallbackSrc={category?.cover ?? category?.image}
      alt={`Capa da oração ${prayer.title}`}
      className={className}
      fallback={<CoverPlaceholder tone={category?.tone} compact />}
    />
  )
}
