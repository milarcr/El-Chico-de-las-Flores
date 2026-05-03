/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg:      '#FAF8F5',
          50:      '#EEF1FB',
          100:     '#D6DCF5',
          200:     '#AEBAE9',
          300:     '#8699DC',
          400:     '#6B7FC4',
          500:     '#5B6CB0',
          600:     '#4A5A9A',
          700:     '#3D4E8A',
          800:     '#2E3A6B',
          900:     '#1E264A',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card:       '0 2px 16px 0 rgba(91,108,176,0.08)',
        'card-hover':'0 12px 40px 0 rgba(91,108,176,0.18)',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.4s infinite linear',
      },
    },
  },
  plugins: [],
}
