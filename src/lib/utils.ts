export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(' ')
}

/** Minúsculas e sem acentos — usado na busca. */
export function normalize(text: string) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

/** "4:12" -> 252 */
export function parseDuration(text: string) {
  const [m, s] = text.split(':').map((n) => parseInt(n, 10))
  if (Number.isNaN(m)) return 0
  return m * 60 + (Number.isNaN(s) ? 0 : s)
}

/** 252 -> "4:12" */
export function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) seconds = 0
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export const pad = (n: number) => n.toString().padStart(2, '0')
