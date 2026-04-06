/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f5f7fa',
        surface: '#ffffff',
        primary: '#3b72f0',
        success: '#16a34a',
        error: '#dc2626',
        warning: '#d97706',
        textPrimary: '#0f172a',
        textMuted: '#64748b',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}
