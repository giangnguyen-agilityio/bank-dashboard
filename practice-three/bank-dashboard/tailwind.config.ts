import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/theme';

import {
  screens,
  width,
  spacing,
  container,
  borderRadius,
  fontStyles,
  fontSize,
  colors,
  colorPalette,
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
      width,
      spacing,
      container,
      borderRadius,
      fontFamily: {
        ...fontStyles,
      },
      fontSize,
      colors: {
        ...colors,
        ...colorPalette,
      },
    },
  },

  darkMode: 'class',
  plugins: [nextui()],
};
export default config;
