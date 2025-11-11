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
  Share,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import ApiService from '../services/api';
import { christmasTheme } from '../theme';

export default function CreateRoomScreen({ navigation }: any) {
  const [roomName, setRoomName] = useState('Mi Sala');
  const [loading, setLoading] = useState(false);
  const [roomData, setRoomData] = useState<any>(null);

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      Alert.alert('Error', 'Por favor ingresa un nombre para la sala');
      return;
    }

    setLoading(true);
    try {
      const response = await ApiService.createRoom(roomName);
      setRoomData(response);
    } catch (error: any) {
      Alert.alert('Error', 'No se pudo crear la sala');
    } finally {
      setLoading(false);
    }
  };

  const handleShareCode = async () => {
    if (!roomData) return;

    try {
      await Share.share({
        message: `¡Únete a mi sala en DuoLove! 💕\n\nCódigo: ${roomData.code}\n\nO usa este enlace: duolove://join/${roomData.code}`,
        title: 'Compartir código de sala',
      });
    } catch (error) {
      console.error('Error compartiendo:', error);
    }
  };

  const handleGoToRoom = () => {
    navigation.replace('Main');
  };

  if (roomData) {
    return (
      <LinearGradient
        colors={[christmasTheme.colors.gradientStart, christmasTheme.colors.gradientEnd]}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.successHeader}>
            <Text style={styles.successEmoji}>🎉</Text>
            <Text style={styles.successTitle}>¡Sala Creada!</Text>
            <Text style={styles.successSubtitle}>
              Comparte este código con tu pareja
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>{roomData.name}</Text>
            
            {/* QR Code */}
            <View style={styles.qrContainer}>
              <QRCode
                value={`duolove://join/${roomData.code}`}
                size={200}
                backgroundColor="white"
                color={christmasTheme.colors.primary}
              />
            </View>

            {/* Código */}
            <View style={styles.codeContainer}>
              <Text style={styles.codeLabel}>Código de sala:</Text>
              <Text style={styles.code}>{roomData.code}</Text>
            </View>

            <TouchableOpacity style={styles.shareButton} onPress={handleShareCode}>
              <Ionicons name="share-social" size={20} color="#fff" />
              <Text style={styles.shareButtonText}>Compartir código</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.doneButton} onPress={handleGoToRoom}>
              <Text style={styles.doneButtonText}>Ir a mis salas</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }

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
          <Text style={styles.emoji}>🏠</Text>
          <Text style={styles.title}>Crear Sala</Text>
          <Text style={styles.subtitle}>Crea un espacio para compartir con tu pareja</Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>Nombre de la sala</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Nuestro Espacio"
            placeholderTextColor={christmasTheme.colors.textMuted}
            value={roomName}
            onChangeText={setRoomName}
            editable={!loading}
          />

          <TouchableOpacity
            style={[styles.createButton, loading && styles.createButtonDisabled]}
            onPress={handleCreateRoom}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="add-circle" size={20} color="#fff" />
                <Text style={styles.createButtonText}>Crear Sala</Text>
              </>
            )}
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
  emoji: {
    fontSize: 60,
    marginBottom: christmasTheme.spacing.sm,
  },
  title: {
    fontSize: christmasTheme.fontSizes.xxlarge,
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
    fontSize: christmasTheme.fontSizes.medium,
    color: christmasTheme.colors.textDark,
    backgroundColor: christmasTheme.colors.backgroundLight,
    marginBottom: christmasTheme.spacing.lg,
  },
  createButton: {
    flexDirection: 'row',
    backgroundColor: christmasTheme.colors.primary,
    borderRadius: christmasTheme.borderRadius.medium,
    paddingVertical: christmasTheme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: christmasTheme.spacing.sm,
    ...christmasTheme.shadows.small,
  },
  createButtonDisabled: {
    opacity: 0.6,
  },
  createButtonText: {
    color: christmasTheme.colors.text,
    fontSize: christmasTheme.fontSizes.large,
    fontWeight: 'bold',
  },
  successHeader: {
    alignItems: 'center',
    marginBottom: christmasTheme.spacing.xl,
  },
  successEmoji: {
    fontSize: 60,
    marginBottom: christmasTheme.spacing.sm,
  },
  successTitle: {
    fontSize: christmasTheme.fontSizes.xxlarge,
    fontWeight: 'bold',
    color: christmasTheme.colors.text,
    marginBottom: christmasTheme.spacing.xs,
  },
  successSubtitle: {
    fontSize: christmasTheme.fontSizes.medium,
    color: christmasTheme.colors.accent,
    textAlign: 'center',
  },
  card: {
    backgroundColor: christmasTheme.colors.card,
    borderRadius: christmasTheme.borderRadius.large,
    padding: christmasTheme.spacing.xl,
    alignItems: 'center',
    ...christmasTheme.shadows.large,
  },
  cardTitle: {
    fontSize: christmasTheme.fontSizes.xlarge,
    fontWeight: 'bold',
    color: christmasTheme.colors.textDark,
    marginBottom: christmasTheme.spacing.lg,
  },
  qrContainer: {
    padding: christmasTheme.spacing.lg,
    backgroundColor: christmasTheme.colors.backgroundLight,
    borderRadius: christmasTheme.borderRadius.medium,
    marginBottom: christmasTheme.spacing.lg,
  },
  codeContainer: {
    alignItems: 'center',
    marginBottom: christmasTheme.spacing.lg,
  },
  codeLabel: {
    fontSize: christmasTheme.fontSizes.medium,
    color: christmasTheme.colors.textMuted,
    marginBottom: christmasTheme.spacing.xs,
  },
  code: {
    fontSize: christmasTheme.fontSizes.xxlarge,
    fontWeight: 'bold',
    color: christmasTheme.colors.primary,
    letterSpacing: 2,
  },
  shareButton: {
    flexDirection: 'row',
    backgroundColor: christmasTheme.colors.secondary,
    borderRadius: christmasTheme.borderRadius.medium,
    paddingVertical: christmasTheme.spacing.md,
    paddingHorizontal: christmasTheme.spacing.xl,
    alignItems: 'center',
    gap: christmasTheme.spacing.sm,
    marginBottom: christmasTheme.spacing.md,
    ...christmasTheme.shadows.small,
  },
  shareButtonText: {
    color: christmasTheme.colors.text,
    fontSize: christmasTheme.fontSizes.medium,
    fontWeight: 'bold',
  },
  doneButton: {
    paddingVertical: christmasTheme.spacing.sm,
  },
  doneButtonText: {
    color: christmasTheme.colors.primary,
    fontSize: christmasTheme.fontSizes.medium,
    fontWeight: '600',
  },
});
