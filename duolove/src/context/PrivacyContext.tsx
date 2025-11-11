import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import ApiService from '../services/api';

interface PrivacySettings {
  profileVisible: boolean;
  shareDrawings: boolean;
  locationSharing: boolean;
  readReceipts: boolean;
}

interface PrivacyContextType {
  settings: PrivacySettings;
  updateSetting: (key: keyof PrivacySettings, value: boolean) => Promise<void>;
  downloadUserData: () => Promise<void>;
  clearLocalData: () => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const defaultSettings: PrivacySettings = {
  profileVisible: true,
  shareDrawings: true,
  locationSharing: false,
  readReceipts: true,
};

const PrivacyContext = createContext<PrivacyContextType | undefined>(undefined);

export const PrivacyProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<PrivacySettings>(defaultSettings);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const saved = await AsyncStorage.getItem('privacy_settings');
      if (saved) {
        setSettings(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading privacy settings:', error);
    }
  };

  const saveSettings = async (newSettings: PrivacySettings) => {
    try {
      await AsyncStorage.setItem('privacy_settings', JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error('Error saving privacy settings:', error);
    }
  };

  const updateSetting = async (key: keyof PrivacySettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    await saveSettings(newSettings);
  };

  const downloadUserData = async () => {
    try {
      // Obtener datos del usuario
      const userData = await AsyncStorage.getAllKeys();
      const data: any = {};
      
      for (const key of userData) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          data[key] = JSON.parse(value);
        }
      }

      // En una app real, esto generaría un archivo para descargar
      Alert.alert(
        'Datos Descargados',
        `Se han recopilado ${Object.keys(data).length} elementos de tus datos.\n\nEn una versión de producción, esto se enviaría por email o se descargaría como archivo JSON.`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudieron descargar los datos');
    }
  };

  const clearLocalData = async () => {
    try {
      // Guardar el token de autenticación antes de limpiar
      const token = await AsyncStorage.getItem('token');
      
      // Limpiar todo excepto el token
      const keys = await AsyncStorage.getAllKeys();
      const keysToRemove = keys.filter(key => key !== 'token');
      await AsyncStorage.multiRemove(keysToRemove);

      // Restaurar configuraciones por defecto
      await saveSettings(defaultSettings);

      Alert.alert(
        'Datos Limpiados',
        'Los datos locales han sido eliminados correctamente',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudieron limpiar los datos');
    }
  };

  const deleteAccount = async () => {
    try {
      // En una app real, esto haría una llamada al backend
      await ApiService.logout();
      await AsyncStorage.clear();

      Alert.alert(
        'Cuenta Eliminada',
        'Tu cuenta y todos tus datos han sido eliminados permanentemente',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar la cuenta');
    }
  };

  return (
    <PrivacyContext.Provider
      value={{
        settings,
        updateSetting,
        downloadUserData,
        clearLocalData,
        deleteAccount,
      }}
    >
      {children}
    </PrivacyContext.Provider>
  );
};

export const usePrivacy = () => {
  const context = useContext(PrivacyContext);
  if (!context) {
    throw new Error('usePrivacy must be used within PrivacyProvider');
  }
  return context;
};
