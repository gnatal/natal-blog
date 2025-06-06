/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Override with traditional color values that html2canvas can handle
        slate: {
          100: '#f1f5f9',
          200: '#e2e8f0',
          600: '#475569',
          800: '#1e293b',
          900: '#0f172a',
        },
        gray: {
          500: '#6b7280',
          600: '#4b5563',
          800: '#1f2937',
          900: '#111827',
        },
        yellow: {
          300: '#fcd34d',
        },
        white: '#ffffff',
        black: '#000000',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
  // Force traditional color space
  corePlugins: {
    // Disable features that might use modern color functions
  }
}