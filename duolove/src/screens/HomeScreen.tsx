import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { useFocusEffect } from '@react-navigation/native';
import ApiService, { Room } from '../services/api';
// IMPORTA EL HOOK
import { useTheme } from '../context/ThemeContext'; 

export default function HomeScreen({ navigation }: any) {
  // USA EL HOOK
  const { theme, gradientColors } = useTheme();

  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // ... (el resto de tu lógica de loadRooms, onRefresh, handleRoomPress) ...
  const loadRooms = async () => { /* ... */ };
  const onRefresh = async () => { /* ... */ };
  const handleRoomPress = (room: Room) => { /* ... */ };


  const renderRoom = ({ item }: { item: Room }) => (
    // Reemplaza 'christmasTheme' con 'theme'
    <TouchableOpacity
      style={[styles.roomCard, { backgroundColor: theme.colors.card, ...theme.shadows.small }]}
      onPress={() => handleRoomPress(item)}
    >
      <View style={[styles.roomIcon, { backgroundColor: theme.colors.backgroundLight }]}>
        <Ionicons name="heart" size={24} color={theme.colors.primary} />
      </View>
      <View style={styles.roomInfo}>
        <Text style={[styles.roomName, { color: theme.colors.textDark }]}>{item.name}</Text>
        <Text style={[styles.roomCode, { color: theme.colors.textMuted }]}>Código: {item.code}</Text>
        <View style={styles.roomMembersContainer}>
          <Svg width={16} height={16} viewBox="0 0 100 100">
            {/* ... svg ... */}
             <Circle cx="35" cy="30" r="15" fill={theme.colors.primary} />
            <Path
              d="M10 100 Q10 60 35 60 Q60 60 60 100"
              fill={theme.colors.primary}
            />
            <Circle cx="65" cy="35" r="13" fill={theme.colors.accent} />
            <Path
              d="M42 100 Q42 65 65 65 Q88 65 88 100"
              fill={theme.colors.accent}
            />
          </Svg>
          <Text style={[styles.roomMembers, { color: theme.colors.textMuted }]}>
            {item.member_count || 1} {(item.member_count || 1) === 1 ? 'miembro' : 'miembros'}
          </Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={24} color={theme.colors.textMuted} />
    </TouchableOpacity>
  );

  return (
    // USA LOS COLORES DEL GRADIENTE DEL CONTEXTO
    <LinearGradient
      colors={gradientColors}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          {/* ... svg ... */}
          <Svg width={28} height={28} viewBox="0 0 100 100">
             {/* ... */}
          </Svg>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>DuoLove</Text>
        </View>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-outline" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      {/* Botones de acción */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.createButton, { backgroundColor: theme.colors.primary, ...theme.shadows.medium }]}
          onPress={() => navigation.navigate('CreateRoom')}
        >
          <Ionicons name="add-circle" size={28} color="#fff" />
          <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>Crear Sala</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.joinButton, { backgroundColor: theme.colors.secondary, ...theme.shadows.medium }]}
          onPress={() => navigation.navigate('JoinRoom')}
        >
          <Ionicons name="enter" size={28} color="#fff" />
          <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>Unir Sala</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de salas */}
      <View style={[styles.roomsContainer, { backgroundColor: theme.colors.backgroundLight }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textDark }]}>Mis Salas</Text>
        
        {rooms.length === 0 ? (
          <View style={styles.emptyState}>
            {/* ... svg ... */}
            <Text style={[styles.emptyText, { color: theme.colors.textDark }]}>No tienes salas todavía</Text>
            <Text style={[styles.emptySubtext, { color: theme.colors.textMuted }]}>Crea una sala o únete usando un código</Text>
          </View>
        ) : (
          <FlatList
            data={rooms}
            renderItem={renderRoom}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.roomsList}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={theme.colors.accent}
              />
            }
          />
        )}
      </View>
    </LinearGradient>
  );
}

// Actualiza los estilos para que usen 'theme' donde sea necesario
// (Muchos estilos ya están bien, pero los que usan colores de 'christmasTheme' deben cambiar)
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24, // Usa valores fijos si no dependen del tema
    paddingTop: 52, // 32 + 20
    paddingBottom: 16,
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
  settingsButton: {
    padding: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  createButton: {
    // backgroundColor se aplica dinámicamente
  },
  joinButton: {
    // backgroundColor se aplica dinámicamente
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  roomsContainer: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  roomsList: {
    paddingHorizontal: 24,
  },
  roomCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  roomIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  roomInfo: {
    flex: 1,
  },
  roomName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  roomCode: {
    fontSize: 12,
    marginBottom: 4,
  },
  roomMembersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  roomMembers: {
    fontSize: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 16,
    textAlign: 'center',
  },
});