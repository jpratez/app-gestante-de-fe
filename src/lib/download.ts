import type { Prayer } from '../types'

/**
 * Baixa o áudio da oração. Antes de baixar, confere se o arquivo existe,
 * para não baixar uma página de erro por engano.
 * Retorna false se o áudio ainda não estiver disponível.
 */
export async function downloadPrayer(prayer: Prayer): Promise<boolean> {
  if (!prayer.audio) return false
  try {
    const res = await fetch(prayer.audio, { method: 'HEAD' })
    const type = res.headers.get('content-type') ?? ''
    if (res.status !== 405 && (!res.ok || type.includes('text/html'))) return false
  } catch {
    return false
  }
  const link = document.createElement('a')
  link.href = prayer.audio
  const ext = prayer.audio.match(/\.(\w+)$/)?.[1] ?? 'mp3'
  link.download = `${prayer.title}.${ext}`
  document.body.appendChild(link)
  link.click()
  link.remove()
  return true
}
