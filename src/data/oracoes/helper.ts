import type { Prayer } from '../../types'
import { slugify } from '../../lib/utils'

const lines = (text: string) => text.split('|').join('\n')

/**
 * Monta uma oração a partir de: título, duração, 1º verso, refrão e 2º verso.
 * Use "|" para separar as linhas. O refrão é repetido no final automaticamente.
 * O nome do MP3 é gerado do título, sem acentos: /audio/<titulo>.mp3
 */
export function oracao(
  categoryId: string,
  title: string,
  duration: string,
  verso1: string,
  refrao: string,
  verso2: string,
): Prayer {
  const id = slugify(title)
  return {
    id,
    title,
    categoryId,
    duration,
    audio: `/audio/${id}.mp3`,
    lyrics: `
[Verso]
${lines(verso1)}

[Refrão]
${lines(refrao)}

[Verso]
${lines(verso2)}

[Refrão]
${lines(refrao)}
`,
  }
}
