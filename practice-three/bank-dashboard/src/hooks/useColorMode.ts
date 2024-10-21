import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

// Constants
import { ThemeType } from '@app/constants';

export const useColorMode = () => {
  const { theme = ThemeType.LIGHT_MODE, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleTheme = () =>
    setTheme(isDarkMode ? ThemeType.LIGHT_MODE : ThemeType.DARK_MODE);

  useEffect(() => {
    setIsDarkMode(theme === ThemeType.DARK_MODE);
  }, [theme]);

  return {
    theme,
    isDarkMode,
    handleToggleTheme,
  };
};
