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
import { christmasTheme } from '../theme';

export default function HelpScreen({ navigation }: any) {
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

  const helpTopics = [
    {
      id: 'getting-started',
      icon: 'rocket',
      iconBg: '#3B82F6',
      title: 'Primeros Pasos',
      description: 'Aprende lo básico de DuoLove',
    },
    {
      id: 'rooms',
      icon: 'home',
      iconBg: '#8B5CF6',
      title: 'Gestión de Salas',
      description: 'Crear, unirse y administrar salas',
    },
    {
      id: 'whiteboard',
      icon: 'brush',
      iconBg: '#EC4899',
      title: 'Pizarra Interactiva',
      description: 'Cómo usar las herramientas de dibujo',
    },
    {
      id: 'profile',
      icon: 'person',
      iconBg: '#10B981',
      title: 'Perfil y Cuenta',
      description: 'Personalizar tu perfil',
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

  return (
    <LinearGradient
      colors={[christmasTheme.colors.gradientStart, christmasTheme.colors.gradientEnd]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={christmasTheme.colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Svg width={28} height={28} viewBox="0 0 100 100">
              {/* Question mark icon */}
              <Circle cx="50" cy="50" r="45" fill={christmasTheme.colors.text} />
              <Path
                d="M50 60 L50 65"
                stroke={christmasTheme.colors.primary}
                strokeWidth="8"
                strokeLinecap="round"
              />
              <Circle cx="50" cy="75" r="4" fill={christmasTheme.colors.primary} />
              <Path
                d="M35 35 Q35 20 50 20 Q65 20 65 35 Q65 45 50 50"
                stroke={christmasTheme.colors.primary}
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              />
            </Svg>
            <Text style={styles.headerTitle}>Ayuda</Text>
          </View>
        </View>

        <View style={styles.content}>
          {/* Welcome Card */}
          <View style={styles.welcomeCard}>
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
            <Text style={styles.welcomeTitle}>¿Cómo podemos ayudarte?</Text>
            <Text style={styles.welcomeText}>
              Encuentra respuestas a tus preguntas o contáctanos directamente
            </Text>
          </View>

          {/* Help Topics */}
          <Text style={styles.sectionTitle}>Temas de Ayuda</Text>
          {helpTopics.map((topic) => (
            <TouchableOpacity key={topic.id} style={styles.topicCard}>
              <View style={[styles.topicIcon, { backgroundColor: topic.iconBg + '20' }]}>
                <Ionicons name={topic.icon as any} size={24} color={topic.iconBg} />
              </View>
              <View style={styles.topicInfo}>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <Text style={styles.topicDescription}>{topic.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={christmasTheme.colors.textMuted} />
            </TouchableOpacity>
          ))}

          {/* FAQ Section */}
          <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Preguntas Frecuentes</Text>
          {faqItems.map((item, index) => (
            <View key={index} style={styles.faqCard}>
              <View style={styles.faqHeader}>
                <Ionicons name="help-circle" size={20} color={christmasTheme.colors.primary} />
                <Text style={styles.faqQuestion}>{item.question}</Text>
              </View>
              <Text style={styles.faqAnswer}>{item.answer}</Text>
            </View>
          ))}

          {/* Contact Support */}
          <View style={styles.contactSection}>
            <Text style={styles.contactTitle}>¿Aún necesitas ayuda?</Text>
            <Text style={styles.contactText}>Nuestro equipo está listo para asistirte</Text>

            <TouchableOpacity
              style={styles.contactButton}
              onPress={handleContactSupport}
            >
              <LinearGradient
                colors={[christmasTheme.colors.primary, christmasTheme.colors.secondary]}
                style={styles.contactGradient}
              >
                <Ionicons name="mail" size={20} color="#FFF" />
                <Text style={styles.contactButtonText}>Contactar Soporte</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.faqButton} onPress={handleOpenFAQ}>
              <Ionicons name="book" size={18} color={christmasTheme.colors.primary} />
              <Text style={styles.faqButtonText}>Ver FAQ Completo</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Info */}
          <View style={styles.footerInfo}>
            <View style={styles.footerRow}>
              <Svg width={18} height={18} viewBox="0 0 100 100">
                <Rect x="10" y="25" width="80" height="55" rx="8" fill="#6366F1" />
                <Path d="M10 30 L50 60 L90 30" stroke="#fff" strokeWidth="6" fill="none" />
              </Svg>
              <Text style={styles.footerText}>soporte@duolove.com</Text>
            </View>
            <View style={styles.footerRow}>
              <Svg width={18} height={18} viewBox="0 0 100 100">
                <Circle cx="50" cy="50" r="45" fill="#0EA5E9" />
                <Path d="M30 50 L50 30 L50 55 L65 55" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" />
              </Svg>
              <Text style={styles.footerText}>www.duolove.com</Text>
            </View>
            <View style={styles.footerRow}>
              <Ionicons name="time" size={18} color={christmasTheme.colors.textMuted} />
              <Text style={styles.footerText}>Horario: Lun-Vie 9AM-6PM</Text>
            </View>
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
    paddingTop: christmasTheme.spacing.xl + 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: christmasTheme.spacing.lg,
    paddingBottom: christmasTheme.spacing.lg,
  },
  backButton: {
    padding: christmasTheme.spacing.sm,
    marginRight: christmasTheme.spacing.sm,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: christmasTheme.spacing.sm,
  },
  headerTitle: {
    fontSize: christmasTheme.fontSizes.xxlarge,
    fontWeight: 'bold',
    color: christmasTheme.colors.text,
  },
  content: {
    flex: 1,
    backgroundColor: christmasTheme.colors.backgroundLight,
    borderTopLeftRadius: christmasTheme.borderRadius.xlarge,
    borderTopRightRadius: christmasTheme.borderRadius.xlarge,
    padding: christmasTheme.spacing.lg,
  },
  welcomeCard: {
    backgroundColor: christmasTheme.colors.card,
    borderRadius: christmasTheme.borderRadius.large,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    ...christmasTheme.shadows.medium,
  },
  welcomeTitle: {
    fontSize: christmasTheme.fontSizes.xlarge,
    fontWeight: '700',
    color: christmasTheme.colors.textDark,
    marginBottom: 8,
    marginTop: 12,
  },
  welcomeText: {
    fontSize: christmasTheme.fontSizes.small,
    color: christmasTheme.colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: christmasTheme.fontSizes.large,
    fontWeight: '700',
    color: christmasTheme.colors.textDark,
    marginBottom: christmasTheme.spacing.md,
  },
  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: christmasTheme.colors.card,
    borderRadius: christmasTheme.borderRadius.medium,
    padding: christmasTheme.spacing.md,
    marginBottom: christmasTheme.spacing.sm,
    ...christmasTheme.shadows.small,
  },
  topicIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: christmasTheme.spacing.md,
  },
  topicInfo: {
    flex: 1,
  },
  topicTitle: {
    fontSize: christmasTheme.fontSizes.medium,
    fontWeight: '600',
    color: christmasTheme.colors.textDark,
    marginBottom: 2,
  },
  topicDescription: {
    fontSize: christmasTheme.fontSizes.small,
    color: christmasTheme.colors.textMuted,
  },
  faqCard: {
    backgroundColor: christmasTheme.colors.card,
    borderRadius: christmasTheme.borderRadius.medium,
    padding: christmasTheme.spacing.md,
    marginBottom: christmasTheme.spacing.sm,
    ...christmasTheme.shadows.small,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  faqQuestion: {
    flex: 1,
    fontSize: christmasTheme.fontSizes.medium,
    fontWeight: '600',
    color: christmasTheme.colors.textDark,
  },
  faqAnswer: {
    fontSize: christmasTheme.fontSizes.small,
    color: christmasTheme.colors.textMuted,
    lineHeight: 20,
    paddingLeft: 28,
  },
  contactSection: {
    backgroundColor: christmasTheme.colors.primary + '10',
    borderRadius: christmasTheme.borderRadius.large,
    padding: 20,
    marginTop: 30,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: christmasTheme.fontSizes.large,
    fontWeight: '700',
    color: christmasTheme.colors.textDark,
    marginBottom: 8,
  },
  contactText: {
    fontSize: christmasTheme.fontSizes.small,
    color: christmasTheme.colors.textMuted,
    marginBottom: 20,
  },
  contactButton: {
    width: '100%',
    borderRadius: christmasTheme.borderRadius.medium,
    overflow: 'hidden',
    marginBottom: christmasTheme.spacing.sm,
    ...christmasTheme.shadows.medium,
  },
  contactGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: christmasTheme.spacing.md,
    gap: 8,
  },
  contactButtonText: {
    fontSize: christmasTheme.fontSizes.medium,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  faqButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: christmasTheme.spacing.sm,
  },
  faqButtonText: {
    fontSize: christmasTheme.fontSizes.small,
    fontWeight: '600',
    color: christmasTheme.colors.primary,
  },
  footerInfo: {
    alignItems: 'center',
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: christmasTheme.colors.textMuted + '30',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  footerText: {
    fontSize: christmasTheme.fontSizes.small,
    color: christmasTheme.colors.textMuted,
  },
});
