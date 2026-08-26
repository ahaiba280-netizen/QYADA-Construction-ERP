module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#061918',
          darker: '#0B2421',
          card: '#0D2C29',
          panel: '#0A2220'
        },
        gold: {
          DEFAULT: '#D4AF37',
          border: '#B78B2E'
        },
        status: {
          success: '#30D158',
          info: '#0A84FF',
          warning: '#F5B301',
          error: '#FF453A'
        }
      },
      spacing: {
        '128': '32rem',
        '144': '36rem'
      },
      borderRadius: {
        '3xl': '1rem',
        '4xl': '1.5rem'
      },
      boxShadow: {
        premium: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
        glow: '0 0 20px rgba(212, 175, 55, 0.3)'
      }
    }
  },
  plugins: []
};
