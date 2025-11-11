import React, { useState } from 'react';
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
import { useTheme } from '../context/ThemeContext';

export default function ThemeScreen({ navigation }: any) {
  const { settings, updateTheme, toggleDarkMode, toggleAnimations, toggleSnowEffect } = useTheme();
  
  const handleApplyChanges = () => {
    Alert.alert(
      'Cambios Aplicados',
      'Tu tema ha sido actualizado correctamente',
      [{ text: 'OK', onPress: () => {} }]
    );
  };

  const themes = [
    {
      id: 'christmas',
      name: 'Navidad Clásica',
      colors: ['#2D1B69', '#C41E3A'],
      description: 'Tema navideño tradicional',
    },
    {
      id: 'winter',
      name: 'Invierno Frozen',
      colors: ['#1E3A8A', '#60A5FA'],
      description: 'Colores fríos de invierno',
    },
    {
      id: 'romantic',
      name: 'Romance Navideño',
      colors: ['#BE185D', '#EC4899'],
      description: 'Tonos románticos y cálidos',
    },
    {
      id: 'gold',
      name: 'Lujo Dorado',
      colors: ['#854D0E', '#FBBF24'],
      description: 'Elegancia dorada',
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
              {/* Paint palette */}
              <Circle cx="50" cy="50" r="40" fill={christmasTheme.colors.text} />
              <Circle cx="35" cy="30" r="6" fill="#C41E3A" />
              <Circle cx="55" cy="25" r="6" fill="#165B33" />
              <Circle cx="70" cy="45" r="6" fill="#FFD700" />
              <Circle cx="60" cy="65" r="6" fill="#4A90E2" />
              <Circle cx="35" cy="60" r="6" fill="#FF6B9D" />
              <Path d="M20 70 Q15 80 25 85 L30 75 Z" fill={christmasTheme.colors.text} />
            </Svg>
            <Text style={styles.headerTitle}>Tema Navideño</Text>
          </View>
        </View>

        <View style={styles.content}>
          {/* Themes Section */}
          <Text style={styles.sectionTitle}>Selecciona tu tema</Text>
          {themes.map((theme) => (
            <TouchableOpacity
              key={theme.id}
              style={[
                styles.themeCard,
                settings.selectedTheme === theme.id && styles.themeCardSelected,
              ]}
              onPress={() => updateTheme(theme.id as any)}
            >
              <LinearGradient
                colors={theme.colors}
                style={styles.themeGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {theme.id === 'christmas' && (
                  <Svg width={40} height={40} viewBox="0 0 100 100">
                    <Path d="M50 10 L70 35 L65 35 L80 55 L75 55 L90 75 L10 75 L25 55 L20 55 L35 35 L30 35 Z" fill="#fff" />
                    <Rect x="45" y="75" width="10" height="15" fill="#fff" />
                  </Svg>
                )}
                {theme.id === 'winter' && (
                  <Svg width={40} height={40} viewBox="0 0 100 100">
                    <Path d="M50 10 L50 90 M10 50 L90 50 M25 25 L75 75 M75 25 L25 75" stroke="#fff" strokeWidth="6" />
                    <Circle cx="50" cy="10" r="8" fill="#fff" />
                    <Circle cx="50" cy="90" r="8" fill="#fff" />
                    <Circle cx="10" cy="50" r="8" fill="#fff" />
                    <Circle cx="90" cy="50" r="8" fill="#fff" />
                  </Svg>
                )}
                {theme.id === 'romantic' && (
                  <Svg width={40} height={40} viewBox="0 0 100 100">
                    <Path d="M50 85 L25 60 Q15 50 15 35 Q15 20 30 20 Q40 20 50 35 Q60 20 70 20 Q85 20 85 35 Q85 50 75 60 Z" fill="#fff" />
                  </Svg>
                )}
                {theme.id === 'gold' && (
                  <Svg width={40} height={40} viewBox="0 0 100 100">
                    <Path d="M50 15 L60 45 L92 45 L67 63 L77 93 L50 75 L23 93 L33 63 L8 45 L40 45 Z" fill="#fff" />
                  </Svg>
                )}
              </LinearGradient>
              <View style={styles.themeInfo}>
                <Text style={styles.themeName}>{theme.name}</Text>
                <Text style={styles.themeDescription}>{theme.description}</Text>
              </View>
              {settings.selectedTheme === theme.id && (
                <Ionicons name="checkmark-circle" size={24} color={christmasTheme.colors.primary} />
              )}
            </TouchableOpacity>
          ))}

          {/* Settings Section */}
          <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Personalización</Text>

          <View style={styles.settingCard}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#1F2937' }]}>
                <Ionicons name="moon" size={20} color="#F59E0B" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Modo Oscuro</Text>
                <Text style={styles.settingSubtitle}>Tema oscuro para la noche</Text>
              </View>
            </View>
            <Switch
              value={settings.darkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: '#D1D5DB', true: christmasTheme.colors.primary }}
              thumbColor={settings.darkMode ? christmasTheme.colors.accent : '#F3F4F6'}
            />
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#DBEAFE' }]}>
                <Ionicons name="sparkles" size={20} color="#3B82F6" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Animaciones</Text>
                <Text style={styles.settingSubtitle}>Efectos visuales suaves</Text>
              </View>
            </View>
            <Switch
              value={settings.animations}
              onValueChange={toggleAnimations}
              trackColor={{ false: '#D1D5DB', true: christmasTheme.colors.primary }}
              thumbColor={settings.animations ? christmasTheme.colors.accent : '#F3F4F6'}
            />
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#E0F2FE' }]}>
                <Svg width={20} height={20} viewBox="0 0 100 100">
                  <Path d="M50 10 L50 90 M10 50 L90 50 M25 25 L75 75 M75 25 L25 75" stroke="#0EA5E9" strokeWidth="8" />
                  <Circle cx="50" cy="10" r="6" fill="#0EA5E9" />
                  <Circle cx="50" cy="90" r="6" fill="#0EA5E9" />
                  <Circle cx="10" cy="50" r="6" fill="#0EA5E9" />
                  <Circle cx="90" cy="50" r="6" fill="#0EA5E9" />
                </Svg>
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Efecto de Nieve</Text>
                <Text style={styles.settingSubtitle}>Copos cayendo en pantalla</Text>
              </View>
            </View>
            <Switch
              value={settings.snowEffect}
              onValueChange={toggleSnowEffect}
              trackColor={{ false: '#D1D5DB', true: christmasTheme.colors.primary }}
              thumbColor={settings.snowEffect ? christmasTheme.colors.accent : '#F3F4F6'}
            />
          </View>

          {/* Apply Button */}
          <TouchableOpacity style={styles.applyButton} onPress={handleApplyChanges}>
            <LinearGradient
              colors={[christmasTheme.colors.primary, christmasTheme.colors.secondary]}
              style={styles.applyGradient}
            >
              <Ionicons name="checkmark-circle" size={20} color="#FFF" />
              <Text style={styles.applyText}>Aplicar Cambios</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.infoTextContainer}>
            <Svg width={20} height={20} viewBox="0 0 100 100">
              <Circle cx="50" cy="50" r="45" fill="#FBBF24" />
              <Circle cx="50" cy="35" r="5" fill="#fff" />
              <Rect x="47" y="45" width="6" height="30" rx="3" fill="#fff" />
            </Svg>
            <Text style={styles.infoText}>Los cambios se guardarán automáticamente</Text>
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
  sectionTitle: {
    fontSize: christmasTheme.fontSizes.large,
    fontWeight: '700',
    color: christmasTheme.colors.textDark,
    marginBottom: christmasTheme.spacing.md,
  },
  themeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: christmasTheme.colors.card,
    borderRadius: christmasTheme.borderRadius.medium,
    padding: christmasTheme.spacing.md,
    marginBottom: christmasTheme.spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
    ...christmasTheme.shadows.small,
  },
  themeCardSelected: {
    borderColor: christmasTheme.colors.primary,
    ...christmasTheme.shadows.medium,
  },
  themeGradient: {
    width: 60,
    height: 60,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: christmasTheme.spacing.md,
  },
  themeInfo: {
    flex: 1,
  },
  themeName: {
    fontSize: christmasTheme.fontSizes.medium,
    fontWeight: '600',
    color: christmasTheme.colors.textDark,
    marginBottom: 2,
  },
  themeDescription: {
    fontSize: christmasTheme.fontSizes.small,
    color: christmasTheme.colors.textMuted,
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
    width: 40,
    height: 40,
    borderRadius: 10,
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
  applyButton: {
    marginTop: 30,
    borderRadius: christmasTheme.borderRadius.medium,
    overflow: 'hidden',
    ...christmasTheme.shadows.medium,
  },
  applyGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: christmasTheme.spacing.md,
    gap: 8,
  },
  applyText: {
    fontSize: christmasTheme.fontSizes.medium,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  infoTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: christmasTheme.spacing.md,
    gap: 8,
  },
  infoText: {
    fontSize: christmasTheme.fontSizes.small,
    color: christmasTheme.colors.textMuted,
  },
});
