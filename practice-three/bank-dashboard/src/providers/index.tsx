import * as React from 'react';
import { NextUIProvider } from '@nextui-org/system';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps as NextThemeProviderProps } from 'next-themes/dist/types';

// Constants
import { ThemeType } from '@app/constants';

export interface ThemeProviderProps extends NextThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => (
  <NextUIProvider>
    <NextThemesProvider
      attribute="class"
      defaultTheme={ThemeType.LIGHT_MODE}
      {...props}
    >
      {children}
    </NextThemesProvider>
  </NextUIProvider>
);
