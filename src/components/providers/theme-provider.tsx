'use client';

import { useLayoutEffect } from 'react';

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  useLayoutEffect(() => {
    const getInitialTheme = () => {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme;
      }

      if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }

      return 'dark';
    };

    const initialTheme = getInitialTheme();
    const htmlElement = document.documentElement;

    // Apply initial theme
    if (initialTheme === 'light') {
      htmlElement.classList.add('light');
      htmlElement.classList.remove('dark');
    } else {
      htmlElement.classList.add('dark');
      htmlElement.classList.remove('light');
    }
  }, []);

  return <>{children}</>;
}
