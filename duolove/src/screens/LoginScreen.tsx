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
            <View style={styles.iconContainer}>
              <Svg width="80" height="80" viewBox="0 0 100 100">
                {/* Árbol de Navidad SVG */}
                <Polygon points="50,10 30,40 40,40 20,70 80,70 60,40 70,40" fill="#165B33" />
                <Polygon points="50,15 35,38 45,38 30,60 70,60 55,38 65,38" fill="#2E7D32" />
                {/* Tronco */}
                <Path d="M45,70 L55,70 L55,85 L45,85 Z" fill="#6D4C41" />
                {/* Estrella */}
                <Polygon points="50,2 52,8 58,8 53,12 55,18 50,14 45,18 47,12 42,8 48,8" fill="#FFD700" />
                {/* Decoraciones */}
                <Circle cx="50" cy="30" r="2" fill="#C41E3A" />
                <Circle cx="45" cy="45" r="2" fill="#FFD700" />
                <Circle cx="55" cy="45" r="2" fill="#C41E3A" />
                <Circle cx="40" cy="60" r="2" fill="#FFD700" />
                <Circle cx="60" cy="60" r="2" fill="#FFD700" />
              </Svg>
            </View>
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
              {/* Campana */}
              <Svg width="30" height="30" viewBox="0 0 24 24">
                <Path d="M12 3 C8 3 8 7 8 10 L8 14 L16 14 L16 10 C16 7 16 3 12 3 Z" fill="#FFD700"/>
                <Path d="M7 14 L17 14 L17 16 L7 16 Z" fill="#FFD700"/>
                <Circle cx="12" cy="18" r="1.5" fill="#C41E3A"/>
              </Svg>
              {/* Estrella */}
              <Svg width="30" height="30" viewBox="0 0 24 24">
                <Polygon points="12,2 14,9 21,9 15,14 17,21 12,16 7,21 9,14 3,9 10,9" fill="#FFD700"/>
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
