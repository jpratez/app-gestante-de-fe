import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { categoryById, prayerById } from '../lib/catalog'
import { createStore, useStore } from '../lib/storage'
import { parseDuration } from '../lib/utils'
import type { LastPlayed, Prayer } from '../types'

const UNAVAILABLE = 'Esta oração estará disponível em breve.'

/** Última oração ouvida + posição (só neste aparelho). */
const lastStore = createStore<LastPlayed | null>('smm:last', null)
export const useLastPlayed = () => useStore(lastStore)

interface PlayerContextValue {
  current: Prayer | null
  queue: Prayer[]
  playing: boolean
  loading: boolean
  /** Toca uma oração. Se já for a atual, alterna play/pause. */
  playPrayer: (prayer: Prayer, queue?: Prayer[], startAt?: number) => void
  toggle: () => void
  next: () => void
  previous: () => void
  seek: (seconds: number) => void
  /** Para o áudio e esconde o mini player. */
  closePlayer: () => void
  skip: (delta: number) => void
  fullOpen: boolean
  setFullOpen: (open: boolean) => void
  lyricsPrayer: Prayer | null
  openLyrics: (prayer: Prayer) => void
  closeLyrics: () => void
  toast: string | null
  notify: (message: string) => void
}

const PlayerContext = createContext<PlayerContextValue | null>(null)
const TimeContext = createContext<{ time: number; duration: number }>({ time: 0, duration: 0 })

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer precisa estar dentro de <PlayerProvider>')
  return ctx
}

/** Tempo atual e duração — separado para só re-renderizar quem precisa. */
export const usePlayerTime = () => useContext(TimeContext)

