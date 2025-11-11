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
import { usePrivacy } from '../context/PrivacyContext';

export default function PrivacyScreen({ navigation }: any) {
  const { settings, updateSetting, downloadUserData, clearLocalData, deleteAccount } = usePrivacy();

  const handleDeleteAccount = () => {
    Alert.alert(
      'Eliminar Cuenta',
      'Esta acción es permanente y no se puede deshacer. Se eliminarán todos tus datos, salas y dibujos.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => deleteAccount(),
        },
      ]
    );
  };

  const handleClearData = () => {
    Alert.alert(
      'Limpiar Datos',
      '¿Deseas eliminar todos los datos almacenados en el dispositivo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpiar',
          style: 'destructive',
          onPress: () => clearLocalData(),
        },
      ]
    );
  };

  const handleDownloadData = () => {
    downloadUserData();
  };

  const privacySettings = [
    {
      id: 'profile',
      icon: 'person',
      iconBg: '#3B82F6',
      title: 'Perfil Visible',
      subtitle: 'Otros usuarios pueden ver tu perfil',
      value: settings.profileVisible,
      onValueChange: (val: boolean) => updateSetting('profileVisible', val),
    },
    {
      id: 'drawings',
      icon: 'brush',
      iconBg: '#EC4899',
      title: 'Compartir Dibujos',
      subtitle: 'Permitir compartir tus dibujos',
      value: settings.shareDrawings,
      onValueChange: (val: boolean) => updateSetting('shareDrawings', val),
    },
    {
      id: 'location',
      icon: 'location',
      iconBg: '#EF4444',
      title: 'Compartir Ubicación',
      subtitle: 'Compartir ubicación con tu pareja',
      value: settings.locationSharing,
      onValueChange: (val: boolean) => updateSetting('locationSharing', val),
    },
    {
      id: 'receipts',
      icon: 'checkmark-done',
      iconBg: '#10B981',
      title: 'Confirmaciones de Lectura',
      subtitle: 'Mostrar cuando lees mensajes',
      value: settings.readReceipts,
      onValueChange: (val: boolean) => updateSetting('readReceipts', val),
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
              {/* Lock icon */}
              <Rect x="25" y="45" width="50" height="45" rx="8" fill={christmasTheme.colors.text} />
              <Path
                d="M35 45 L35 30 Q35 15 50 15 Q65 15 65 30 L65 45"
                fill="none"
                stroke={christmasTheme.colors.text}
                strokeWidth="8"
              />
              <Circle cx="50" cy="65" r="6" fill={christmasTheme.colors.accent} />
              <Rect x="48" y="65" width="4" height="12" rx="2" fill={christmasTheme.colors.accent} />
            </Svg>
            <Text style={styles.headerTitle}>Privacidad</Text>
          </View>
        </View>

        <View style={styles.content}>
          {/* Security Badge */}
          <View style={styles.securityBadge}>
            <View style={styles.shieldContainer}>
              <Ionicons name="shield-checkmark" size={40} color={christmasTheme.colors.secondary} />
            </View>
            <Text style={styles.securityTitle}>Tus datos están protegidos</Text>
            <Text style={styles.securityText}>
              DuoLove utiliza encriptación de extremo a extremo para proteger tu información
            </Text>
          </View>

          {/* Privacy Settings */}
          <Text style={styles.sectionTitle}>Configuración de Privacidad</Text>
          {privacySettings.map((setting) => (
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

          {/* Data Management */}
          <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Gestión de Datos</Text>

          <TouchableOpacity style={styles.actionCard} onPress={handleDownloadData}>
            <View style={[styles.actionIcon, { backgroundColor: '#DBEAFE' }]}>
              <Ionicons name="document-text" size={22} color="#3B82F6" />
            </View>
            <View style={styles.actionInfo}>
              <Text style={styles.actionTitle}>Descargar Mis Datos</Text>
              <Text style={styles.actionSubtitle}>Obtén una copia de tu información</Text>
            </View>
            <Ionicons name="download" size={20} color="#3B82F6" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={handleClearData}>
            <View style={[styles.actionIcon, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="trash" size={22} color="#F59E0B" />
            </View>
            <View style={styles.actionInfo}>
              <Text style={styles.actionTitle}>Limpiar Datos Locales</Text>
              <Text style={styles.actionSubtitle}>Eliminar caché y datos temporales</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#F59E0B" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, { backgroundColor: '#E0E7FF' }]}>
              <Ionicons name="eye-off" size={22} color="#6366F1" />
            </View>
            <View style={styles.actionInfo}>
              <Text style={styles.actionTitle}>Usuarios Bloqueados</Text>
              <Text style={styles.actionSubtitle}>Gestionar lista de bloqueados (0)</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6366F1" />
          </TouchableOpacity>

          {/* Danger Zone */}
          <View style={styles.dangerZone}>
            <View style={styles.dangerTitleContainer}>
              <Svg width={24} height={24} viewBox="0 0 100 100">
                {/* Warning triangle */}
                <Path
                  d="M50 10 L90 85 L10 85 Z"
                  fill="#EF4444"
                  stroke="#B91C1C"
                  strokeWidth="3"
                />
                <Circle cx="50" cy="35" r="4" fill="#fff" />
                <Rect x="48" y="45" width="4" height="25" rx="2" fill="#fff" />
              </Svg>
              <Text style={styles.dangerTitle}>Zona de Peligro</Text>
            </View>
            
            <TouchableOpacity
              style={styles.dangerButton}
              onPress={handleDeleteAccount}
            >
              <Ionicons name="trash-bin" size={20} color="#EF4444" />
              <Text style={styles.dangerButtonText}>Eliminar Cuenta</Text>
            </TouchableOpacity>

            <Text style={styles.dangerWarning}>
              Esta acción es permanente y eliminará todos tus datos
            </Text>
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
  securityBadge: {
    backgroundColor: christmasTheme.colors.card,
    borderRadius: christmasTheme.borderRadius.large,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    ...christmasTheme.shadows.medium,
  },
  shieldContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: christmasTheme.colors.secondary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  securityTitle: {
    fontSize: christmasTheme.fontSizes.large,
    fontWeight: '700',
    color: christmasTheme.colors.textDark,
    marginBottom: 8,
  },
  securityText: {
    fontSize: christmasTheme.fontSizes.small,
    color: christmasTheme.colors.textMuted,
    textAlign: 'center',
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
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: christmasTheme.colors.card,
    borderRadius: christmasTheme.borderRadius.medium,
    padding: christmasTheme.spacing.md,
    marginBottom: christmasTheme.spacing.sm,
    ...christmasTheme.shadows.small,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: christmasTheme.spacing.md,
  },
  actionInfo: {
    flex: 1,
  },
  actionTitle: {
    fontSize: christmasTheme.fontSizes.medium,
    fontWeight: '600',
    color: christmasTheme.colors.textDark,
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: christmasTheme.fontSizes.small,
    color: christmasTheme.colors.textMuted,
  },
  dangerZone: {
    marginTop: 30,
    backgroundColor: '#FEE2E2',
    borderRadius: christmasTheme.borderRadius.medium,
    padding: christmasTheme.spacing.lg,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  dangerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: christmasTheme.spacing.md,
  },
  dangerTitle: {
    fontSize: christmasTheme.fontSizes.medium,
    fontWeight: '700',
    color: '#991B1B',
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: christmasTheme.borderRadius.medium,
    paddingVertical: christmasTheme.spacing.sm,
    borderWidth: 1,
    borderColor: '#EF4444',
    gap: 8,
  },
  dangerButtonText: {
    fontSize: christmasTheme.fontSizes.medium,
    fontWeight: '600',
    color: '#EF4444',
  },
  dangerWarning: {
    fontSize: christmasTheme.fontSizes.small,
    color: '#991B1B',
    textAlign: 'center',
    marginTop: christmasTheme.spacing.sm,
  },
});
