export interface Category {
  id: string
  title: string
  description: string
  image: string
  /** Capa limpa (sem texto) usada no player e nas capas das orações. Se faltar, usa "image". */
  cover?: string
  /** Quantidade prevista de orações (usada no card enquanto a lista não está completa). */
  total: number
  /** Cores do placeholder elegante quando a imagem ainda não existe. */
  tone?: [string, string]
}

export interface Prayer {
  id: string
  title: string
  categoryId: string
  /** Formato "4:12" */
  duration: string
  /** Caminho do MP3, ex.: /audio/maria-cuida-do-meu-bebe.mp3 */
  audio: string
  /** Capa da oração (opcional). Se não existir, usa a imagem da categoria. */
  cover?: string
  /** Letra. Use [Verso], [Refrão], [Ponte] em linhas separadas. */
  lyrics: string
  /** Palavras extras para a busca (opcional). */
  tags?: string[]
}

export interface LastPlayed {
  id: string
  time: number
}
