import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Importa los nuevos temas y la función
import { themes, getTheme, ChristmasTheme } from '../theme'; 

type ThemeType = 'christmas' | 'winter' | 'romantic' | 'gold';

interface ThemeSettings {
  selectedTheme: ThemeType;
  darkMode: boolean; // Dejamos esto para personalización futura
  animations: boolean;
  snowEffect: boolean;
}

interface ThemeContextType {
  settings: ThemeSettings;
  theme: ChristmasTheme; // Proporciona el objeto de tema completo
  gradientColors: string[]; // Proporciona los colores del gradiente
  updateTheme: (theme: ThemeType) => Promise<void>;
  toggleDarkMode: (value: boolean) => Promise<void>;
  toggleAnimations: (value: boolean) => Promise<void>;
  toggleSnowEffect: (value: boolean) => Promise<void>;
  // getThemeColors ya no es necesario, lo manejamos con 'theme' y 'gradientColors'
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
  
  // Añade estados para el tema y gradiente
  const [theme, setTheme] = useState<ChristmasTheme>(themes.christmas);
  const [gradientColors, setGradientColors] = useState([
    themes.christmas.colors.gradientStart,
    themes.christmas.colors.gradientEnd,
  ]);

  // Cargar configuración guardada
  useEffect(() => {
    loadSettings();
  }, []);

  // Actualizar el tema cuando cambien los settings
  useEffect(() => {
    const newTheme = getTheme(settings.selectedTheme);
    setTheme(newTheme);
    setGradientColors([
      newTheme.colors.gradientStart,
      newTheme.colors.gradientEnd,
    ]);
  }, [settings.selectedTheme]);

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
    await saveSettings(newSettings);
  };

  const toggleDarkMode = async (value: boolean) => {
    const newSettings = { ...settings, darkMode: value };
    await saveSettings(newSettings);
  };

  const toggleAnimations = async (value: boolean) => {
    const newSettings = { ...settings, animations: value };
    await saveSettings(newSettings);
  };

  const toggleSnowEffect = async (value: boolean) => {
    const newSettings = { ...settings, snowEffect: value };
    await saveSettings(newSettings);
  };

  // getThemeColors ya no es necesario

  return (
    <ThemeContext.Provider
      value={{
        settings,
        theme, // Pasa el objeto de tema
        gradientColors, // Pasa los colores del gradiente
        updateTheme,
        toggleDarkMode,
        toggleAnimations,
        toggleSnowEffect,
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