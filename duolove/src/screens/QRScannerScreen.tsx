import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { christmasTheme } from '../theme';
import ApiService from '../services/api';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function QRScannerScreen({ navigation }: any) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }: any) => {
    setScanned(true);
    
    // Extraer código del QR (formato: "app://join/CODIGO")
    let roomCode = data;
    if (data.includes('/')) {
      roomCode = data.split('/').pop();
    }

    try {
      await ApiService.joinRoom(roomCode);
      Alert.alert(
        '¡Éxito!',
        'Te has unido a la sala correctamente',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Main'),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'No se pudo unir a la sala'
      );
      setScanned(false);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Solicitando permisos de cámara...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Ionicons name="camera-off" size={80} color={christmasTheme.colors.textMuted} />
        <Text style={styles.permissionText}>
          No tienes permisos para usar la cámara
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Escanear Código QR</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Cámara */}
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
        />
        
        {/* Marco del QR */}
        <View style={styles.overlay}>
          <View style={styles.scanArea}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
        </View>

        <View style={styles.instructions}>
          <Text style={styles.instructionText}>
            Apunta la cámara al código QR de la sala
          </Text>
        </View>
      </View>

      {/* Botón para reintentar */}
      {scanned && (
        <View style={styles.rescanContainer}>
          <TouchableOpacity
            style={styles.rescanButton}
            onPress={() => setScanned(false)}
          >
            <Ionicons name="refresh" size={24} color="#fff" />
            <Text style={styles.rescanText}>Escanear de nuevo</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: christmasTheme.spacing.lg,
    paddingVertical: christmasTheme.spacing.md,
    paddingTop: christmasTheme.spacing.xl + 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backButton: {
    padding: christmasTheme.spacing.sm,
  },
  headerTitle: {
    fontSize: christmasTheme.fontSizes.large,
    fontWeight: 'bold',
    color: '#fff',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanArea: {
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_WIDTH * 0.7,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: christmasTheme.colors.accent,
    borderWidth: 4,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  instructions: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: christmasTheme.spacing.lg,
  },
  instructionText: {
    color: '#fff',
    fontSize: christmasTheme.fontSizes.medium,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: christmasTheme.spacing.md,
    borderRadius: christmasTheme.borderRadius.medium,
  },
  rescanContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  rescanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: christmasTheme.colors.primary,
    paddingHorizontal: christmasTheme.spacing.xl,
    paddingVertical: christmasTheme.spacing.md,
    borderRadius: christmasTheme.borderRadius.medium,
    gap: christmasTheme.spacing.sm,
  },
  rescanText: {
    color: '#fff',
    fontSize: christmasTheme.fontSizes.medium,
    fontWeight: 'bold',
  },
  permissionText: {
    color: '#fff',
    fontSize: christmasTheme.fontSizes.medium,
    textAlign: 'center',
    marginVertical: christmasTheme.spacing.lg,
  },
  button: {
    backgroundColor: christmasTheme.colors.primary,
    paddingHorizontal: christmasTheme.spacing.xl,
    paddingVertical: christmasTheme.spacing.md,
    borderRadius: christmasTheme.borderRadius.medium,
    marginTop: christmasTheme.spacing.lg,
  },
  buttonText: {
    color: '#fff',
    fontSize: christmasTheme.fontSizes.medium,
    fontWeight: 'bold',
  },
});
