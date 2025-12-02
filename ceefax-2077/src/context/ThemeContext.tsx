import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type ThemePreset = 'classic' | 'vaporwave' | 'noir' | 'amber';

interface ThemeColors {
  // Primary colors
  primary: string;
  secondary: string;
  accent: string;
  
  // Backgrounds
  bgPrimary: string;
  bgSecondary: string;
  bgAccent: string;
  
  // Text colors
  textPrimary: string;
  textSecondary: string;
  textAccent: string;
  textWarning: string;
  textDanger: string;
  textSuccess: string;
  
  // UI elements
  border: string;
  glow: string;
  shadow: string;
}

interface ThemeContextType {
  currentTheme: ThemePreset;
  setTheme: (theme: ThemePreset) => void;
  themes: Record<ThemePreset, { name: string; description: string; colors: ThemeColors }>;
}

const themePresets: Record<ThemePreset, { name: string; description: string; colors: ThemeColors }> = {
  classic: {
    name: 'Classic Teletext',
    description: 'Original 1980s BBC Ceefax aesthetic',
    colors: {
      primary: '#0000FF',
      secondary: '#FFFF00',
      accent: '#00FFFF',
      bgPrimary: '#000000',
      bgSecondary: '#0000FF',
      bgAccent: '#111111',
      textPrimary: '#FFFFFF',
      textSecondary: '#FFFF00',
      textAccent: '#00FFFF',
      textWarning: '#FFFF00',
      textDanger: '#FF0000',
      textSuccess: '#00FF00',
      border: '#00FFFF',
      glow: 'rgba(0, 255, 255, 0.5)',
      shadow: 'rgba(0, 0, 0, 0.9)'
    }
  },
  
  vaporwave: {
    name: 'Vaporwave Dreams',
    description: 'Pink, cyan, and purple aesthetic',
    colors: {
      primary: '#FF00FF',
      secondary: '#00FFFF',
      accent: '#FF1493',
      bgPrimary: '#1a0033',
      bgSecondary: '#330066',
      bgAccent: '#4d0099',
      textPrimary: '#FF00FF',
      textSecondary: '#00FFFF',
      textAccent: '#FF1493',
      textWarning: '#FFB6C1',
      textDanger: '#FF00FF',
      textSuccess: '#00FFFF',
      border: '#FF00FF',
      glow: 'rgba(255, 0, 255, 0.6)',
      shadow: 'rgba(26, 0, 51, 0.9)'
    }
  },
  
  noir: {
    name: 'Film Noir',
    description: 'Monochrome greyscale detective aesthetic',
    colors: {
      primary: '#FFFFFF',
      secondary: '#CCCCCC',
      accent: '#999999',
      bgPrimary: '#000000',
      bgSecondary: '#1a1a1a',
      bgAccent: '#333333',
      textPrimary: '#FFFFFF',
      textSecondary: '#CCCCCC',
      textAccent: '#999999',
      textWarning: '#CCCCCC',
      textDanger: '#FFFFFF',
      textSuccess: '#CCCCCC',
      border: '#666666',
      glow: 'rgba(255, 255, 255, 0.3)',
      shadow: 'rgba(0, 0, 0, 0.95)'
    }
  },
  
  amber: {
    name: 'Amber Terminal',
    description: 'Retro monochrome amber CRT monitor',
    colors: {
      primary: '#FFB000',
      secondary: '#FFA500',
      accent: '#FF8C00',
      bgPrimary: '#000000',
      bgSecondary: '#1a0f00',
      bgAccent: '#331a00',
      textPrimary: '#FFB000',
      textSecondary: '#FFA500',
      textAccent: '#FF8C00',
      textWarning: '#FFB000',
      textDanger: '#FF6600',
      textSuccess: '#FFB000',
      border: '#FFB000',
      glow: 'rgba(255, 176, 0, 0.5)',
      shadow: 'rgba(0, 0, 0, 0.95)'
    }
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemePreset>('classic');

  const setTheme = (theme: ThemePreset) => {
    setCurrentTheme(theme);
    localStorage.setItem('teletext_theme', theme);
    applyTheme(theme);
  };

  const applyTheme = (theme: ThemePreset) => {
    const colors = themePresets[theme].colors;
    const root = document.documentElement;

    // Apply CSS variables
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
    
    root.style.setProperty('--color-bg-primary', colors.bgPrimary);
    root.style.setProperty('--color-bg-secondary', colors.bgSecondary);
    root.style.setProperty('--color-bg-accent', colors.bgAccent);
    
    root.style.setProperty('--color-text-primary', colors.textPrimary);
    root.style.setProperty('--color-text-secondary', colors.textSecondary);
    root.style.setProperty('--color-text-accent', colors.textAccent);
    root.style.setProperty('--color-text-warning', colors.textWarning);
    root.style.setProperty('--color-text-danger', colors.textDanger);
    root.style.setProperty('--color-text-success', colors.textSuccess);
    
    root.style.setProperty('--color-border', colors.border);
    root.style.setProperty('--color-glow', colors.glow);
    root.style.setProperty('--color-shadow', colors.shadow);

    // Set data attribute for additional CSS targeting
    root.setAttribute('data-theme', theme);
  };

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem('teletext_theme');
    if (saved && saved in themePresets) {
      setCurrentTheme(saved as ThemePreset);
      applyTheme(saved as ThemePreset);
    } else {
      applyTheme('classic');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes: themePresets }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
