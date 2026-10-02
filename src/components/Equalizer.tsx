/** Três barrinhas animadas que indicam "tocando agora". */
export function Equalizer() {
  return (
    <span className="inline-flex h-3.5 items-end gap-[3px]" aria-hidden="true">
      {[0, 0.25, 0.5].map((delay) => (
        <span
          key={delay}
          className="h-full w-[3px] origin-bottom animate-eq rounded-full bg-manto-500"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </span>
  )
}
