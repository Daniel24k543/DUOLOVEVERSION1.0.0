import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import * as ImagePicker from 'expo-image-picker';
import { christmasTheme } from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CANVAS_HEIGHT = 500;

export default function RoomScreen({ navigation, route }: any) {
  const { room } = route.params;
  const [paths, setPaths] = useState<any[]>([]);
  const [currentPath, setCurrentPath] = useState<string>('');
  const [currentColor, setCurrentColor] = useState(christmasTheme.colors.textDark);
  const [currentThickness, setCurrentThickness] = useState(4);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  const colors = [
    christmasTheme.colors.textDark,
    christmasTheme.colors.primary,
    christmasTheme.colors.secondary,
    christmasTheme.colors.accent,
    '#0066FF',
    '#FF6B35',
    '#9B59B6',
    '#000000',
  ];

  const handleTouchStart = (event: any) => {
    const { locationX, locationY } = event.nativeEvent;
    setCurrentPath(`M ${locationX},${locationY}`);
  };

  const handleTouchMove = (event: any) => {
    const { locationX, locationY } = event.nativeEvent;
    setCurrentPath((prev) => `${prev} L ${locationX},${locationY}`);
  };

  const handleTouchEnd = () => {
    if (currentPath) {
      setPaths([
        ...paths,
        { path: currentPath, color: currentColor, thickness: currentThickness },
      ]);
      setCurrentPath('');
    }
  };

  const clearCanvas = () => {
    Alert.alert(
      'Limpiar pizarra',
      '¿Estás seguro que quieres borrar todo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí, borrar',
          style: 'destructive',
          onPress: () => {
            setPaths([]);
            setCurrentPath('');
          },
        },
      ]
    );
  };

  const undoLast = () => {
    if (paths.length > 0) {
      setPaths(paths.slice(0, -1));
    }
  };

  const pickBackgroundImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a tus fotos para establecer el fondo');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setBackgroundImage(result.assets[0].uri);
    }
  };

  const removeBackgroundImage = () => {
    Alert.alert(
      'Quitar fondo',
      '¿Deseas quitar la imagen de fondo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí, quitar',
          onPress: () => setBackgroundImage(null),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={christmasTheme.colors.textDark} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{room.name}</Text>
          <Text style={styles.headerSubtitle}>Código: {room.code}</Text>
        </View>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="menu" size={24} color={christmasTheme.colors.textDark} />
        </TouchableOpacity>
      </View>

      {/* Toolbar de colores */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.colorPicker}
        contentContainerStyle={styles.colorPickerContent}
      >
        {colors.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.colorButton,
              { backgroundColor: color },
              currentColor === color && styles.colorButtonActive,
            ]}
            onPress={() => setCurrentColor(color)}
          />
        ))}
      </ScrollView>

      {/* Control de grosor */}
      <View style={styles.thicknessControl}>
        <Text style={styles.thicknessLabel}>Grosor: {currentThickness}</Text>
        <View style={styles.thicknessButtons}>
          {[2, 4, 6, 8].map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.thicknessButton,
                currentThickness === size && styles.thicknessButtonActive,
              ]}
              onPress={() => setCurrentThickness(size)}
            >
              <View
                style={{
                  width: size * 2,
                  height: size * 2,
                  borderRadius: size,
                  backgroundColor: currentColor,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Canvas (Pizarra) */}
      <View style={styles.canvasContainer}>
        {backgroundImage && (
          <Image
            source={{ uri: backgroundImage }}
            style={styles.backgroundImage}
            resizeMode="cover"
          />
        )}
        <Svg
          height={CANVAS_HEIGHT}
          width={SCREEN_WIDTH - christmasTheme.spacing.lg * 2}
          style={styles.canvas}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {paths.map((item, index) => (
            <Path
              key={index}
              d={item.path}
              stroke={item.color}
              fill="none"
              strokeWidth={item.thickness}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          ))}
          {currentPath && (
            <Path
              d={currentPath}
              stroke={currentColor}
              fill="none"
              strokeWidth={currentThickness}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          )}
        </Svg>
      </View>

      {/* Botones de acción */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.imageButton]}
          onPress={pickBackgroundImage}
        >
          <Ionicons name="image" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>+ Pizarra</Text>
        </TouchableOpacity>

        {backgroundImage && (
          <TouchableOpacity
            style={[styles.actionButton, styles.removeImageButton]}
            onPress={removeBackgroundImage}
          >
            <Ionicons name="close-circle" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Quitar</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.actionButton, styles.undoButton]}
          onPress={undoLast}
          disabled={paths.length === 0}
        >
          <Ionicons name="arrow-undo" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Deshacer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.clearButton]}
          onPress={clearCanvas}
        >
          <Ionicons name="trash" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Limpiar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: christmasTheme.colors.backgroundLight,
    paddingTop: christmasTheme.spacing.xl + 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: christmasTheme.spacing.lg,
    paddingVertical: christmasTheme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: christmasTheme.colors.border,
  },
  headerButton: {
    padding: christmasTheme.spacing.sm,
  },
  headerInfo: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: christmasTheme.fontSizes.large,
    fontWeight: 'bold',
    color: christmasTheme.colors.textDark,
  },
  headerSubtitle: {
    fontSize: christmasTheme.fontSizes.small,
    color: christmasTheme.colors.textMuted,
  },
  colorPicker: {
    maxHeight: 60,
    borderBottomWidth: 1,
    borderBottomColor: christmasTheme.colors.border,
  },
  colorPickerContent: {
    paddingHorizontal: christmasTheme.spacing.lg,
    paddingVertical: christmasTheme.spacing.sm,
    gap: christmasTheme.spacing.sm,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorButtonActive: {
    borderColor: christmasTheme.colors.textDark,
    transform: [{ scale: 1.1 }],
  },
  thicknessControl: {
    paddingHorizontal: christmasTheme.spacing.lg,
    paddingVertical: christmasTheme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: christmasTheme.colors.border,
  },
  thicknessLabel: {
    fontSize: christmasTheme.fontSizes.small,
    color: christmasTheme.colors.textMuted,
    marginBottom: christmasTheme.spacing.sm,
  },
  thicknessButtons: {
    flexDirection: 'row',
    gap: christmasTheme.spacing.md,
  },
  thicknessButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: christmasTheme.borderRadius.small,
    backgroundColor: christmasTheme.colors.card,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thicknessButtonActive: {
    borderColor: christmasTheme.colors.primary,
  },
  canvasContainer: {
    flex: 1,
    margin: christmasTheme.spacing.lg,
    backgroundColor: '#FFFFFF',
    borderRadius: christmasTheme.borderRadius.medium,
    ...christmasTheme.shadows.medium,
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  canvas: {
    backgroundColor: 'transparent',
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: christmasTheme.spacing.lg,
    paddingBottom: christmasTheme.spacing.lg,
    gap: christmasTheme.spacing.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: christmasTheme.spacing.md,
    borderRadius: christmasTheme.borderRadius.medium,
    gap: christmasTheme.spacing.xs,
  },
  imageButton: {
    backgroundColor: '#0066FF',
  },
  removeImageButton: {
    backgroundColor: '#FF6B35',
  },
  undoButton: {
    backgroundColor: christmasTheme.colors.textMuted,
  },
  clearButton: {
    backgroundColor: christmasTheme.colors.error,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: christmasTheme.fontSizes.medium,
    fontWeight: 'bold',
  },
});
