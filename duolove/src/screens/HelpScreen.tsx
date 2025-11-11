import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext'; // <-- USAR HOOK

export default function HelpScreen({ navigation }: any) {
  const { theme, gradientColors } = useTheme(); // <-- Usar tema

  const faqItems = [
    {
      question: '¿Cómo crear una sala?',
      answer: 'Ve a la pantalla principal y toca "Crear Sala". Se generará un código único que puedes compartir con tu pareja.',
    },
    {
      question: '¿Cómo unirse a una sala?',
      answer: 'Toca "Unirse a Sala" e ingresa el código que te compartió tu pareja, o escanea el código QR desde Ajustes.',
    },
    {
      question: '¿Cómo usar la pizarra?',
      answer: 'Dentro de una sala, dibuja con tu dedo. Puedes cambiar colores, grosor, deshacer y limpiar todo.',
    },
    {
      question: '¿Puedo agregar fotos de fondo?',
      answer: 'Sí! En la sala, toca "+ Pizarra" para agregar una foto de fondo a la pizarra.',
    },
    {
      question: '¿Cómo escanear un código QR?',
      answer: 'Ve a Ajustes → Escanear código QR. Apunta a un código QR de sala para unirte automáticamente.',
    },
  ];

  // Descripciones completas para la nueva pantalla
  const helpTopics = [
    {
      id: 'getting-started',
      icon: 'rocket',
      iconBg: '#3B82F6',
      title: 'Primeros Pasos',
      description: 'Aprende lo básico de DuoLove: cómo registrarte, iniciar sesión y configurar tu perfil.',
    },
    {
      id: 'rooms',
      icon: 'home',
      iconBg: '#8B5CF6',
      title: 'Gestión de Salas',
      description: 'Descubre cómo crear una sala, unirte a una existente usando un código o QR, e invitar a tu pareja.',
    },
    {
      id: 'whiteboard',
      icon: 'brush',
      iconBg: '#EC4899',
      title: 'Pizarra Interactiva',
      description: 'Domina la pizarra: cambia colores, grosores, añade fotos de fondo, borra y deshace trazos.',
    },
    {
      id: 'profile',
      icon: 'person',
      iconBg: '#10B981',
      title: 'Perfil y Cuenta',
      description: 'Personaliza tu perfil, cambia tu foto, y aprende a gestionar la configuración de tu cuenta.',
    },
  ];

  const handleContactSupport = () => {
    const email = 'soporte@duolove.com';
    const subject = 'Soporte DuoLove - Ayuda Necesaria';
    const body = 'Hola equipo de DuoLove,\n\nNecesito ayuda con:\n\n';
    
    Linking.openURL(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
      .catch(() => {
        Alert.alert(
          'No se pudo abrir el email',
          'Por favor, envía un correo manualmente a: soporte@duolove.com',
          [{ text: 'OK' }]
        );
      });
  };

  const handleOpenFAQ = () => {
    Linking.openURL('https://duolove.com/faq')
      .catch(() => {
        Alert.alert(
          'No se pudo abrir el navegador',
          'Por favor, visita manualmente: https://duolove.com/faq',
          [{ text: 'OK' }]
        );
      });
  };

  // --- FUNCIÓN MODIFICADA ---
  const handleTopicPress = (topic: typeof helpTopics[0]) => {
    // Navega a la nueva pantalla en lugar de mostrar alerta
    navigation.navigate('HelpTopic', {
      title: topic.title,
      content: topic.description,
    });
  };

  return (
    <LinearGradient
      colors={gradientColors} // <-- USAR GRADIENTE DE TEMA
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Svg width={28} height={28} viewBox="0 0 100 100">
              {/* Question mark icon */}
              <Circle cx="50" cy="50" r="45" fill={theme.colors.text} />
              <Path
                d="M50 60 L50 65"
                stroke={theme.colors.gradientEnd} // <-- USAR TEMA
                strokeWidth="8"
                strokeLinecap="round"
              />
              <Circle cx="50" cy="75" r="4" fill={theme.colors.gradientEnd} />
              <Path
                d="M35 35 Q35 20 50 20 Q65 20 65 35 Q65 45 50 50"
                stroke={theme.colors.gradientEnd} // <-- USAR TEMA
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              />
            </Svg>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Ayuda</Text>
          </View>
        </View>

        <View style={[styles.content, { backgroundColor: theme.colors.backgroundLight }]}>
          {/* Welcome Card */}
          <View style={[styles.welcomeCard, { backgroundColor: theme.colors.card, ...theme.shadows.medium }]}>
            <Svg width={60} height={60} viewBox="0 0 100 100">
              <Path
                d="M50 10 L70 35 L65 35 L80 55 L75 55 L90 75 L10 75 L25 55 L20 55 L35 35 L30 35 Z"
                fill="#165B33"
              />
              <Rect x="45" y="75" width="10" height="15" fill="#8B4513" />
              <Circle cx="50" cy="12" r="5" fill="#FFD700" />
              <Circle cx="40" cy="40" r="3" fill="#C41E3A" />
              <Circle cx="60" cy="45" r="3" fill="#FFD700" />
            </Svg>
            <Text style={[styles.welcomeTitle, { color: theme.colors.textDark }]}>¿Cómo podemos ayudarte?</Text>
            <Text style={[styles.welcomeText, { color: theme.colors.textMuted }]}>
              Encuentra respuestas a tus preguntas o contáctanos directamente
            </Text>
          </View>

          {/* Help Topics */}
          <Text style={[styles.sectionTitle, { color: theme.colors.textDark }]}>Temas de Ayuda</Text>
          {helpTopics.map((topic) => (
            <TouchableOpacity 
              key={topic.id} 
              style={[styles.topicCard, { backgroundColor: theme.colors.card, ...theme.shadows.small }]}
              onPress={() => handleTopicPress(topic)} // <-- USA LA NUEVA FUNCIÓN
            >
              <View style={[styles.topicIcon, { backgroundColor: topic.iconBg + '20' }]}>
                <Ionicons name={topic.icon as any} size={24} color={topic.iconBg} />
              </View>
              <View style={styles.topicInfo}>
                <Text style={[styles.topicTitle, { color: theme.colors.textDark }]}>{topic.title}</Text>
                {/* Cortamos la descripción aquí ya que se verá en otra pantalla */}
                <Text style={[styles.topicDescription, { color: theme.colors.textMuted }]}>
                  {topic.description.substring(0, 40)}...
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={theme.colors.textMuted} />
            </TouchableOpacity>
          ))}

          {/* --- SECCIÓN DE FAQ (LA QUE FALTABA) --- */}
          <Text style={[styles.sectionTitle, { marginTop: 30, color: theme.colors.textDark }]}>Preguntas Frecuentes</Text>
          {faqItems.map((item, index) => (
            <View key={index} style={[styles.faqCard, { backgroundColor: theme.colors.card, ...theme.shadows.small }]}>
              <View style={styles.faqHeader}>
                <Ionicons name="help-circle" size={20} color={theme.colors.primary} />
                <Text style={[styles.faqQuestion, { color: theme.colors.textDark }]}>{item.question}</Text>
              </View>
              <Text style={[styles.faqAnswer, { color: theme.colors.textMuted }]}>{item.answer}</Text>
            </View>
          ))}

          {/* Contact Support */}
          <View style={[styles.contactSection, { backgroundColor: theme.colors.primary + '10' }]}>
            <Text style={[styles.contactTitle, { color: theme.colors.textDark }]}>¿Aún necesitas ayuda?</Text>
            <Text style={[styles.contactText, { color: theme.colors.textMuted }]}>Nuestro equipo está listo para asistirte</Text>

            <TouchableOpacity
              style={[styles.contactButton, { ...theme.shadows.medium }]}
              onPress={handleContactSupport}
            >
              <LinearGradient
                colors={[theme.colors.primary, theme.colors.secondary]}
                style={styles.contactGradient}
              >
                <Ionicons name="mail" size={20} color="#FFF" />
                <Text style={styles.contactButtonText}>Contactar Soporte</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.faqButton} onPress={handleOpenFAQ}>
              <Ionicons name="book" size={18} color={theme.colors.primary} />
              <Text style={[styles.faqButtonText, { color: theme.colors.primary }]}>Ver FAQ Completo</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Info */}
          <View style={[styles.footerInfo, { borderTopColor: theme.colors.textMuted + '30' }]}>
            <View style={styles.footerRow}>
              <Svg width={18} height={18} viewBox="0 0 100 100">
                <Rect x="10" y="25" width="80" height="55" rx="8" fill="#6366F1" />
                <Path d="M10 30 L50 60 L90 30" stroke="#fff" strokeWidth="6" fill="none" />
              </Svg>
              <Text style={[styles.footerText, { color: theme.colors.textMuted }]}>soporte@duolove.com</Text>
            </View>
            <View style={styles.footerRow}>
              <Svg width={18} height={18} viewBox="0 0 100 100">
                <Circle cx="50" cy="50" r="45" fill="#0EA5E9" />
                <Path d="M30 50 L50 30 L50 55 L65 55" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" />
              </Svg>
              <Text style={[styles.footerText, { color: theme.colors.textMuted }]}>www.duolove.com</Text>
            </View>
            <View style={styles.footerRow}>
              <Ionicons name="time" size={18} color={theme.colors.textMuted} />
              <Text style={[styles.footerText, { color: theme.colors.textMuted }]}>Horario: Lun-Vie 9AM-6PM</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

// Estilos (sin 'christmasTheme')
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 52, // 32 + 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  welcomeCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 12,
  },
  welcomeText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  topicIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  topicInfo: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  topicDescription: {
    fontSize: 12,
  },
  faqCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  faqAnswer: {
    fontSize: 12,
    lineHeight: 20,
    paddingLeft: 28,
  },
  contactSection: {
    borderRadius: 16,
    padding: 20,
    marginTop: 30,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 12,
    marginBottom: 20,
  },
  contactButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
  },
  contactGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  faqButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  faqButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  footerInfo: {
    alignItems: 'center',
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  footerText: {
    fontSize: 12,
  },
});