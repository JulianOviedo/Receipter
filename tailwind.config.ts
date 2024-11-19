import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#F0F8FE',
          300: '#C0E1FC',
          400: '#8AC7FA',
          500: '#54ADF7',
          600: '#1590F4',
          700: '#096DBE',
          800: '#06487F',
          900: '#03243F',
          950: '#01111D'
        },
        green: {
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#F0FEFB',
          300: '#C0FCEE',
          400: '#8AFAE0',
          500: '#54F7D1',
          600: '#15F4C0',
          700: '#09BE94',
          800: '#067F63',
          900: '#033F31',
          950: '#011D17'
        }
      }
    }
  },
  plugins: []
}
export default config
