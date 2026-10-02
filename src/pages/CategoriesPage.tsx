import { CategoryGrid } from '../components/CategoryGrid'

export function CategoriesPage() {
  return (
    <div className="px-5 pt-8">
      <p className="section-label">Categorias</p>
      <h1 className="mt-1 font-serif text-[2.2rem] font-semibold leading-tight text-manto-900">
        Escolha um momento da sua gravidez
      </h1>
      <p className="mb-6 mt-2 text-tinta-soft">Toque em uma categoria e comece a rezar.</p>
      <CategoryGrid />
    </div>
  )
}
