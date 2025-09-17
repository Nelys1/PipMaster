import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Theme {
  isDark: boolean;
  colors: {
    background: string;
    card: string;
    text: string;
    textSecondary: string;
    primary: string;
    secondary: string;
    accent: string;
    border: string;
    error: string;
  };
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const lightTheme: Theme = {
  isDark: false,
  colors: {
    background: '#FFFFFF',
    card: '#FAFAFB',
    text: '#1F2937',
    textSecondary: '#6B7280',
    primary: '#36454F',
    secondary: '#4F46E5',
    accent: '#F59E0B',
    border: '#E5E7EB',
    error: '#EF4444',
  },
};

const darkTheme: Theme = {
  isDark: true,
  colors: {
    background: '#1E2128',
    card: '#2D3748',
    text: '#FFFFFF',
    textSecondary: '#A0AEC0',
    primary: '#36454F',
    secondary: '#667EEA',
    accent: '#F6AD55',
    border: '#4A5568',
    error: '#FC8181',
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Return default theme when context is not available
    const [isDark, setIsDark] = useState(false);
    
    useEffect(() => {
      loadTheme();
    }, []);

    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        setIsDark(savedTheme === 'dark');
      } catch (error) {
        console.log('Error loading theme:', error);
      }
    };

    const toggleTheme = async () => {
      const newTheme = !isDark;
      setIsDark(newTheme);
      try {
        await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
      } catch (error) {
        console.log('Error saving theme:', error);
      }
    };

    return {
      theme: isDark ? darkTheme : lightTheme,
      toggleTheme,
    };
  }
  return context;
}

export { ThemeContext, lightTheme, darkTheme };
export type { Theme, ThemeContextType };