import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['var(--playfair)'],
        lato: ['var(--lato)'],
      },
      colors: {
        background: '#FFFFFF',
        foreground: '#BFBABA',
        custom: {
          blue: '#0479CE',
          gray: '#BFBABA',
          brown: {
            light: '#B25225',
            DEFAULT: '#783719',
            dark: '#4C2310',
          },
          yellow: '#F7BD40',
          white: '#F2F2F2',
        },
        primary: {
          '5': '#783719',
          '7': '#4C2310',
          '8': '#37190B',
          '9': '#220F07',
        },
      },
      screens: {
        xs: '393px',
        mb: '450px', // Mobile
        nanggung: '840px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      shadow: {
        sm: '0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
