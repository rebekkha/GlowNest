/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: 'rgb(var(--color-bg) / <alpha-value>)',
          text: 'rgb(var(--color-text) / <alpha-value>)',
          'text-light': 'rgb(var(--color-text-light) / <alpha-value>)',
          primary: 'rgb(var(--color-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
          'button-text': 'rgb(var(--color-button-text) / <alpha-value>)',
        },
        dark: {
          bg: '#0a0a0a',
          card: 'rgba(25, 25, 25, 0.65)',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        primary: {
          light: '#ffb3c6',
          DEFAULT: '#ff5c8d',
          dark: '#c9184a',
          glow: 'rgba(255, 92, 141, 0.4)',
        },
        secondary: {
          DEFAULT: '#8338ec',
          glow: 'rgba(131, 56, 236, 0.4)',
        },
        text: {
          dark: '#ffffff',
          light: '#a1a1aa',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
      },
      animation: {
        'blob': 'blob 7s infinite',
        'fadeUp': 'fadeUp 1s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
