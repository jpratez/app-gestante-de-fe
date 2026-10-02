import { Search, X } from 'lucide-react'

interface Props {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <div role="search" className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-manto-500" aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Qual oração você procura?"
        aria-label="Buscar oração"
        enterKeyHint="search"
        autoComplete="off"
        className="h-14 w-full rounded-full border border-manto-300/70 bg-white pl-12 pr-12 text-[17px] text-tinta placeholder:text-tinta-soft/80 focus:border-manto-400 focus:ring-2 focus:ring-manto-200 [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Limpar busca"
          className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-tinta-soft hover:bg-manto-50"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
