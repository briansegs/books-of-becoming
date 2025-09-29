import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  darkMode: ['selector'],
  darkModeSelector: '.dark [data-theme="dark"]',
  plugins: [typography],
}

export default config
