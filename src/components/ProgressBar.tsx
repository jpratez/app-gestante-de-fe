import { usePlayer, usePlayerTime } from '../hooks/useAudioPlayer'
import { formatTime } from '../lib/utils'

export function ProgressBar({ dark = false }: { dark?: boolean }) {
  const { seek } = usePlayer()
  const { time, duration } = usePlayerTime()
  const pct = duration > 0 ? Math.min(100, (time / duration) * 100) : 0

  return (
    <div>
      <input
        type="range"
        className="range"
        min={0}
        max={duration || 0}
        step={1}
        value={Math.min(time, duration || 0)}
        onChange={(e) => seek(Number(e.target.value))}
        style={{ ['--p' as string]: `${pct}%` }}
        aria-label="Progresso da oração"
        aria-valuetext={`${formatTime(time)} de ${formatTime(duration)}`}
      />
      <div className={`-mt-1 flex justify-between text-sm font-semibold tabular-nums ${dark ? 'text-white/80' : 'text-tinta-soft'}`}>
        <span>{formatTime(time)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  )
}
