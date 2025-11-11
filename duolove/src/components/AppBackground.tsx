import React from 'react';
import { StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function AppBackground() {
  const { gradientColors, settings } = useTheme();

  // Si el usuario desactiva las animaciones, mostramos un gradiente
  if (!settings.animations) {
    return (
      <LinearGradient
        colors={gradientColors}
        style={StyleSheet.absoluteFill}
      />
    );
  }

  try {
    // ¡RUTA CORREGIDA! (../../ en lugar de ../)
    const videoSource = require('../../assets/videos/christmas_bg.mp4');

    return (
      <Video
        style={StyleSheet.absoluteFill}
        source={videoSource}
        resizeMode={ResizeMode.COVER}
        isLooping
        isMuted
        shouldPlay
      />
    );
  } catch (error) {
    // Fallback si el video no se encuentra
    console.warn(
      'Video de fondo no encontrado en assets/videos/christmas_bg.mp4. ' +
      'Mostrando gradiente de respaldo.'
    );
    return (
       <LinearGradient
        colors={gradientColors}
        style={StyleSheet.absoluteFill}
      />
    );
  }
}