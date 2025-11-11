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
import ApiService from '../services/api';
import { christmasTheme } from '../theme';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      await ApiService.login(email, password);
      navigation.replace('Main');
    } catch (error: any) {
      const message = error.response?.data?.error || 'Error al iniciar sesión';
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
          {/* Header con decoración navideña */}
          <View style={styles.header}>
            <Text style={styles.emoji}>🎄</Text>
            <Text style={styles.title}>DuoLove</Text>
            <Text style={styles.subtitle}>Aplicación imprescindible para parejas</Text>
          </View>

          {/* Formulario */}
          <View style={styles.formCard}>
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
                placeholder="Contraseña"
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

            <TouchableOpacity
              style={[styles.loginButton, loading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.loginButtonText}>Acceder</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.registerLink}
              onPress={() => navigation.navigate('Register')}
              disabled={loading}
            >
              <Text style={styles.registerLinkText}>
                ¿Ya tienes una cuenta? <Text style={styles.registerLinkBold}>Acceso</Text>
              </Text>
              <Text style={styles.registerLinkText}>
                ¿No tienes cuenta? <Text style={styles.registerLinkBold}>Regístrate</Text>
              </Text>
            </TouchableOpacity>
          </View>

          {/* Decoración navideña inferior */}
          <View style={styles.footer}>
            <Text style={styles.footerEmoji}>❄️ ⛄ 🎁 🔔 ⭐</Text>
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
    textAlign: 'center',
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
  loginButton: {
    backgroundColor: christmasTheme.colors.primary,
    borderRadius: christmasTheme.borderRadius.medium,
    paddingVertical: christmasTheme.spacing.md,
    alignItems: 'center',
    marginTop: christmasTheme.spacing.sm,
    ...christmasTheme.shadows.small,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: christmasTheme.colors.text,
    fontSize: christmasTheme.fontSizes.large,
    fontWeight: 'bold',
  },
  registerLink: {
    marginTop: christmasTheme.spacing.lg,
    alignItems: 'center',
  },
  registerLinkText: {
    color: christmasTheme.colors.textMuted,
    fontSize: christmasTheme.fontSizes.medium,
    marginBottom: christmasTheme.spacing.xs,
  },
  registerLinkBold: {
    color: christmasTheme.colors.primary,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: christmasTheme.spacing.xl,
    alignItems: 'center',
  },
  footerEmoji: {
    fontSize: 24,
    letterSpacing: 8,
  },
});
