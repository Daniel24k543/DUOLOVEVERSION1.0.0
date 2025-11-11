import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import ApiService from './src/services/api';
import { christmasTheme } from './src/theme';

// Context Providers
import { ThemeProvider } from './src/context/ThemeContext';
import { NotificationProvider } from './src/context/NotificationContext';
import { PrivacyProvider } from './src/context/PrivacyContext';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import CreateRoomScreen from './src/screens/CreateRoomScreen';
import JoinRoomScreen from './src/screens/JoinRoomScreen';
import RoomScreen from './src/screens/RoomScreen';
import QRScannerScreen from './src/screens/QRScannerScreen';
import ThemeScreen from './src/screens/ThemeScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import PrivacyScreen from './src/screens/PrivacyScreen';
import HelpScreen from './src/screens/HelpScreen';
// --- Importa la nueva pantalla ---
import HelpTopicScreen from './src/screens/HelpTopicScreen'; 

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Navegación con tabs (Home + Perfil)
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: christmasTheme.colors.primary,
        tabBarInactiveTintColor: christmasTheme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: christmasTheme.colors.card,
          borderTopColor: christmasTheme.colors.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{ tabBarLabel: 'Inicio' }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen} 
        options={{ tabBarLabel: 'Perfil' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Cargar fuentes de Ionicons
    const loadFonts = async () => {
      await Font.loadAsync({
        ...Ionicons.font,
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  useEffect(() => {
    if (!fontsLoaded) return;

    // Splash navideño: 5 segundos
    const checkAuth = async () => {
      try {
        const authenticated = await ApiService.isAuthenticated();
        setIsAuthenticated(authenticated);
      } catch (error) {
        console.log('No se pudo conectar al backend, continuando sin autenticación');
        setIsAuthenticated(false);
      }
    };

    const timer = setTimeout(() => {
      checkAuth();
      setLoading(false);
    }, 5000); // 5 segundos

    return () => clearTimeout(timer);
  }, [fontsLoaded]);

  // Mostrar splash con la imagen navideña
  if (!fontsLoaded || loading) {
    return (
      <View style={styles.splashContainer}>
        <Image
          source={require('./assets/splash-duolove.jpg')}
          style={styles.splashImage}
          resizeMode="cover"
        />
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <>
      <ThemeProvider>
        <NotificationProvider>
          <PrivacyProvider>
            <NavigationContainer>
              <Stack.Navigator 
                initialRouteName={isAuthenticated ? "Main" : "Login"}
                screenOptions={{
                  headerShown: false,
                }}
              >
                {/* Pantallas de autenticación */}
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                
                {/* Pantallas principales con tabs */}
                <Stack.Screen name="Main" component={MainTabs} />
                
                {/* Pantallas adicionales */}
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="CreateRoom" component={CreateRoomScreen} />
                <Stack.Screen name="JoinRoom" component={JoinRoomScreen} />
                <Stack.Screen name="Room" component={RoomScreen} />
                <Stack.Screen name="QRScanner" component={QRScannerScreen} />
                
                {/* Pantallas de configuración */}
                <Stack.Screen name="Theme" component={ThemeScreen} />
                <Stack.Screen name="Notifications" component={NotificationsScreen} />
                <Stack.Screen name="Privacy" component={PrivacyScreen} />
                <Stack.Screen name="Help" component={HelpScreen} />
                
                {/* --- Añade la nueva pantalla --- */}
                <Stack.Screen name="HelpTopic" component={HelpTopicScreen} />
                
              </Stack.Navigator>
            </NavigationContainer>
          </PrivacyProvider>
        </NotificationProvider>
      </ThemeProvider>
      <StatusBar style="light" />
    </>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: christmasTheme.colors.background,
  },
  splashImage: {
    width: '100%',
    height: '100%',
  },
  splashBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashContent: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 40,
    borderRadius: 20,
  },
  splashEmoji: {
    fontSize: 80,
    marginVertical: 10,
  },
  splashTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: christmasTheme.colors.text,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 8,
  },
  splashSubtitle: {
    fontSize: 18,
    color: christmasTheme.colors.accent,
    marginBottom: 24,
  },
  loader: {
    marginTop: 20,
  },
});