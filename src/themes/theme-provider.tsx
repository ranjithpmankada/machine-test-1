import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { createContext, useContext, useState, useMemo, type ReactNode } from 'react';
import lightTheme from './light-theme';
import darkTheme from './dark-theme';

export interface ThemeProviderControlProps {
  children?: ReactNode;
}

interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useThemeMode() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeMode must be used within a ThemeProvider');
  }
  return context;
}

export function ThemeProvider(props: ThemeProviderControlProps) {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    // Check localStorage for saved theme preference (with safe access)
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return (savedTheme === 'dark' || savedTheme === 'light') ? savedTheme : 'light';
    }
    return 'light';
  });

  const theme = useMemo(() => {
    return mode === 'dark' ? darkTheme : lightTheme;
  }, [mode]);

  const toggleTheme = () => {
    try {
      const newMode = mode === 'light' ? 'dark' : 'light';
      setMode(newMode);
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newMode);
      }
      console.log('Theme switched to:', newMode);
    } catch (error) {
      console.error('Error switching theme:', error);
    }
  };

  const value = useMemo(() => ({ mode, toggleTheme }), [mode]);

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        {props.children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}