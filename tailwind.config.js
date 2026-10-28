/**
 * Design tokens live here and in src/index.css.
 *
 * Colours are declared as raw RGB channels in CSS custom properties, which lets
 * Tailwind generate opacity variants (`bg-paper/90`, `border-rule/50`) while the
 * actual values still swap with the theme. Change a colour in one place —
 * src/index.css — and the whole site follows.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--paper) / <alpha-value>)',
        'paper-2': 'rgb(var(--paper-2) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-2': 'rgb(var(--ink-2) / <alpha-value>)',
        'ink-3': 'rgb(var(--ink-3) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-2': 'rgb(var(--accent-2) / <alpha-value>)',
        rule: 'rgb(var(--rule) / <alpha-value>)',
        'rule-2': 'rgb(var(--rule-2) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Garamond', '"Times New Roman"', 'serif'],
        body: ['Karla', '-apple-system', '"Segoe UI"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Fluid display sizes. Tight leading and negative tracking at the top of
        // the scale — at this size the serif needs to set as a mass, not a line.
        // Sized so the hero headline flows as one block inside its column and
        // the whole hero still fits a single screen.
        'display-xl': ['clamp(2.5rem, 5.4vw, 4.5rem)', { lineHeight: '1.03', letterSpacing: '-0.024em' }],
        'display-lg': ['clamp(2.25rem, 5.6vw, 4.25rem)', { lineHeight: '1.0', letterSpacing: '-0.024em' }],
        'display-md': ['clamp(1.75rem, 3.1vw, 2.625rem)', { lineHeight: '1.08', letterSpacing: '-0.018em' }],
        'display-sm': ['clamp(1.5rem, 2.2vw, 2.125rem)', { lineHeight: '1.14', letterSpacing: '-0.012em' }],
        lede: ['clamp(1.1875rem, 1.9vw, 1.5rem)', { lineHeight: '1.55' }],
        label: ['0.72rem', { lineHeight: '1.4', letterSpacing: '0.2em' }],
      },
      maxWidth: {
        page: '70rem',   // 1120px — the single page measure
        prose: '66ch',   // comfortable reading width
      },
      spacing: {
        gutter: 'clamp(1.25rem, 5vw, 4.5rem)',
        section: 'clamp(3.75rem, 8.5vw, 7.5rem)',
        'nav-offset': 'calc(var(--nav-height) + 0.5rem)',
      },
      transitionTimingFunction: {
        reveal: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
      },
      keyframes: {
        // Floating 3D panels. Separate inner element from any translateZ layer,
        // because an animation on `transform` replaces it entirely.
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-wide': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(6px, -14px, 0)' },
        },
        'cube-spin': {
          from: { transform: 'rotateX(-16deg) rotateY(0deg)' },
          to: { transform: 'rotateX(-16deg) rotateY(360deg)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        },
        'sheen-sweep': {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(220%)' },
        },
        // The track holds two copies of the content, so sliding exactly half
        // its width lands the second copy where the first began — seamless.
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'float-slow': 'float 9s ease-in-out infinite',
        'float-mid': 'float 7s ease-in-out infinite',
        'float-fast': 'float-wide 5.5s ease-in-out infinite',
        cube: 'cube-spin 28s linear infinite',
        breathe: 'breathe 5s ease-in-out infinite',
        sheen: 'sheen-sweep 1.1s ease-out',
      },
    },
  },
  plugins: [],
};
