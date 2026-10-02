import { categories } from '../data/categories'
import { CategoryCard } from './CategoryCard'

export function CategoryGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {categories.map((category, i) => (
        <CategoryCard key={category.id} category={category} index={i} />
      ))}
    </div>
  )
}
