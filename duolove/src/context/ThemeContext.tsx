import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeType = 'christmas' | 'winter' | 'romantic' | 'gold';

interface ThemeSettings {
  selectedTheme: ThemeType;
  darkMode: boolean;
  animations: boolean;
  snowEffect: boolean;
}

interface ThemeContextType {
  settings: ThemeSettings;
  updateTheme: (theme: ThemeType) => Promise<void>;
  toggleDarkMode: (value: boolean) => Promise<void>;
  toggleAnimations: (value: boolean) => Promise<void>;
  toggleSnowEffect: (value: boolean) => Promise<void>;
  getThemeColors: () => { gradientStart: string; gradientEnd: string };
}

const defaultSettings: ThemeSettings = {
  selectedTheme: 'christmas',
  darkMode: false,
  animations: true,
  snowEffect: true,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<ThemeSettings>(defaultSettings);

  // Cargar configuración guardada
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const saved = await AsyncStorage.getItem('theme_settings');
      if (saved) {
        setSettings(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading theme settings:', error);
    }
  };

  const saveSettings = async (newSettings: ThemeSettings) => {
    try {
      await AsyncStorage.setItem('theme_settings', JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error('Error saving theme settings:', error);
    }
  };

  const updateTheme = async (theme: ThemeType) => {
    const newSettings = { ...settings, selectedTheme: theme };
    setSettings(newSettings);
    await saveSettings(newSettings);
  };

  const toggleDarkMode = async (value: boolean) => {
    const newSettings = { ...settings, darkMode: value };
    setSettings(newSettings);
    await saveSettings(newSettings);
  };

  const toggleAnimations = async (value: boolean) => {
    const newSettings = { ...settings, animations: value };
    setSettings(newSettings);
    await saveSettings(newSettings);
  };

  const toggleSnowEffect = async (value: boolean) => {
    const newSettings = { ...settings, snowEffect: value };
    setSettings(newSettings);
    await saveSettings(newSettings);
  };

  const getThemeColors = () => {
    const themes = {
      christmas: { gradientStart: '#2D1B69', gradientEnd: '#C41E3A' },
      winter: { gradientStart: '#1E3A8A', gradientEnd: '#60A5FA' },
      romantic: { gradientStart: '#BE185D', gradientEnd: '#EC4899' },
      gold: { gradientStart: '#854D0E', gradientEnd: '#FBBF24' },
    };
    return themes[settings.selectedTheme];
  };

  return (
    <ThemeContext.Provider
      value={{
        settings,
        updateTheme,
        toggleDarkMode,
        toggleAnimations,
        toggleSnowEffect,
        getThemeColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
