/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      boxShadow: {
        darkShadow:
          '0 2px 2px hsla(0,0%,100%,.15), inset 0 1px 1px hsla(0,0%,0%,0.4)',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background),<alpha-value>)',
        ['background-900']: 'hsl(var(--background-900),<alpha-value>)',
        ['background-700']: 'hsl(var(--background-700),<alpha-value>)',
        foreground: 'hsl(var(--foreground),<alpha-value>)',
        primary: {
          DEFAULT: 'hsl(var(--primary),<alpha-value>)',
          foreground: 'hsl(var(--primary-foreground),<alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary), <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground), <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive), <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground), <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted), <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground), <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent), <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground), <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover), <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground), <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--card), <alpha-value>)',
          foreground: 'hsl(var(--card-foreground), <alpha-value>)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
