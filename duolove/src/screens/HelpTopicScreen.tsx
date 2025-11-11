import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext'; // Importar hook

// Este componente recibe 'title' y 'content' por navegación
export default function HelpTopicScreen({ navigation, route }: any) {
  const { theme, gradientColors } = useTheme(); // Usar tema
  const { title, content } = route.params;

  return (
    <LinearGradient
      colors={gradientColors} // Fondo de gradiente
      style={styles.container}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: theme.spacing.xl + 20 }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>{title}</Text>
        {/* Espaciador para centrar el título */}
        <View style={{ width: 40 }} />
      </View>

      {/* Contenido */}
      <ScrollView
        style={[
          styles.contentContainer,
          { backgroundColor: theme.colors.backgroundLight }
        ]}
      >
        <Text style={[styles.contentText, { color: theme.colors.textDark }]}>
          {content}
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  contentContainer: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
  },
});