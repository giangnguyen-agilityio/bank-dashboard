import type { Config } from 'tailwindcss';
import { nextui, ThemeColors } from '@nextui-org/theme';

import {
  screens,
  width,
  height,
  spacing,
  container,
  borderRadius,
  fontStyles,
  fontSize,
  colors,
  colorPalette,
  backgroundImage,
  darkColors,
} from './src/themes';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage,
      screens,
      width,
      height,
      spacing,
      container,
      borderRadius,
      fontFamily: {
        ...fontStyles,
      },
      fontSize,
    },
  },

  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: { ...(colors as unknown as ThemeColors), ...colorPalette },
        },
        dark: {
          colors: {
            ...(darkColors as unknown as ThemeColors),
            ...colorPalette,
          },
        },
      },
    }),
  ],
};
export default config;
