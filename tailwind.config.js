/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF6EE',
          200: '#F4ECE0',
          300: '#EBDDCC',
        },
        sand: {
          50: '#F9F8F5',
          100: '#F2EFE9',
          200: '#E6E0D4',
          300: '#D6CBB7',
          400: '#B8A68B',
          500: '#9C8466',
        },
        charcoal: {
          800: '#23272B',
          900: '#15181B',
          950: '#0E1012',
        },
        mewar: {
          gold: '#C59A45',
          'gold-light': '#DFB86C',
          amber: '#D97706',
          ruby: '#9B2226',
          terracotta: '#BC4749',
          lake: '#2A6F97',
          'lake-deep': '#01497C',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -5px rgba(21, 24, 27, 0.08), 0 4px 6px -2px rgba(21, 24, 27, 0.04)',
        'luxury-lg': '0 20px 40px -10px rgba(21, 24, 27, 0.12), 0 8px 10px -4px rgba(21, 24, 27, 0.06)',
        'glow-gold': '0 0 20px rgba(197, 154, 69, 0.35)',
      }
    },
  },
  plugins: [],
}
