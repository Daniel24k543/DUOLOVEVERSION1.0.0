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
import Svg, { Path, Circle, Rect } from 'react-native-svg';
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
            {/* SVG Celebration Icon */}
            <Svg width={80} height={80} viewBox="0 0 100 100">
              {/* Confetti pieces */}
              <Rect x="15" y="10" width="8" height="8" fill="#FFD700" />
              <Circle cx="75" cy="15" r="4" fill="#C41E3A" />
              <Rect x="85" y="25" width="6" height="10" fill="#165B33" transform="rotate(45 88 30)" />
              <Circle cx="20" cy="30" r="3" fill="#FF6B9D" />
              <Rect x="70" y="35" width="8" height="8" fill="#4A90E2" />
              {/* Star shapes */}
              <Path
                d="M50 20 L53 28 L62 28 L55 34 L58 42 L50 37 L42 42 L45 34 L38 28 L47 28 Z"
                fill="#FFD700"
              />
              {/* Streamers */}
              <Path
                d="M30 45 Q35 50 30 55 Q25 60 30 65"
                stroke="#C41E3A"
                strokeWidth="3"
                fill="none"
              />
              <Path
                d="M70 45 Q65 50 70 55 Q75 60 70 65"
                stroke="#165B33"
                strokeWidth="3"
                fill="none"
              />
              {/* Party popper */}
              <Path
                d="M45 70 L50 85 L55 70 Z"
                fill="#FFD700"
              />
              <Rect x="48" y="60" width="4" height="15" fill="#8B4513" />
              {/* More confetti */}
              <Circle cx="35" cy="75" r="3" fill="#4A90E2" />
              <Rect x="60" y="70" width="6" height="6" fill="#FF6B9D" />
            </Svg>
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
              <TouchableOpacity
                style={styles.copyCodeButton}
                onPress={async () => {
                  try {
                    await Share.share({
                      message: roomData.code,
                    });
                    Alert.alert('Éxito', 'Código copiado');
                  } catch (error) {
                    Alert.alert('Error', 'No se pudo copiar el código');
                  }
                }}
              >
                <Ionicons name="copy-outline" size={18} color={christmasTheme.colors.primary} />
                <Text style={styles.copyCodeText}>Copiar</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.shareButton} onPress={handleShareCode}>
              <Ionicons name="share-social" size={20} color="#fff" />
              <Text style={styles.shareButtonText}>Compartir código</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.viewQRButton} onPress={() => {
              Alert.alert(
                'Código QR',
                'Tu pareja puede escanear este código QR para unirse a la sala',
                [{ text: 'Entendido' }]
              );
            }}>
              <Ionicons name="qr-code-outline" size={20} color={christmasTheme.colors.primary} />
              <Text style={styles.viewQRButtonText}>Ver información del QR</Text>
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
          {/* SVG House Icon */}
          <Svg width={70} height={70} viewBox="0 0 100 100">
            {/* Roof */}
            <Path
              d="M50 20 L85 50 L80 50 L80 85 L20 85 L20 50 L15 50 Z"
              fill="#C41E3A"
              stroke="#8B0000"
              strokeWidth="2"
            />
            {/* House body */}
            <Rect x="25" y="50" width="50" height="35" fill="#FFE4B5" stroke="#D2691E" strokeWidth="2" />
            {/* Door */}
            <Rect x="42" y="60" width="16" height="25" fill="#8B4513" stroke="#654321" strokeWidth="1.5" />
            <Circle cx="52" cy="72" r="1.5" fill="#FFD700" />
            {/* Windows */}
            <Rect x="30" y="55" width="10" height="10" fill="#87CEEB" stroke="#4682B4" strokeWidth="1.5" />
            <Path d="M35 55 L35 65 M30 60 L40 60" stroke="#4682B4" strokeWidth="1" />
            <Rect x="60" y="55" width="10" height="10" fill="#87CEEB" stroke="#4682B4" strokeWidth="1.5" />
            <Path d="M65 55 L65 65 M60 60 L70 60" stroke="#4682B4" strokeWidth="1" />
            {/* Chimney */}
            <Rect x="65" y="30" width="8" height="20" fill="#8B4513" stroke="#654321" strokeWidth="1.5" />
            {/* Roof decoration */}
            <Circle cx="50" cy="25" r="3" fill="#FFD700" />
            {/* Snow on roof */}
            <Path
              d="M20 50 Q30 52 40 50 Q50 48 60 50 Q70 52 80 50"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3"
            />
          </Svg>
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
  successTitle: {
    fontSize: christmasTheme.fontSizes.xxlarge,
    fontWeight: 'bold',
    color: christmasTheme.colors.text,
    marginBottom: christmasTheme.spacing.xs,
    marginTop: christmasTheme.spacing.sm,
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
    marginBottom: christmasTheme.spacing.sm,
  },
  copyCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: christmasTheme.borderRadius.small,
    borderWidth: 1,
    borderColor: christmasTheme.colors.primary,
    backgroundColor: christmasTheme.colors.backgroundLight,
  },
  copyCodeText: {
    fontSize: christmasTheme.fontSizes.small,
    color: christmasTheme.colors.primary,
    fontWeight: '600',
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
  viewQRButton: {
    flexDirection: 'row',
    backgroundColor: christmasTheme.colors.backgroundLight,
    borderRadius: christmasTheme.borderRadius.medium,
    paddingVertical: christmasTheme.spacing.md,
    paddingHorizontal: christmasTheme.spacing.xl,
    alignItems: 'center',
    gap: christmasTheme.spacing.sm,
    marginBottom: christmasTheme.spacing.md,
    borderWidth: 1,
    borderColor: christmasTheme.colors.border,
  },
  viewQRButtonText: {
    color: christmasTheme.colors.primary,
    fontSize: christmasTheme.fontSizes.medium,
    fontWeight: '600',
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
