/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Military dark theme
        military: {
          50: '#f0f4f1',
          100: '#d9e5db',
          200: '#b3ccb8',
          300: '#7da887',
          400: '#4d8558',
          500: '#2d6b3e',
          600: '#1f5230',
          700: '#163d23',
          800: '#0e2917',
          900: '#07150c',
        },
        accent: {
          green: '#00ff41',
          lime: '#a8ff3e',
          amber: '#ffb800',
          red: '#ff3131',
          blue: '#00d4ff',
          purple: '#b347ff',
          orange: '#ff6b35',
        },
        dark: {
          50: '#1a1f1a',
          100: '#151a15',
          200: '#111611',
          300: '#0d120d',
          400: '#090e09',
          500: '#060a06',
          bg: '#0a0f0a',
          card: '#0f1410',
          border: '#1e2d1e',
          hover: '#162016',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-green': 'pulseGreen 2s infinite',
        'radar-spin': 'radarSpin 4s linear infinite',
        'scan-line': 'scanLine 3s linear infinite',
        'flicker': 'flicker 3s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slideInLeft': 'slideInLeft 0.3s ease-out',
        'slideInRight': 'slideInRight 0.3s ease-out',
        'fadeInUp': 'fadeInUp 0.4s ease-out',
        'blink': 'blink 1s step-end infinite',
        'marquee': 'marquee 20s linear infinite',
      },
      keyframes: {
        pulseGreen: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0, 255, 65, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(0, 255, 65, 0)' },
        },
        radarSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        scanLine: {
          '0%': { top: '0%', opacity: 1 },
          '100%': { top: '100%', opacity: 0 },
        },
        flicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: 1 },
          '20%, 24%, 55%': { opacity: 0.4 },
        },
        glow: {
          '0%': { textShadow: '0 0 10px #00ff41, 0 0 20px #00ff41' },
          '100%': { textShadow: '0 0 20px #00ff41, 0 0 40px #00ff41, 0 0 60px #00ff41' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2300ff41' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")",
        'hex-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300ff41' fill-opacity='0.02'%3E%3Cpath d='M30 0l30 17.32v34.64L30 69.28 0 51.96V17.32z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(0, 255, 65, 0.3)',
        'glow-blue': '0 0 20px rgba(0, 212, 255, 0.3)',
        'glow-red': '0 0 20px rgba(255, 49, 49, 0.3)',
        'glow-amber': '0 0 20px rgba(255, 184, 0, 0.3)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 40px rgba(0, 255, 65, 0.15)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}
