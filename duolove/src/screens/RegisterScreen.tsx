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
// NO importes LinearGradient
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle, Polygon } from 'react-native-svg';
import ApiService from '../services/api';
// IMPORTA LOS NUEVOS COMPONENTES
import { useTheme } from '../context/ThemeContext';
import AppBackground from '../components/AppBackground'; // ¡NUEVO!

export default function RegisterScreen({ navigation }: any) {
  // Usa el hook de tema
  const { theme } = useTheme();

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
    // Reemplaza LinearGradient con View
    <View style={styles.container}>
      {/* Añade el fondo de video/gradiente */}
      <AppBackground />

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
              <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
            </TouchableOpacity>
            <View style={styles.iconContainer}>
              <Svg width="80" height="80" viewBox="0 0 24 24">
                {/* Regalo SVG (usando colores del tema) */}
                <Path d="M4 10 L20 10 L20 20 L4 20 Z" fill={theme.colors.primary}/>
                <Path d="M12 10 L12 20" stroke={theme.colors.accent} strokeWidth="1.5"/>
                <Path d="M4 10 L20 10" stroke={theme.colors.accent} strokeWidth="1.5"/>
                <Path d="M6 6 L18 6 L18 10 L6 10 Z" fill={theme.colors.accent}/>
                <Path d="M8 2 Q12 6 12 6 Q12 6 16 2" stroke={theme.colors.primary} strokeWidth="1.5" fill="none"/>
              </Svg>
            </View>
            <Text style={[styles.title, { color: theme.colors.text }]}>Crear Cuenta</Text>
            <Text style={[styles.subtitle, { color: theme.colors.accent }]}>Únete a DuoLove</Text>
          </View>

          {/* Formulario (usando 'theme' en lugar de 'christmasTheme') */}
          <View style={[styles.formCard, { backgroundColor: theme.colors.card, ...theme.shadows.medium }]}>
            <View style={[styles.inputContainer, { borderColor: theme.colors.border, backgroundColor: theme.colors.backgroundLight }]}>
              <Ionicons name="person-outline" size={20} color={theme.colors.textMuted} />
              <TextInput
                style={[styles.input, { color: theme.colors.textDark }]}
                placeholder="Nombre"
                placeholderTextColor={theme.colors.textMuted}
                value={name}
                onChangeText={setName}
                editable={!loading}
              />
            </View>

            <View style={[styles.inputContainer, { borderColor: theme.colors.border, backgroundColor: theme.colors.backgroundLight }]}>
              <Ionicons name="mail-outline" size={20} color={theme.colors.textMuted} />
              <TextInput
                style={[styles.input, { color: theme.colors.textDark }]}
                placeholder="Email"
                placeholderTextColor={theme.colors.textMuted}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!loading}
              />
            </View>

            <View style={[styles.inputContainer, { borderColor: theme.colors.border, backgroundColor: theme.colors.backgroundLight }]}>
              <Ionicons name="lock-closed-outline" size={20} color={theme.colors.textMuted} />
              <TextInput
                style={[styles.input, { color: theme.colors.textDark }]}
                placeholder="Contraseña (min. 6 caracteres)"
                placeholderTextColor={theme.colors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                editable={!loading}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={theme.colors.textMuted}
                />
              </TouchableOpacity>
            </View>

            <View style={[styles.inputContainer, { borderColor: theme.colors.border, backgroundColor: theme.colors.backgroundLight }]}>
              <Ionicons name="lock-closed-outline" size={20} color={theme.colors.textMuted} />
              <TextInput
                style={[styles.input, { color: theme.colors.textDark }]}
                placeholder="Confirmar contraseña"
                placeholderTextColor={theme.colors.textMuted}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
                editable={!loading}
              />
            </View>

            <TouchableOpacity
              style={[styles.registerButton, { backgroundColor: theme.colors.primary, ...theme.shadows.small }, loading && styles.registerButtonDisabled]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={[styles.registerButtonText, { color: theme.colors.text }]}>Registrarse</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginLink}
              onPress={() => navigation.navigate('Login')}
              disabled={loading}
            >
              <Text style={[styles.loginLinkText, { color: theme.colors.textMuted }]}>
                ¿Ya tienes cuenta? <Text style={[styles.loginLinkBold, { color: theme.colors.primary }]}>Inicia sesión</Text>
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer (usando colores del tema) */}
          <View style={styles.footer}>
            <View style={styles.footerIcons}>
              <Svg width="30" height="30" viewBox="0 0 24 24">
                <Path d="M12 2L12 22M2 12L22 12M6 6L18 18M6 18L18 6" stroke={theme.colors.text} strokeWidth="1.5" fill="none"/>
                <Circle cx="12" cy="12" r="1.5" fill={theme.colors.text}/>
              </Svg>
              <Svg width="30" height="30" viewBox="0 0 24 24">
                <Circle cx="12" cy="8" r="3" fill={theme.colors.text}/>
                <Circle cx="12" cy="16" r="4" fill={theme.colors.text}/>
                <Circle cx="11" cy="7" r="0.5" fill={theme.colors.gradientStart}/>
                <Circle cx="13" cy="7" r="0.5" fill={theme.colors.gradientStart}/>
              </Svg>
              <Svg width="30" height="30" viewBox="0 0 24 24">
                <Path d="M4 10 L20 10 L20 20 L4 20 Z" fill={theme.colors.primary}/>
                <Path d="M12 10 L12 20" stroke={theme.colors.accent} strokeWidth="2"/>
                <Path d="M4 10 L20 10" stroke={theme.colors.accent} strokeWidth="2"/>
                <Path d="M6 6 L18 6 L18 10 L6 10 Z" fill={theme.colors.accent}/>
              </Svg>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// Estilos actualizados
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
    padding: 24, 
  },
  header: {
    alignItems: 'center',
    marginBottom: 32, 
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 8, 
  },
  iconContainer: {
    marginBottom: 16, 
  },
  title: {
    fontSize: 36, 
    fontWeight: 'bold',
    marginBottom: 4, 
  },
  subtitle: {
    fontSize: 16, 
  },
  formCard: {
    borderRadius: 16, 
    padding: 24, 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12, 
    paddingHorizontal: 16, 
    marginBottom: 16, 
  },
  input: {
    flex: 1,
    paddingVertical: 16, 
    paddingHorizontal: 8, 
    fontSize: 16, 
  },
  registerButton: {
    borderRadius: 12, 
    paddingVertical: 16, 
    alignItems: 'center',
    marginTop: 8, 
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    fontSize: 20, 
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 24, 
    alignItems: 'center',
  },
  loginLinkText: {
    fontSize: 16, 
  },
  loginLinkBold: {
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 32, 
    alignItems: 'center',
  },
  footerIcons: {
    flexDirection: 'row',
    gap: 16, 
    justifyContent: 'center',
  },
});