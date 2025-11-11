import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ApiService from '../services/api';
import { christmasTheme } from '../theme';

export default function SettingsScreen({ navigation }: any) {
  const handleLogout = async () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí, salir',
          style: 'destructive',
          onPress: async () => {
            await ApiService.logout();
            navigation.replace('Login');
          },
        },
      ]
    );
  };

  const settingsOptions = [
    {
      id: 'scan-qr',
      icon: 'qr-code-outline',
      title: 'Escanear código QR',
      subtitle: 'Unirse a sala con QR',
      color: '#9B59B6',
      onPress: () => navigation.navigate('QRScanner'),
    },
    {
      id: 'theme',
      icon: 'color-palette',
      title: 'Tema navideño',
      subtitle: 'Personaliza la apariencia',
      color: christmasTheme.colors.primary,
      onPress: () => Alert.alert('Próximamente', 'Esta función estará disponible pronto'),
    },
    {
      id: 'notifications',
      icon: 'notifications',
      title: 'Notificaciones',
      subtitle: 'Configura tus alertas',
      color: christmasTheme.colors.accent,
      onPress: () => Alert.alert('Próximamente', 'Esta función estará disponible pronto'),
    },
    {
      id: 'privacy',
      icon: 'shield-checkmark',
      title: 'Privacidad',
      subtitle: 'Gestiona tu privacidad',
      color: christmasTheme.colors.secondary,
      onPress: () => Alert.alert('Próximamente', 'Esta función estará disponible pronto'),
    },
    {
      id: 'help',
      icon: 'help-circle',
      title: 'Ayuda',
      subtitle: 'Centro de ayuda',
      color: '#0066FF',
      onPress: () => Alert.alert('Ayuda', 'Para soporte, contacta a soporte@duolove.com'),
    },
    {
      id: 'about',
      icon: 'information-circle',
      title: 'Acerca de',
      subtitle: 'Versión 1.0.0',
      color: christmasTheme.colors.textMuted,
      onPress: () => Alert.alert('DuoLove', 'Versión 1.0.0\nEdición Navideña 🎄\n© 2025'),
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
          <Text style={styles.headerTitle}>⚙️ Ajustes</Text>
        </View>

        {/* Settings Options */}
        <View style={styles.optionsContainer}>
          {settingsOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionCard}
              onPress={option.onPress}
            >
              <View style={[styles.optionIcon, { backgroundColor: option.color + '20' }]}>
                <Ionicons name={option.icon as any} size={24} color={option.color} />
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={christmasTheme.colors.textMuted} />
            </TouchableOpacity>
          ))}

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutCard} onPress={handleLogout}>
            <View style={[styles.optionIcon, { backgroundColor: christmasTheme.colors.error + '20' }]}>
              <Ionicons name="log-out" size={24} color={christmasTheme.colors.error} />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, styles.logoutText]}>Cerrar sesión</Text>
              <Text style={styles.optionSubtitle}>Salir de tu cuenta</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={christmasTheme.colors.error} />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>🎄 DuoLove - Edición Navideña 2025 🎄</Text>
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
  headerTitle: {
    fontSize: christmasTheme.fontSizes.xxlarge,
    fontWeight: 'bold',
    color: christmasTheme.colors.text,
  },
  optionsContainer: {
    flex: 1,
    backgroundColor: christmasTheme.colors.backgroundLight,
    borderTopLeftRadius: christmasTheme.borderRadius.xlarge,
    borderTopRightRadius: christmasTheme.borderRadius.xlarge,
    padding: christmasTheme.spacing.lg,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: christmasTheme.colors.card,
    borderRadius: christmasTheme.borderRadius.medium,
    padding: christmasTheme.spacing.md,
    marginBottom: christmasTheme.spacing.md,
    ...christmasTheme.shadows.small,
  },
  logoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: christmasTheme.colors.card,
    borderRadius: christmasTheme.borderRadius.medium,
    padding: christmasTheme.spacing.md,
    marginTop: christmasTheme.spacing.lg,
    borderWidth: 1,
    borderColor: christmasTheme.colors.error + '40',
  },
  optionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: christmasTheme.spacing.md,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: christmasTheme.fontSizes.medium,
    fontWeight: '600',
    color: christmasTheme.colors.textDark,
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: christmasTheme.fontSizes.small,
    color: christmasTheme.colors.textMuted,
  },
  logoutText: {
    color: christmasTheme.colors.error,
  },
  footer: {
    padding: christmasTheme.spacing.lg,
    alignItems: 'center',
  },
  footerText: {
    fontSize: christmasTheme.fontSizes.small,
    color: christmasTheme.colors.textMuted,
    textAlign: 'center',
  },
});
