/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f1117',
        surface: '#1a1d26',
        primary: '#4f8ef7',
        success: '#22c55e',
        error: '#ef4444',
        warning: '#f59e0b',
        textPrimary: '#e2e8f0',
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
