/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#12262B',
          light: '#1B363D',
          dark: '#0B1719',
        },
        parchment: {
          DEFAULT: '#F4EFE3',
          dim: '#EAE2D0',
          deep: '#DCD0AF',
        },
        gold: {
          DEFAULT: '#C89B3C',
          light: '#DDBB6B',
          dark: '#9C7627',
        },
        wine: {
          DEFAULT: '#6B1E23',
          light: '#8A2A2F',
          dark: '#4A1418',
        },
        char: '#211E1B',
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Manrope"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        wide2: '0.14em',
      },
      maxWidth: {
        prose2: '68ch',
      },
      boxShadow: {
        soft: '0 20px 60px -20px rgba(11, 23, 25, 0.35)',
        card: '0 12px 30px -14px rgba(11, 23, 25, 0.4)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      transitionTimingFunction: {
        'soft': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
