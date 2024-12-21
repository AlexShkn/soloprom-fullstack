import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        ss: '0.75rem',
      },
      spacing: {
        '5px': '5px',
      },
      screens: {
        xs: { max: '374.98' },
        mmbs: { min: '479.98' },
        mbs: { max: '479.98' },
        mbm: { max: '575.98' },
        mbh: { max: '649.98' },
        mb: { max: '767.98' },
        tb: { max: '991.98' },
        pc: { max: '1199.98' },
        md: { max: '1399.98' },
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        accentBlue: '#005bb9',
        hoverBlue: '#007dfb',
        darkBlue: '#142f49',
        sectionWhite: '#f8fafc',
        grayColor: '#e5e5e5',
        greenColor: '#25d366',
      },
      boxShadow: {
        custom: '0 0 20px 0 rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
} satisfies Config
