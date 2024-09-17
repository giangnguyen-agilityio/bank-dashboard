import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/theme';

import {
  screens,
  colors,
  fontStyles,
  fontSize,
  borderRadius,
  spacing,
  width,
} from './src/themes';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens,
      colors,
      fontFamily: {
        ...fontStyles,
      },
      fontSize,
      borderRadius,
      spacing,
      width,
    },
  },

  darkMode: 'class',
  plugins: [nextui()],
};
export default config;
