/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pokedex: {
          bg: '#07111f',
          panel: '#0f172a',
          card: '#111827',
          line: '#1e293b',
          blue: '#2f6bff',
          red: '#e64242',
          white: '#f8fafc',
          gray: '#94a3b8',
          bronze: '#fbbf24',
          green: '#22c55e',
          amber: '#f59e0b',
          indigo: '#6366f1'
        }
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(97, 160, 255, 0.25), 0 20px 45px rgba(15, 23, 42, 0.45)',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
};
