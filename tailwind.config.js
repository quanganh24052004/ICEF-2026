/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Nunito', 'Outfit', 'sans-serif'],
      },
      colors: {
        duo: {
          green: '#58CC02',
          greenDark: '#46A302',
          blue: '#1CB0F6',
          blueDark: '#1899D6',
          yellow: '#FFC800',
          yellowDark: '#E5B400',
          orange: '#FF9600',
          orangeDark: '#CC7800',
          purple: '#CE82FF',
          purpleDark: '#A55EEA',
          red: '#E53E3E',
          redDark: '#C53030',
          hustRed: '#B91C1C',
          hustDark: '#7F1D1D',
          dark: '#3C3C3C',
          muted: '#777777',
          border: '#E5E5E5',
          bg: '#F7F7F7'
        },
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#0f172a',
        }
      },
      boxShadow: {
        '3d-green': '0 4px 0 #46A302',
        '3d-blue': '0 4px 0 #1899D6',
        '3d-yellow': '0 4px 0 #E5B400',
        '3d-purple': '0 4px 0 #A55EEA',
        '3d-hust': '0 4px 0 #7F1D1D',
        '3d-card': '0 5px 0 #E5E5E5',
        '3d-white': '0 4px 0 #E5E5E5',
      },
      animation: {
        'pulse-border': 'pulseBorder 2.5s infinite ease-in-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite ease-in-out',
      },
      keyframes: {
        pulseBorder: {
          '0%, 100%': { borderColor: '#FFC800', boxShadow: '0 0 0 2px rgba(255, 200, 0, 0.4)' },
          '50%': { borderColor: '#FF9600', boxShadow: '0 0 14px 4px rgba(255, 150, 0, 0.35)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        }
      }
    },
  },
  plugins: [],
}
