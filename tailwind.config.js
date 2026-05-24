/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FBF7F0',
          100: '#F7EFE0',
          200: '#F0E1C7',
          300: '#E6D0A8',
        },
        ivory: '#FFFDF7',
        beige: {
          50: '#F5EFE6',
          100: '#EADFCE',
          200: '#D9C7AC',
        },
        rosegold: {
          50: '#F8E1D8',
          100: '#EDC2B4',
          200: '#D9A48C',
          300: '#C08A6E',
          400: '#A86C53',
          500: '#8C5440',
        },
        warmbrown: {
          50: '#E8D9C7',
          100: '#C9AE8E',
          200: '#A0815F',
          300: '#75593F',
          400: '#4C3826',
          500: '#2A1E13',
        },
        softgold: {
          50: '#FFF5DC',
          100: '#FFE9B3',
          200: '#F5D27A',
          300: '#E3B752',
          400: '#C99836',
        },
        nightblue: {
          900: '#0B0A1A',
          800: '#161430',
          700: '#1F1B45',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        script: ['"Dancing Script"', '"Great Vibes"', 'cursive'],
        arabic: ['"Amiri"', '"Scheherazade New"', 'serif'],
      },
      backgroundImage: {
        'romantic-gradient':
          'radial-gradient(ellipse at top, #F7EFE0 0%, #FBF7F0 50%, #F0E1C7 100%)',
        'moonlight':
          'radial-gradient(ellipse at center, rgba(255,245,220,0.45) 0%, rgba(247,239,224,0.0) 70%)',
        'night-sky':
          'radial-gradient(ellipse at 30% 20%, #1F1B45 0%, #161430 40%, #0B0A1A 100%)',
        'gold-shimmer':
          'linear-gradient(135deg, #C99836 0%, #F5D27A 50%, #C99836 100%)',
        'rosegold-shimmer':
          'linear-gradient(135deg, #C08A6E 0%, #EDC2B4 50%, #C08A6E 100%)',
      },
      boxShadow: {
        glow: '0 0 60px rgba(245, 210, 122, 0.35)',
        'glow-soft': '0 0 30px rgba(237, 194, 180, 0.4)',
        'glow-warm': '0 8px 32px rgba(192, 138, 110, 0.25)',
        luxury:
          '0 12px 40px -10px rgba(75, 56, 38, 0.18), 0 4px 12px -2px rgba(75, 56, 38, 0.08)',
        paper:
          '0 20px 60px -15px rgba(75, 56, 38, 0.25), 0 8px 20px -8px rgba(75, 56, 38, 0.12)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatyLg: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-25px) translateX(8px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: 0.55, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.04)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.2 },
          '50%': { opacity: 1 },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '15%': { transform: 'scale(1.15)' },
          '30%': { transform: 'scale(1)' },
          '45%': { transform: 'scale(1.1)' },
        },
        slowSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        riseAndFade: {
          '0%': { transform: 'translateY(0)', opacity: 0 },
          '20%': { opacity: 0.9 },
          '100%': { transform: 'translateY(-200px)', opacity: 0 },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        'floaty-lg': 'floatyLg 10s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3.5s ease-in-out infinite',
        shimmer: 'shimmer 4s linear infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
        heartbeat: 'heartbeat 1.6s ease-in-out infinite',
        'slow-spin': 'slowSpin 120s linear infinite',
        'rise-fade': 'riseAndFade 6s ease-out forwards',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
