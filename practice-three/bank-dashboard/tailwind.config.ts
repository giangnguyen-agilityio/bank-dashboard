import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/theme';
import { screens } from './src/themes';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens,
      fontFamily: {
        primary: ['Inter', 'sans-serif'],
        secondary: ['Lato', 'sans-serif'],
      },
    },
  },

  darkMode: 'class',
  plugins: [nextui()],
};
export default config;
