import { useEffect, useState, type ReactNode } from 'react'
import { cn } from '../lib/utils'
import { MantoMark } from './MantoMark'

interface Props {
  src?: string
  /** Segunda opção caso a primeira não exista. */
  fallbackSrc?: string
  alt: string
  className?: string
  /** O que mostrar se nenhuma imagem existir. */
  fallback?: ReactNode
  eager?: boolean
}

/** Imagem que nunca quebra o layout: se o arquivo não existir, mostra um placeholder. */
export function SmartImage({ src, fallbackSrc, alt, className, fallback, eager }: Props) {
  const sources = [src, fallbackSrc].filter(Boolean) as string[]
  const key = sources.join('|')
  const [index, setIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setIndex(0)
    setLoaded(false)
  }, [key])

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div className="absolute inset-0" aria-hidden="true">
        {fallback ?? <CoverPlaceholder />}
      </div>
      {index < sources.length && (
        <img
          key={sources[index]}
          src={sources[index]}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => {
            setLoaded(false)
            setIndex((i) => i + 1)
          }}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-500',
            loaded ? 'opacity-100' : 'opacity-0',
          )}
        />
      )}
    </div>
  )
}

export function CoverPlaceholder({ tone, compact }: { tone?: [string, string]; compact?: boolean }) {
  const [a, b] = tone ?? ['#E3ECF7', '#BFD2EC']
  return (
    <div
      className="relative flex h-full w-full items-center justify-center text-manto-700/60"
      style={{ background: `linear-gradient(160deg, ${a} 0%, ${b} 100%)` }}
    >
      <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <circle cx="100" cy="70" r="70" fill="none" stroke="#fff" strokeWidth="1.2" />
        <circle cx="100" cy="70" r="104" fill="none" stroke="#fff" strokeWidth="1" opacity=".6" />
        <path d="M100 20c-50 20-70 90-60 200h120C170 110 150 40 100 20Z" fill="#fff" opacity=".18" />
      </svg>
      <MantoMark className={compact ? 'relative h-1/2 w-1/2' : 'relative h-16 w-16'} />
    </div>
  )
}
