/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B100E',
        panel: '#121A17',
        'panel-2': '#182220',
        line: '#233029',
        muted: '#7C9187',
        ink: '#EAF2ED',
        ok: '#35D398',
        warn: '#F5A623',
        danger: '#FF4E3A',
        data: '#4FD1E8',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        mono: ['var(--font-mono)'],
        body: ['var(--font-body)'],
      },
      boxShadow: {
        glow: '0 0 24px -4px rgba(53,211,152,0.35)',
        'glow-danger': '0 0 28px -2px rgba(255,78,58,0.55)',
      },
      keyframes: {
        pulseAlarm: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.45' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        pulseAlarm: 'pulseAlarm 1.1s ease-in-out infinite',
        scan: 'scan 3s linear infinite',
      },
    },
  },
  plugins: [],
};
