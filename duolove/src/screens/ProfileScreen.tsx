import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import ApiService, { User } from '../services/api';
import { christmasTheme } from '../theme';

export default function ProfileScreen({ navigation }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await ApiService.getProfile();
      setUser(response.user);
    } catch (error) {
      console.error('Error cargando perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a tu galería para cambiar la foto');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets[0]) {
      uploadAvatar(result.assets[0].uri);
    }
  };

  const uploadAvatar = async (uri: string) => {
    setUploading(true);
    try {
      const response = await ApiService.uploadAvatar(uri);
      await loadProfile();
      Alert.alert('¡Listo!', 'Tu foto de perfil se actualizó correctamente');
    } catch (error: any) {
      Alert.alert('Error', 'No se pudo subir la imagen');
    } finally {
      setUploading(false);
    }
  };

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={christmasTheme.colors.primary} />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[christmasTheme.colors.gradientStart, christmasTheme.colors.gradientEnd]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mi Perfil</Text>
        </View>

        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={pickImage}
            disabled={uploading}
          >
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={60} color={christmasTheme.colors.textMuted} />
              </View>
            )}
            <View style={styles.avatarBadge}>
              {uploading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Ionicons name="camera" size={16} color="#fff" />
              )}
            </View>
          </TouchableOpacity>

          <Text style={styles.userName}>{user?.name || 'Sin nombre'}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <View style={styles.optionIcon}>
              <Ionicons name="settings" size={24} color={christmasTheme.colors.primary} />
            </View>
            <Text style={styles.optionText}>Ajustes</Text>
            <Ionicons name="chevron-forward" size={20} color={christmasTheme.colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={handleLogout}>
            <View style={styles.optionIcon}>
              <Ionicons name="log-out" size={24} color={christmasTheme.colors.error} />
            </View>
            <Text style={[styles.optionText, styles.logoutText]}>Cerrar sesión</Text>
            <Ionicons name="chevron-forward" size={20} color={christmasTheme.colors.textMuted} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingTop: christmasTheme.spacing.xl + 20,
  },
  header: {
    paddingHorizontal: christmasTheme.spacing.lg,
    paddingBottom: christmasTheme.spacing.lg,
  },
  headerTitle: {
    fontSize: christmasTheme.fontSizes.xxlarge,
    fontWeight: 'bold',
    color: christmasTheme.colors.text,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: christmasTheme.spacing.xl,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: christmasTheme.spacing.md,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: christmasTheme.colors.accent,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: christmasTheme.colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: christmasTheme.colors.accent,
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: christmasTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: christmasTheme.colors.gradientEnd,
  },
  userName: {
    fontSize: christmasTheme.fontSizes.xlarge,
    fontWeight: 'bold',
    color: christmasTheme.colors.text,
    marginBottom: christmasTheme.spacing.xs,
  },
  userEmail: {
    fontSize: christmasTheme.fontSizes.medium,
    color: christmasTheme.colors.accent,
  },
  optionsContainer: {
    backgroundColor: christmasTheme.colors.backgroundLight,
    borderTopLeftRadius: christmasTheme.borderRadius.xlarge,
    borderTopRightRadius: christmasTheme.borderRadius.xlarge,
    padding: christmasTheme.spacing.lg,
    flex: 1,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: christmasTheme.colors.card,
    borderRadius: christmasTheme.borderRadius.medium,
    padding: christmasTheme.spacing.md,
    marginBottom: christmasTheme.spacing.md,
    ...christmasTheme.shadows.small,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: christmasTheme.colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: christmasTheme.spacing.md,
  },
  optionText: {
    flex: 1,
    fontSize: christmasTheme.fontSizes.medium,
    fontWeight: '600',
    color: christmasTheme.colors.textDark,
  },
  logoutText: {
    color: christmasTheme.colors.error,
  },
});
