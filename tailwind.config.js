/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: '#0c0c0c',
        sunset: '#253237',
      },
      boxShadow: {
        'red-glow': '0 0 35px -2px rgba(220, 38, 38, 0.8)',
      },
      keyframes: {
        shine: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
        slashEntrance: {
          '0%': { transform: 'translateX(100px) skewX(-12deg)', opacity: '0' },
          '100%': { transform: 'translateX(0) skewX(-12deg)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { 
            textShadow: '0 0 15px rgba(220, 38, 38, 0.5)',
            filter: 'brightness(1)' 
          },
          '50%': { 
            textShadow: '0 0 35px rgba(220, 38, 38, 1), 0 0 50px rgba(220, 38, 38, 0.4)',
            filter: 'brightness(1.3)' 
          },
        },
        // ADD THIS PART:
        strongPulse: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.2)' },
        }
      },
      animation: {
        shine: 'shine 0.8s ease-in-out forwards',
        slash: 'slashEntrance 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        prizeGlow: 'glow 1.5s ease-in-out infinite',
        // ADD THIS PART:
        strongPulse: 'strongPulse 2.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}