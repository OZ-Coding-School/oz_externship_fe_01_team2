import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          DEFAULT: '#0D0D0D',
          800: '#1C1C1C',
          700: '#333333',
          600: '#4D4D4D',
          500: '#666666',
          400: '#999999',
          250: '#D6D6D6',
          200: '#E5E5E5',
          100: '#F2F2F2',
          disabled: '#C2C2C2',
        },
        primary: {
          DEFAULT: '#7B00FF',
          900: '#1A0042',
          800: '#33007D',
          600: '#5C00C1',
          400: '#A259FF',
          300: '#BB86FC',
          200: '#E5CCFF',
          100: '#F3E5FF',
          50: '#F9F5FF',
        },
        secondary: {
          DEFAULT: '#FF5C00',
          100: '#FFF2E6',
          200: '#FFE0CC',
          300: '#FFC2A3',
          400: '#FFA366',
          600: '#CC5200',
          700: '#994000',
          800: '#662D00',
          900: '#331A00',
        },
        success: {
          DEFAULT: '#00C48C',
          700: '#007A5C',
          100: '#CCF5E9',
        },
        warning: {
          DEFAULT: '#FFCF00',
          100: '#FFF8CC',
          700: '#996B00',
        },
        danger: {
          DEFAULT: '#FF1E56',
          100: '#FFC2D1',
          700: '#990029',
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          '2xl': '0',
        },
        screens: {
          '2xl': '1200px',
        },
      },
    },
  },
  plugins: [],
}

export default config
