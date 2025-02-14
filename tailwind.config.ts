import type { Config } from 'tailwindcss';
const { heroui } = require('@heroui/theme');

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',

    './node_modules/@heroui/theme/dist/components/(button|input|form|divider).js',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [heroui()],
} satisfies Config;
