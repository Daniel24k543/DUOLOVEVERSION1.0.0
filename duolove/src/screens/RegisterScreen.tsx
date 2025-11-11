import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle, Polygon } from 'react-native-svg';
import ApiService from '../services/api';
import { christmasTheme } from '../theme';

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      await ApiService.register(email, password, name);
      navigation.replace('Main');
    } catch (error: any) {
      const message = error.response?.data?.error || 'Error al registrarse';
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[christmasTheme.colors.gradientStart, christmasTheme.colors.gradientEnd]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              disabled={loading}
            >
              <Ionicons name="arrow-back" size={24} color={christmasTheme.colors.text} />
            </TouchableOpacity>
            <View style={styles.iconContainer}>
              <Svg width="80" height="80" viewBox="0 0 24 24">
                {/* Regalo SVG */}
                <Path d="M4 10 L20 10 L20 20 L4 20 Z" fill="#C41E3A"/>
                <Path d="M12 10 L12 20" stroke="#FFD700" strokeWidth="1.5"/>
                <Path d="M4 10 L20 10" stroke="#FFD700" strokeWidth="1.5"/>
                <Path d="M6 6 L18 6 L18 10 L6 10 Z" fill="#FFD700"/>
                <Path d="M8 2 Q12 6 12 6 Q12 6 16 2" stroke="#C41E3A" strokeWidth="1.5" fill="none"/>
              </Svg>
            </View>
            <Text style={styles.title}>Crear Cuenta</Text>
            <Text style={styles.subtitle}>Únete a DuoLove</Text>
          </View>

          {/* Formulario */}
          <View style={styles.formCard}>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color={christmasTheme.colors.textMuted} />
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                placeholderTextColor={christmasTheme.colors.textMuted}
                value={name}
                onChangeText={setName}
                editable={!loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color={christmasTheme.colors.textMuted} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={christmasTheme.colors.textMuted}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color={christmasTheme.colors.textMuted} />
              <TextInput
                style={styles.input}
                placeholder="Contraseña (min. 6 caracteres)"
                placeholderTextColor={christmasTheme.colors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                editable={!loading}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={christmasTheme.colors.textMuted}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color={christmasTheme.colors.textMuted} />
              <TextInput
                style={styles.input}
                placeholder="Confirmar contraseña"
                placeholderTextColor={christmasTheme.colors.textMuted}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
                editable={!loading}
              />
            </View>

            <TouchableOpacity
              style={[styles.registerButton, loading && styles.registerButtonDisabled]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.registerButtonText}>Registrarse</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginLink}
              onPress={() => navigation.navigate('Login')}
              disabled={loading}
            >
              <Text style={styles.loginLinkText}>
                ¿Ya tienes cuenta? <Text style={styles.loginLinkBold}>Inicia sesión</Text>
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.footerIcons}>
              {/* Copo de nieve */}
              <Svg width="30" height="30" viewBox="0 0 24 24">
                <Path d="M12 2L12 22M2 12L22 12M6 6L18 18M6 18L18 6" stroke="#FFFFFF" strokeWidth="1.5" fill="none"/>
                <Circle cx="12" cy="12" r="1.5" fill="#FFFFFF"/>
              </Svg>
              {/* Muñeco de nieve */}
              <Svg width="30" height="30" viewBox="0 0 24 24">
                <Circle cx="12" cy="8" r="3" fill="#FFFFFF"/>
                <Circle cx="12" cy="16" r="4" fill="#FFFFFF"/>
                <Circle cx="11" cy="7" r="0.5" fill="#000"/>
                <Circle cx="13" cy="7" r="0.5" fill="#000"/>
              </Svg>
              {/* Regalo */}
              <Svg width="30" height="30" viewBox="0 0 24 24">
                <Path d="M4 10 L20 10 L20 20 L4 20 Z" fill="#C41E3A"/>
                <Path d="M12 10 L12 20" stroke="#FFD700" strokeWidth="2"/>
                <Path d="M4 10 L20 10" stroke="#FFD700" strokeWidth="2"/>
                <Path d="M6 6 L18 6 L18 10 L6 10 Z" fill="#FFD700"/>
              </Svg>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: christmasTheme.spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: christmasTheme.spacing.xl,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: christmasTheme.spacing.sm,
  },
  iconContainer: {
    marginBottom: christmasTheme.spacing.md,
  },
  emoji: {
    fontSize: 60,
    marginBottom: christmasTheme.spacing.sm,
  },
  title: {
    fontSize: christmasTheme.fontSizes.title,
    fontWeight: 'bold',
    color: christmasTheme.colors.text,
    marginBottom: christmasTheme.spacing.xs,
  },
  subtitle: {
    fontSize: christmasTheme.fontSizes.medium,
    color: christmasTheme.colors.accent,
  },
  formCard: {
    backgroundColor: christmasTheme.colors.card,
    borderRadius: christmasTheme.borderRadius.large,
    padding: christmasTheme.spacing.lg,
    ...christmasTheme.shadows.medium,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: christmasTheme.colors.border,
    borderRadius: christmasTheme.borderRadius.medium,
    paddingHorizontal: christmasTheme.spacing.md,
    marginBottom: christmasTheme.spacing.md,
    backgroundColor: christmasTheme.colors.backgroundLight,
  },
  input: {
    flex: 1,
    paddingVertical: christmasTheme.spacing.md,
    paddingHorizontal: christmasTheme.spacing.sm,
    fontSize: christmasTheme.fontSizes.medium,
    color: christmasTheme.colors.textDark,
  },
  registerButton: {
    backgroundColor: christmasTheme.colors.primary,
    borderRadius: christmasTheme.borderRadius.medium,
    paddingVertical: christmasTheme.spacing.md,
    alignItems: 'center',
    marginTop: christmasTheme.spacing.sm,
    ...christmasTheme.shadows.small,
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    color: christmasTheme.colors.text,
    fontSize: christmasTheme.fontSizes.large,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: christmasTheme.spacing.lg,
    alignItems: 'center',
  },
  loginLinkText: {
    color: christmasTheme.colors.textMuted,
    fontSize: christmasTheme.fontSizes.medium,
  },
  loginLinkBold: {
    color: christmasTheme.colors.primary,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: christmasTheme.spacing.xl,
    alignItems: 'center',
  },
  footerIcons: {
    flexDirection: 'row',
    gap: christmasTheme.spacing.md,
    justifyContent: 'center',
  },
  footerEmoji: {
    fontSize: 24,
    letterSpacing: 8,
  },
});
