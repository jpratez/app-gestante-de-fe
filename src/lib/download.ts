import type { Prayer } from '../types'

/**
 * Baixa o MP3 da oração. Antes de baixar, confere se o arquivo existe,
 * para não baixar uma página de erro por engano.
 * Retorna false se o áudio ainda não estiver disponível.
 */
export async function downloadPrayer(prayer: Prayer): Promise<boolean> {
  try {
    const res = await fetch(prayer.audio, { method: 'HEAD' })
    const type = res.headers.get('content-type') ?? ''
    if (res.status !== 405 && (!res.ok || type.includes('text/html'))) return false
  } catch {
    return false
  }
  const link = document.createElement('a')
  link.href = prayer.audio
  link.download = `${prayer.title}.mp3`
  document.body.appendChild(link)
  link.click()
  link.remove()
  return true
}
