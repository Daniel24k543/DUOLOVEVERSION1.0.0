import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { christmasTheme } from '../theme';
import { useNotifications } from '../context/NotificationContext';

export default function NotificationsScreen({ navigation }: any) {
  const { settings, updateSetting, sendTestNotification } = useNotifications();

  const handleTestNotification = async () => {
    if (!settings.pushEnabled) {
      Alert.alert(
        'Notificaciones Desactivadas',
        'Por favor, activa las notificaciones push primero',
        [{ text: 'OK' }]
      );
      return;
    }

    await sendTestNotification();
    Alert.alert(
      'Notificación Enviada',
      'Deberías recibir una notificación de prueba en 1 segundo',
      [{ text: 'OK' }]
    );
  };

  const notificationSettings = [
    {
      id: 'push',
      icon: 'notifications',
      iconBg: '#EF4444',
      title: 'Notificaciones Push',
      subtitle: 'Recibir notificaciones en el dispositivo',
      value: settings.pushEnabled,
      onValueChange: (val: boolean) => updateSetting('pushEnabled', val),
    },
    {
      id: 'messages',
      icon: 'chatbubble',
      iconBg: '#3B82F6',
      title: 'Mensajes',
      subtitle: 'Nuevos mensajes de tu pareja',
      value: settings.messageNotif,
      onValueChange: (val: boolean) => updateSetting('messageNotif', val),
    },
    {
      id: 'rooms',
      icon: 'home',
      iconBg: '#8B5CF6',
      title: 'Salas',
      subtitle: 'Invitaciones y actualizaciones de sala',
      value: settings.roomNotif,
      onValueChange: (val: boolean) => updateSetting('roomNotif', val),
    },
    {
      id: 'drawings',
      icon: 'brush',
      iconBg: '#EC4899',
      title: 'Dibujos',
      subtitle: 'Nuevos dibujos en la pizarra',
      value: settings.drawingNotif,
      onValueChange: (val: boolean) => updateSetting('drawingNotif', val),
    },
  ];

  const soundSettings = [
    {
      id: 'sound',
      icon: 'volume-high',
      iconBg: '#10B981',
      title: 'Sonido',
      subtitle: 'Reproducir sonido de notificación',
      value: settings.soundEnabled,
      onValueChange: (val: boolean) => updateSetting('soundEnabled', val),
    },
    {
      id: 'vibration',
      icon: 'phone-portrait',
      iconBg: '#F59E0B',
      title: 'Vibración',
      subtitle: 'Vibrar al recibir notificaciones',
      value: settings.vibrationEnabled,
      onValueChange: (val: boolean) => updateSetting('vibrationEnabled', val),
    },
  ];

  return (
    <LinearGradient
      colors={[christmasTheme.colors.gradientStart, christmasTheme.colors.gradientEnd]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={christmasTheme.colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Svg width={28} height={28} viewBox="0 0 100 100">
              {/* Bell icon */}
              <Path
                d="M50 15 Q35 15 35 30 L35 55 Q35 60 30 65 L70 65 Q65 60 65 55 L65 30 Q65 15 50 15"
                fill={christmasTheme.colors.text}
              />
              <Rect x="45" y="10" width="10" height="8" rx="2" fill={christmasTheme.colors.text} />
              <Path d="M40 65 Q40 75 50 75 Q60 75 60 65" fill={christmasTheme.colors.accent} />
              <Circle cx="70" cy="25" r="8" fill="#EF4444" />
            </Svg>
            <Text style={styles.headerTitle}>Notificaciones</Text>
          </View>
        </View>

        <View style={styles.content}>
          {/* Alert Info */}
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={24} color={christmasTheme.colors.primary} />
            <Text style={styles.infoText}>
              Configura cómo y cuándo quieres recibir notificaciones de DuoLove
            </Text>
          </View>

          {/* Notification Types */}
          <Text style={styles.sectionTitle}>Tipos de Notificaciones</Text>
          {notificationSettings.map((setting) => (
            <View key={setting.id} style={styles.settingCard}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: setting.iconBg + '20' }]}>
                  <Ionicons name={setting.icon as any} size={22} color={setting.iconBg} />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>{setting.title}</Text>
                  <Text style={styles.settingSubtitle}>{setting.subtitle}</Text>
                </View>
              </View>
              <Switch
                value={setting.value}
                onValueChange={setting.onValueChange}
                trackColor={{ false: '#D1D5DB', true: christmasTheme.colors.primary }}
                thumbColor={setting.value ? christmasTheme.colors.accent : '#F3F4F6'}
              />
            </View>
          ))}

          {/* Sound & Vibration */}
          <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Sonido y Vibración</Text>
          {soundSettings.map((setting) => (
            <View key={setting.id} style={styles.settingCard}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: setting.iconBg + '20' }]}>
                  <Ionicons name={setting.icon as any} size={22} color={setting.iconBg} />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>{setting.title}</Text>
                  <Text style={styles.settingSubtitle}>{setting.subtitle}</Text>
                </View>
              </View>
              <Switch
                value={setting.value}
                onValueChange={setting.onValueChange}
                trackColor={{ false: '#D1D5DB', true: christmasTheme.colors.primary }}
                thumbColor={setting.value ? christmasTheme.colors.accent : '#F3F4F6'}
              />
            </View>
          ))}

          {/* Test Notification */}
          <TouchableOpacity style={styles.testButton} onPress={handleTestNotification}>
            <LinearGradient
              colors={[christmasTheme.colors.primary, christmasTheme.colors.secondary]}
              style={styles.testGradient}
            >
              <Ionicons name="notifications-outline" size={20} color="#FFF" />
              <Text style={styles.testText}>Probar Notificación</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.footerTextContainer}>
            <Svg width={20} height={20} viewBox="0 0 100 100">
              <Circle cx="50" cy="50" r="45" fill="#FBBF24" />
              <Circle cx="50" cy="35" r="5" fill="#fff" />
              <Rect x="47" y="45" width="6" height="30" rx="3" fill="#fff" />
            </Svg>
            <Text style={styles.footerText}>Los cambios se guardan automáticamente</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: christmasTheme.spacing.xl + 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: christmasTheme.spacing.lg,
    paddingBottom: christmasTheme.spacing.lg,
  },
  backButton: {
    padding: christmasTheme.spacing.sm,
    marginRight: christmasTheme.spacing.sm,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: christmasTheme.spacing.sm,
  },
  headerTitle: {
    fontSize: christmasTheme.fontSizes.xxlarge,
    fontWeight: 'bold',
    color: christmasTheme.colors.text,
  },
  content: {
    flex: 1,
    backgroundColor: christmasTheme.colors.backgroundLight,
    borderTopLeftRadius: christmasTheme.borderRadius.xlarge,
    borderTopRightRadius: christmasTheme.borderRadius.xlarge,
    padding: christmasTheme.spacing.lg,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: christmasTheme.colors.primary + '10',
    borderRadius: christmasTheme.borderRadius.medium,
    padding: christmasTheme.spacing.md,
    marginBottom: 24,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: christmasTheme.fontSizes.small,
    color: christmasTheme.colors.textDark,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: christmasTheme.fontSizes.large,
    fontWeight: '700',
    color: christmasTheme.colors.textDark,
    marginBottom: christmasTheme.spacing.md,
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: christmasTheme.colors.card,
    borderRadius: christmasTheme.borderRadius.medium,
    padding: christmasTheme.spacing.md,
    marginBottom: christmasTheme.spacing.sm,
    ...christmasTheme.shadows.small,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: christmasTheme.spacing.md,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: christmasTheme.fontSizes.medium,
    fontWeight: '600',
    color: christmasTheme.colors.textDark,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: christmasTheme.fontSizes.small,
    color: christmasTheme.colors.textMuted,
  },
  testButton: {
    marginTop: 30,
    borderRadius: christmasTheme.borderRadius.medium,
    overflow: 'hidden',
    ...christmasTheme.shadows.medium,
  },
  testGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: christmasTheme.spacing.md,
    gap: 8,
  },
  testText: {
    fontSize: christmasTheme.fontSizes.medium,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  footerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: christmasTheme.spacing.md,
    gap: 8,
  },
  footerText: {
    fontSize: christmasTheme.fontSizes.small,
    color: christmasTheme.colors.textMuted,
  },
});
