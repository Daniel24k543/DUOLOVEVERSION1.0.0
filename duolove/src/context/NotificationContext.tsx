import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

interface NotificationSettings {
  pushEnabled: boolean;
  messageNotif: boolean;
  roomNotif: boolean;
  drawingNotif: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

interface NotificationContextType {
  settings: NotificationSettings;
  updateSetting: (key: keyof NotificationSettings, value: boolean) => Promise<void>;
  sendTestNotification: () => Promise<void>;
  requestPermissions: () => Promise<boolean>;
}

const defaultSettings: NotificationSettings = {
  pushEnabled: true,
  messageNotif: true,
  roomNotif: true,
  drawingNotif: true,
  soundEnabled: true,
  vibrationEnabled: true,
};

// Configurar el comportamiento de las notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings);

  useEffect(() => {
    loadSettings();
    requestPermissions();
  }, []);

  const loadSettings = async () => {
    try {
      const saved = await AsyncStorage.getItem('notification_settings');
      if (saved) {
        setSettings(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading notification settings:', error);
    }
  };

  const saveSettings = async (newSettings: NotificationSettings) => {
    try {
      await AsyncStorage.setItem('notification_settings', JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error('Error saving notification settings:', error);
    }
  };

  const updateSetting = async (key: keyof NotificationSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    await saveSettings(newSettings);

    // Si desactivan push, cancelar todas las notificaciones programadas
    if (key === 'pushEnabled' && !value) {
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
  };

  const requestPermissions = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    return finalStatus === 'granted';
  };

  const sendTestNotification = async () => {
    if (!settings.pushEnabled) {
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'DuoLove',
        body: '¡Esta es una notificación de prueba! Todo funciona correctamente',
        data: { type: 'test' },
        sound: settings.soundEnabled,
        vibrate: settings.vibrationEnabled ? [0, 250, 250, 250] : undefined,
      },
      trigger: {
        seconds: 1,
      },
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        settings,
        updateSetting,
        sendTestNotification,
        requestPermissions,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};
