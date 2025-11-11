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
import { useFocusEffect } from '@react-navigation/native';
import ApiService, { Room } from '../services/api';
import { christmasTheme } from '../theme';

export default function HomeScreen({ navigation }: any) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadRooms = async () => {
    try {
      const response = await ApiService.getRooms();
      setRooms(response.rooms);
    } catch (error: any) {
      console.error('Error cargando salas:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadRooms();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadRooms();
    setRefreshing(false);
  };

  const handleRoomPress = (room: Room) => {
    navigation.navigate('Room', { room });
  };

  const renderRoom = ({ item }: { item: Room }) => (
    <TouchableOpacity
      style={styles.roomCard}
      onPress={() => handleRoomPress(item)}
    >
      <View style={styles.roomIcon}>
        <Ionicons name="heart" size={24} color={christmasTheme.colors.primary} />
      </View>
      <View style={styles.roomInfo}>
        <Text style={styles.roomName}>{item.name}</Text>
        <Text style={styles.roomCode}>Código: {item.code}</Text>
        <Text style={styles.roomMembers}>
          👥 {item.member_count || 1} {(item.member_count || 1) === 1 ? 'miembro' : 'miembros'}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color={christmasTheme.colors.textMuted} />
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={[christmasTheme.colors.gradientStart, christmasTheme.colors.gradientEnd]}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎄 DuoLove</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-outline" size={24} color={christmasTheme.colors.text} />
        </TouchableOpacity>
      </View>

      {/* Botones de acción */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.createButton]}
          onPress={() => navigation.navigate('CreateRoom')}
        >
          <Ionicons name="add-circle" size={28} color="#fff" />
          <Text style={styles.actionButtonText}>Crear Sala</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.joinButton]}
          onPress={() => navigation.navigate('JoinRoom')}
        >
          <Ionicons name="enter" size={28} color="#fff" />
          <Text style={styles.actionButtonText}>Unir Sala</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de salas */}
      <View style={styles.roomsContainer}>
        <Text style={styles.sectionTitle}>Mis Salas</Text>
        
        {rooms.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>💕</Text>
            <Text style={styles.emptyText}>No tienes salas todavía</Text>
            <Text style={styles.emptySubtext}>Crea una sala o únete usando un código</Text>
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
                tintColor={christmasTheme.colors.accent}
              />
            }
          />
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: christmasTheme.spacing.lg,
    paddingTop: christmasTheme.spacing.xl + 20,
    paddingBottom: christmasTheme.spacing.md,
  },
  headerTitle: {
    fontSize: christmasTheme.fontSizes.xxlarge,
    fontWeight: 'bold',
    color: christmasTheme.colors.text,
  },
  settingsButton: {
    padding: christmasTheme.spacing.sm,
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: christmasTheme.spacing.lg,
    marginBottom: christmasTheme.spacing.lg,
    gap: christmasTheme.spacing.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: christmasTheme.spacing.md,
    borderRadius: christmasTheme.borderRadius.medium,
    gap: christmasTheme.spacing.sm,
    ...christmasTheme.shadows.medium,
  },
  createButton: {
    backgroundColor: christmasTheme.colors.primary,
  },
  joinButton: {
    backgroundColor: christmasTheme.colors.secondary,
  },
  actionButtonText: {
    color: christmasTheme.colors.text,
    fontSize: christmasTheme.fontSizes.medium,
    fontWeight: 'bold',
  },
  roomsContainer: {
    flex: 1,
    backgroundColor: christmasTheme.colors.backgroundLight,
    borderTopLeftRadius: christmasTheme.borderRadius.xlarge,
    borderTopRightRadius: christmasTheme.borderRadius.xlarge,
    paddingTop: christmasTheme.spacing.lg,
  },
  sectionTitle: {
    fontSize: christmasTheme.fontSizes.large,
    fontWeight: 'bold',
    color: christmasTheme.colors.textDark,
    paddingHorizontal: christmasTheme.spacing.lg,
    marginBottom: christmasTheme.spacing.md,
  },
  roomsList: {
    paddingHorizontal: christmasTheme.spacing.lg,
  },
  roomCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: christmasTheme.colors.card,
    borderRadius: christmasTheme.borderRadius.medium,
    padding: christmasTheme.spacing.md,
    marginBottom: christmasTheme.spacing.md,
    ...christmasTheme.shadows.small,
  },
  roomIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: christmasTheme.colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: christmasTheme.spacing.md,
  },
  roomInfo: {
    flex: 1,
  },
  roomName: {
    fontSize: christmasTheme.fontSizes.large,
    fontWeight: 'bold',
    color: christmasTheme.colors.textDark,
    marginBottom: 4,
  },
  roomCode: {
    fontSize: christmasTheme.fontSizes.small,
    color: christmasTheme.colors.textMuted,
    marginBottom: 2,
  },
  roomMembers: {
    fontSize: christmasTheme.fontSizes.small,
    color: christmasTheme.colors.textMuted,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: christmasTheme.spacing.xxl,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: christmasTheme.spacing.md,
  },
  emptyText: {
    fontSize: christmasTheme.fontSizes.large,
    fontWeight: 'bold',
    color: christmasTheme.colors.textDark,
    marginBottom: christmasTheme.spacing.xs,
  },
  emptySubtext: {
    fontSize: christmasTheme.fontSizes.medium,
    color: christmasTheme.colors.textMuted,
    textAlign: 'center',
  },
});
