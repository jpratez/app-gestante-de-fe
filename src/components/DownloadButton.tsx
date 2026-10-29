import { Download } from 'lucide-react'
import { useState } from 'react'
import { usePlayer } from '../hooks/useAudioPlayer'
import { downloadPrayer } from '../lib/download'
import type { Prayer } from '../types'

interface Props {
  prayer: Prayer
  label?: string
  className?: string
}

export function DownloadButton({ prayer, label = 'Baixar', className = 'pill' }: Props) {
  const { openComingSoon } = usePlayer()
  const [busy, setBusy] = useState(false)

  const handle = async () => {
    setBusy(true)
    const ok = await downloadPrayer(prayer)
    setBusy(false)
    if (!ok) openComingSoon()
  }

  return (
    <button
      type="button"
      onClick={handle}
      disabled={busy}
      aria-label={`Baixar ${prayer.title}`}
      className={className}
    >
      <Download className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
      {label}
    </button>
  )
}
