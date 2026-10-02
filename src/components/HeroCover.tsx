import { SmartImage } from './SmartImage'

/** Capa da home. Troque o texto aqui; a imagem fica em public/images/capa-sob-o-manto-de-maria.jpg */
export function HeroCover() {
  return (
    <section aria-label="Apresentação" className="relative">
      <h1 className="sr-only">Gestante de Fé — 131 orações cantadas. Reze com Nossa Senhora em cada fase da sua gestação.</h1>
      <SmartImage
        src="/images/capa-sob-o-manto-de-maria.jpg"
        alt="Capa do app Gestante de Fé: Nossa Senhora abraçando uma gestante"
        eager
        className="aspect-[1019/1543] w-full rounded-b-[2.5rem]"
        fallback={<HeroFallback />}
      />
    </section>
  )
}

function HeroFallback() {
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-manto-500 via-manto-700 to-manto-900">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <radialGradient id="glow" cx="50%" cy="22%" r="55%">
            <stop offset="0%" stopColor="#F6E9C4" stopOpacity=".22" />
            <stop offset="100%" stopColor="#F6E9C4" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="500" fill="url(#glow)" />
        <circle cx="200" cy="110" r="52" fill="none" stroke="#E2CD96" strokeWidth="1" opacity=".45" />
        <circle cx="200" cy="110" r="82" fill="none" stroke="#fff" strokeWidth="1" opacity=".12" />
        <path d="M200 160c-70 24-110 120-100 340h200c10-220-30-316-100-340Z" fill="#fff" opacity=".07" />
        <path d="M200 160c-30 70-38 190-30 340M200 160c30 70 38 190 30 340" fill="none" stroke="#fff" strokeWidth="1" opacity=".12" />
        {[[60, 80], [330, 60], [350, 190], [40, 220], [290, 130], [110, 40]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.6" fill="#F6E9C4" opacity=".8" />
        ))}
      </svg>
    </div>
  )
}
