import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import ApiService from '../services/api';
import { christmasTheme } from '../theme';

export default function JoinRoomScreen({ navigation }: any) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleJoinRoom = async () => {
    if (!code.trim()) {
      Alert.alert('Error', 'Por favor ingresa el código de la sala');
      return;
    }

    setLoading(true);
    try {
      const response = await ApiService.joinRoom(code);
      Alert.alert(
        '¡Éxito!',
        response.message || 'Te has unido a la sala correctamente',
        [
          {
            text: 'OK',
            onPress: () => navigation.replace('Main'),
          },
        ]
      );
    } catch (error: any) {
      const message = error.response?.data?.error || 'No se pudo unir a la sala';
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={christmasTheme.colors.text} />
          </TouchableOpacity>
          {/* SVG Key Icon */}
          <Svg width={70} height={70} viewBox="0 0 100 100">
            {/* Key design */}
            <Circle cx="30" cy="30" r="20" fill="none" stroke="#FFD700" strokeWidth="5" />
            <Circle cx="30" cy="30" r="10" fill="none" stroke="#FFD700" strokeWidth="5" />
            <Rect x="40" y="27" width="45" height="6" fill="#FFD700" />
            <Rect x="70" y="20" width="6" height="13" fill="#FFD700" />
            <Rect x="80" y="20" width="6" height="13" fill="#FFD700" />
            {/* Shine effect */}
            <Path
              d="M25 20 Q20 25 25 30"
              stroke="#FFF8DC"
              strokeWidth="2"
              fill="none"
            />
          </Svg>
          <Text style={styles.title}>Unirse a Sala</Text>
          <Text style={styles.subtitle}>Ingresa el código que te compartió tu pareja</Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>Código de sala</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: ABC12345"
            placeholderTextColor={christmasTheme.colors.textMuted}
            value={code}
            onChangeText={(text) => setCode(text.toUpperCase())}
            autoCapitalize="characters"
            maxLength={8}
            editable={!loading}
          />

          <TouchableOpacity
            style={[styles.joinButton, loading && styles.joinButtonDisabled]}
            onPress={handleJoinRoom}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="enter" size={20} color="#fff" />
                <Text style={styles.joinButtonText}>Unirse a la Sala</Text>
              </>
            )}
          </TouchableOpacity>

          <View style={styles.infoBox}>
            <Ionicons name="information-circle" size={20} color={christmasTheme.colors.primary} />
            <Text style={styles.infoText}>
              El código tiene 8 caracteres y lo genera la persona que creó la sala
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
    padding: christmasTheme.spacing.lg,
    paddingTop: christmasTheme.spacing.xl + 20,
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
  title: {
    fontSize: christmasTheme.fontSizes.xxlarge,
    fontWeight: 'bold',
    color: christmasTheme.colors.text,
    marginBottom: christmasTheme.spacing.xs,
    marginTop: christmasTheme.spacing.sm,
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
  label: {
    fontSize: christmasTheme.fontSizes.medium,
    fontWeight: '600',
    color: christmasTheme.colors.textDark,
    marginBottom: christmasTheme.spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: christmasTheme.colors.border,
    borderRadius: christmasTheme.borderRadius.medium,
    padding: christmasTheme.spacing.md,
    fontSize: christmasTheme.fontSizes.xlarge,
    fontWeight: 'bold',
    color: christmasTheme.colors.textDark,
    backgroundColor: christmasTheme.colors.backgroundLight,
    marginBottom: christmasTheme.spacing.lg,
    textAlign: 'center',
    letterSpacing: 2,
  },
  joinButton: {
    flexDirection: 'row',
    backgroundColor: christmasTheme.colors.secondary,
    borderRadius: christmasTheme.borderRadius.medium,
    paddingVertical: christmasTheme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: christmasTheme.spacing.sm,
    marginBottom: christmasTheme.spacing.lg,
    ...christmasTheme.shadows.small,
  },
  joinButtonDisabled: {
    opacity: 0.6,
  },
  joinButtonText: {
    color: christmasTheme.colors.text,
    fontSize: christmasTheme.fontSizes.large,
    fontWeight: 'bold',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: christmasTheme.colors.backgroundLight,
    borderRadius: christmasTheme.borderRadius.medium,
    padding: christmasTheme.spacing.md,
    gap: christmasTheme.spacing.sm,
  },
  infoText: {
    flex: 1,
    fontSize: christmasTheme.fontSizes.small,
    color: christmasTheme.colors.textMuted,
    lineHeight: 18,
  },
});
