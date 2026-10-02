// As CORES ficam em src/index.css (bloco :root). Aqui só dizemos ao Tailwind para usá-las.
const c = (name) => `rgb(var(--${name}) / <alpha-value>)`

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: c('cream'), deep: c('cream-deep') },
        manto: {
          50: c('manto-50'), 100: c('manto-100'), 200: c('manto-200'), 300: c('manto-300'),
          400: c('manto-400'), 500: c('manto-500'), 600: c('manto-600'), 700: c('manto-700'),
          800: c('manto-800'), 900: c('manto-900'),
        },
        ouro: { 300: c('ouro-300'), 500: c('ouro-500'), 600: c('ouro-600') },
        rosa: { 100: c('rosa-100'), 200: c('rosa-200'), 500: c('rosa-500') },
        tinta: { DEFAULT: c('tinta'), soft: c('tinta-soft') },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Nunito Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 24px -12px rgb(48 77 130 / 0.22)',
        card: '0 18px 40px -20px rgb(48 77 130 / 0.35)',
        float: '0 24px 48px -16px rgb(27 44 78 / 0.45)',
      },
      keyframes: {
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(14px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'slide-up': { '0%': { transform: 'translateY(100%)' }, '100%': { transform: 'translateY(0)' } },
        eq: { '0%,100%': { transform: 'scaleY(0.35)' }, '50%': { transform: 'scaleY(1)' } },
      },
      animation: {
        'fade-up': 'fade-up .6s ease-out both',
        'fade-in': 'fade-in .3s ease-out both',
        'slide-up': 'slide-up .35s cubic-bezier(.22,.8,.3,1) both',
        eq: 'eq 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
