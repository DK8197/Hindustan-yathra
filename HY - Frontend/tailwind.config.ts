import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],

  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '4k': '2560px',
    },

    extend: {
      colors: {
        saffron: {
          50: '#fff7ed',
          100: '#ffedd5',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
        },

        himalaya: {
          50: '#f0f6fb',
          100: '#dbe9f4',
          400: '#5f93c0',
          600: '#2c5d85',
          800: '#173248',
          900: '#0c1b28',
        },

        earth: {
          400: '#c99a5b',
          600: '#8a6238',
        },
      },

      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          'sans-serif',
        ],

        display: [
          'Playfair Display',
          'serif',
        ],

        kannada: [
          'Noto Sans Kannada',
          'sans-serif',
        ],
      },

      backgroundImage: {
        'sunrise-gradient':
          'linear-gradient(180deg, #0c1b28 0%, #173248 35%, #c2410c 75%, #fb923c 100%)',
      },

      animation: {
        'cloud-drift':
          'cloudDrift 60s linear infinite',

        'float-slow':
          'floatSlow 6s ease-in-out infinite',
      },

      keyframes: {
        cloudDrift: {
          '0%': {
            transform:
              'translateX(-10%)',
          },
          '100%': {
            transform:
              'translateX(10%)',
          },
        },

        floatSlow: {
          '0%,100%': {
            transform:
              'translateY(0px)',
          },
          '50%': {
            transform:
              'translateY(-14px)',
          },
        },
      },

      boxShadow: {
        luxury:
          '0 10px 40px rgba(0,0,0,0.12)',
      },

      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },

  plugins: [],
};

export default config;