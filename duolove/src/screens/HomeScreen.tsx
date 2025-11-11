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
        <View style={styles.roomMembersContainer}>
          <Svg width={16} height={16} viewBox="0 0 100 100">
            {/* Two people icon */}
            <Circle cx="35" cy="30" r="15" fill={christmasTheme.colors.primary} />
            <Path
              d="M10 100 Q10 60 35 60 Q60 60 60 100"
              fill={christmasTheme.colors.primary}
            />
            <Circle cx="65" cy="35" r="13" fill={christmasTheme.colors.accent} />
            <Path
              d="M42 100 Q42 65 65 65 Q88 65 88 100"
              fill={christmasTheme.colors.accent}
            />
          </Svg>
          <Text style={styles.roomMembers}>
            {item.member_count || 1} {(item.member_count || 1) === 1 ? 'miembro' : 'miembros'}
          </Text>
        </View>
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
        <View style={styles.headerTitleContainer}>
          <Svg width={28} height={28} viewBox="0 0 100 100">
            {/* Christmas tree */}
            <Path
              d="M50 10 L70 35 L65 35 L80 55 L75 55 L90 75 L10 75 L25 55 L20 55 L35 35 L30 35 Z"
              fill="#165B33"
            />
            <Rect x="45" y="75" width="10" height="15" fill="#8B4513" />
            <Circle cx="50" cy="12" r="5" fill="#FFD700" />
            <Circle cx="40" cy="40" r="3" fill="#C41E3A" />
            <Circle cx="60" cy="45" r="3" fill="#FFD700" />
            <Circle cx="45" cy="60" r="3" fill="#4A90E2" />
            <Circle cx="55" cy="65" r="3" fill="#C41E3A" />
          </Svg>
          <Text style={styles.headerTitle}>DuoLove</Text>
        </View>
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
            <Svg width={80} height={80} viewBox="0 0 100 100">
              {/* Heart icon */}
              <Path
                d="M50 90 L20 60 Q10 50 10 35 Q10 20 25 20 Q35 20 50 35 Q65 20 75 20 Q90 20 90 35 Q90 50 80 60 Z"
                fill="#FF6B9D"
              />
              <Path
                d="M30 30 Q25 30 25 35 Q25 40 30 45"
                fill="#FFC0E0"
              />
            </Svg>
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
    marginBottom: 4,
  },
  roomMembersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
