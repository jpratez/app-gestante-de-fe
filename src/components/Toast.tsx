import { usePlayer } from '../hooks/useAudioPlayer'

export function Toast() {
  const { toast } = usePlayer()
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-40 z-[70] flex justify-center px-6"
    >
      {toast && (
        <p className="animate-fade-up rounded-full bg-manto-900 px-5 py-3 text-center text-[15px] font-semibold text-white shadow-float">
          {toast}
        </p>
      )}
    </div>
  )
}
