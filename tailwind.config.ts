import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['selector', '.dark'],
  content: ['./src/**/*.{html,js,svelte,ts}', './index.html'],
  safelist: ['dark'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },

    extend: {
      colors: {
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        background: 'rgba(var(--backgorund), <alpha-value>)',
        foreground: 'rgba(var(--foreground) , <alpha-value>)',

        accent: {
          DEFAULT: 'rgba(var(--accent), <alpha-value>)',
          foregorund: 'rgba(var(--accent-fg), <alpha-value>)',
        },
        buy: {
          DEFAULT: 'rgba(var(--buy), <alpha-value>)',
          foregorund: 'rgba(var(--buy-fg), <alpha-value>)',
        },
        sell: {
          DEFAULT: 'rgba(var(--sell), <alpha-value>)',
          foregorund: 'rgba(var(--sell-fg), <alpha-value>)',
        },
      },
      borderRadius: {
        xl: 'calc(var(--radius) + 4px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Dm Sans', 'ui-sans-serif', 'system-ui'],
        serif: ['Dm Serif Display', 'ui-serif', 'Georgia'],
        body: ['"Dm Sans"', 'ui-sans-serif'],
      },
      screens: {
        xl: '1600px',
        '2xl': '1640px',
      },
    },
  },
  plugins: [require('tailwindcss-motion')],
}

export default config