export function PlayerProvider({ children }: { children: ReactNode }) {
  // O <audio> só carrega o arquivo quando a pessoa toca play (preload = none).
  const audio = useMemo(() => {
    const a = new Audio()
    a.preload = 'none'
    return a
  }, [])

  const [current, setCurrent] = useState<Prayer | null>(null)
  const [queue, setQueue] = useState<Prayer[]>([])
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [fullOpen, setFullOpen] = useState(false)
  const [lyricsPrayer, setLyricsPrayer] = useState<Prayer | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const currentRef = useRef<Prayer | null>(null)
  const queueRef = useRef<Prayer[]>([])
  const pendingSeek = useRef(0)
  const lastSave = useRef(0)
  const toastTimer = useRef<number | undefined>(undefined)

  const notify = useCallback((message: string) => {
    setToast(message)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 3800)
  }, [])

  const start = useCallback(
    (prayer: Prayer, nextQueue: Prayer[], startAt = 0) => {
      currentRef.current = prayer
      queueRef.current = nextQueue
      setCurrent(prayer)
      setQueue(nextQueue)
      setTime(startAt)
      setDuration(parseDuration(prayer.duration))
      setLoading(true)
      pendingSeek.current = startAt
      audio.src = prayer.audio
      audio.play().catch(() => {
        /* erros reais chegam pelo evento "error" */
      })
      lastStore.set({ id: prayer.id, time: startAt })
    },
    [audio],
  )

  const toggle = useCallback(() => {
    const prayer = currentRef.current
    if (!prayer) return
    if (!audio.src || audio.error) {
      start(prayer, queueRef.current, Math.floor(audio.currentTime || 0))
    } else if (audio.paused) {
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }, [audio, start])

  const playPrayer = useCallback(
    (prayer: Prayer, list?: Prayer[], startAt?: number) => {
      if (currentRef.current?.id === prayer.id && startAt === undefined) {
        toggle()
        return
      }
      const nextQueue = list && list.some((p) => p.id === prayer.id) ? list : [prayer]
      start(prayer, nextQueue, startAt ?? 0)
    },
    [start, toggle],
  )

  const seek = useCallback(
    (seconds: number) => {
      const max = Number.isFinite(audio.duration) ? audio.duration : Infinity
      const t = Math.max(0, Math.min(seconds, max))
      try {
        audio.currentTime = t
      } catch {
        /* áudio ainda não carregou */
      }
      setTime(t)
    },
    [audio],
  )

  const closePlayer = useCallback(() => {
    if (currentRef.current) {
      lastStore.set({ id: currentRef.current.id, time: Math.floor(audio.currentTime || 0) })
    }
    audio.pause()
    audio.removeAttribute('src')
    audio.load()
    currentRef.current = null
    queueRef.current = []
    setCurrent(null)
    setQueue([])
    setPlaying(false)
    setLoading(false)
    setTime(0)
    setDuration(0)
    setFullOpen(false)
  }, [audio])

  const skip = useCallback((delta: number) => seek(audio.currentTime + delta), [audio, seek])

  const next = useCallback(() => {
    const q = queueRef.current
    const idx = q.findIndex((p) => p.id === currentRef.current?.id)
    if (idx >= 0 && idx < q.length - 1) start(q[idx + 1], q)
  }, [start])

  const previous = useCallback(() => {
    const q = queueRef.current
    const idx = q.findIndex((p) => p.id === currentRef.current?.id)
    if (audio.currentTime > 3 || idx <= 0) seek(0)
    else start(q[idx - 1], q)
  }, [audio, seek, start])

  /* Eventos do <audio> */
  useEffect(() => {
    const onTime = () => {
      setTime(audio.currentTime)
      const now = Date.now()
      if (now - lastSave.current > 2000 && currentRef.current) {
        lastSave.current = now
        lastStore.set({ id: currentRef.current.id, time: Math.floor(audio.currentTime) })
      }
    }
    const onMeta = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) setDuration(audio.duration)
      if (pendingSeek.current > 0) {
        try {
          audio.currentTime = pendingSeek.current
        } catch {
          /* ignora */
        }
        pendingSeek.current = 0
      }
    }
    const onPlay = () => setPlaying(true)
    const onPause = () => {
      setPlaying(false)
      if (currentRef.current && !audio.ended) {
        lastStore.set({ id: currentRef.current.id, time: Math.floor(audio.currentTime) })
      }
    }
    const onWaiting = () => setLoading(true)
    const onReady = () => setLoading(false)
    const onEnded = () => {
      const q = queueRef.current
      const idx = q.findIndex((p) => p.id === currentRef.current?.id)
      if (idx >= 0 && idx < q.length - 1) {
        start(q[idx + 1], q)
      } else {
        setPlaying(false)
        if (currentRef.current) lastStore.set({ id: currentRef.current.id, time: 0 })
      }
    }
    const onError = () => {
      setLoading(false)
      setPlaying(false)
      if (audio.getAttribute('src')) notify(UNAVAILABLE)
    }

    const events: [string, () => void][] = [
      ['timeupdate', onTime],
      ['loadedmetadata', onMeta],
      ['play', onPlay],
      ['pause', onPause],
      ['waiting', onWaiting],
      ['canplay', onReady],
      ['playing', onReady],
      ['ended', onEnded],
      ['error', onError],
    ]
    events.forEach(([name, fn]) => audio.addEventListener(name, fn))
    return () => events.forEach(([name, fn]) => audio.removeEventListener(name, fn))
  }, [audio, start, notify])

  /* Controles na tela de bloqueio do celular */
  useEffect(() => {
    if (!('mediaSession' in navigator) || !current) return
    const category = categoryById(current.categoryId)
    navigator.mediaSession.metadata = new MediaMetadata({
      title: current.title,
      artist: category?.title ?? 'App Gestante de Fé',
      album: 'App Gestante de Fé',
    })
    const handlers: [MediaSessionAction, MediaSessionActionHandler][] = [
      ['play', () => audio.play().catch(() => {})],
      ['pause', () => audio.pause()],
      ['previoustrack', previous],
      ['nexttrack', next],
      ['seekbackward', () => skip(-10)],
      ['seekforward', () => skip(10)],
    ]
    handlers.forEach(([action, fn]) => {
      try {
        navigator.mediaSession.setActionHandler(action, fn)
      } catch {
        /* ação não suportada */
      }
    })
  }, [audio, current, next, previous, skip])

  /* Trava a rolagem do fundo quando há uma tela cheia aberta */
  useEffect(() => {
    document.body.style.overflow = fullOpen || lyricsPrayer ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [fullOpen, lyricsPrayer])

  const value = useMemo<PlayerContextValue>(
    () => ({
      current,
      queue,
      playing,
      loading,
      playPrayer,
      toggle,
      next,
      previous,
      seek,
      closePlayer,
      skip,
      fullOpen,
      setFullOpen,
      lyricsPrayer,
      openLyrics: setLyricsPrayer,
      closeLyrics: () => setLyricsPrayer(null),
      toast,
      notify,
    }),
    [current, queue, playing, loading, playPrayer, toggle, next, previous, seek, closePlayer, skip, fullOpen, lyricsPrayer, toast, notify],
  )

  const timeValue = useMemo(() => ({ time, duration }), [time, duration])

  return (
    <PlayerContext.Provider value={value}>
      <TimeContext.Provider value={timeValue}>{children}</TimeContext.Provider>
    </PlayerContext.Provider>
  )
}

/** Retoma a última oração ouvida, de onde parou. */
export function useResume() {
  const last = useLastPlayed()
  const { playPrayer } = usePlayer()
  const prayer = last ? prayerById(last.id) : undefined
  return {
    prayer,
    time: last?.time ?? 0,
    resume: (queue: Prayer[]) => prayer && playPrayer(prayer, queue, last?.time ?? 0),
  }
}
