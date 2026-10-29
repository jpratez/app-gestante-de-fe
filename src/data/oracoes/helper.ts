import type { Prayer } from '../../types'
import { slugify } from '../../lib/utils'

const lines = (text: string) => text.split('|').join('\n')

/** Marca a oração como "com áudio": o MP3 deve estar em public/audio/<id>.mp3 */
export const comAudio = (prayer: Prayer): Prayer => ({ ...prayer, audio: `/audio/${prayer.id}.mp3` })

/**
 * Monta uma oração a partir de: título, duração, 1º verso, refrão e 2º verso.
 * Use "|" para separar as linhas. O refrão é repetido no final automaticamente.
 * Por padrão a oração ainda NÃO tem áudio (aparece o aviso "em breve").
 * Para liberar o áudio, envolva a oração com comAudio(...).
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
