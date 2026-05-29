import React, { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event) => {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) return;
      setTheme(event.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener?.('change', handleChange);
    mediaQuery.addListener?.(handleChange);

    return () => {
      mediaQuery.removeEventListener?.('change', handleChange);
      mediaQuery.removeListener?.(handleChange);
    };
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
