import axios, { AxiosInstance, AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config/api';

export interface User {
  id: number;
  email: string;
  name: string;
  avatar: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message?: string;
}

export interface Room {
  id: number;
  code: string;
  name: string;
  owner_id: number;
  owner_name?: string;
  member_count?: number;
  created_at: string;
}

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para agregar token automáticamente
    this.api.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Interceptor para manejar errores
    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Token expirado o inválido
          await AsyncStorage.multiRemove(['token', 'user']);
        }
        return Promise.reject(error);
      }
    );
  }

  // ========== AUTENTICACIÓN ==========

  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/register', {
      email,
      password,
      name,
    });
    
    // Guardar token y usuario
    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    
    return response.data;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/login', {
      email,
      password,
    });
    
    // Guardar token y usuario
    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    
    return response.data;
  }

  async logout(): Promise<void> {
    await AsyncStorage.multiRemove(['token', 'user']);
  }

  async getCurrentUser(): Promise<User | null> {
    const userStr = await AsyncStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await AsyncStorage.getItem('token');
    return !!token;
  }

  // ========== PERFIL ==========

  async getProfile(): Promise<{ user: User }> {
    const response = await this.api.get('/profile');
    await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  }

  async updateProfile(name: string, avatar?: string): Promise<{ user: User }> {
    const response = await this.api.post('/profile', { name, avatar });
    await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  }

  async uploadAvatar(uri: string): Promise<{ avatar: string }> {
    const formData = new FormData();
    const filename = uri.split('/').pop() || 'avatar.jpg';
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : 'image/jpeg';

    formData.append('avatar', {
      uri,
      name: filename,
      type,
    } as any);

    const response = await this.api.post('/profile/upload-avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }

  // ========== SALAS ==========

  async createRoom(name?: string): Promise<{ id: number; code: string; qrCode: string }> {
    const response = await this.api.post('/rooms/create', { name });
    return response.data;
  }

  async joinRoom(code: string): Promise<{ room: Room }> {
    const response = await this.api.post('/rooms/join', { code });
    return response.data;
  }

  async getRooms(): Promise<{ rooms: Room[] }> {
    const response = await this.api.get('/rooms');
    return response.data;
  }

  async getRoomDetails(roomId: number): Promise<{ room: Room; members: User[] }> {
    const response = await this.api.get(`/rooms/${roomId}`);
    return response.data;
  }

  async getRoomQR(roomId: number): Promise<{ qrCode: string; code: string }> {
    const response = await this.api.get(`/rooms/${roomId}/qr`);
    return response.data;
  }

  // ========== DIBUJOS ==========

  async saveDrawing(roomId: number, drawingData: string): Promise<{ id: number }> {
    const response = await this.api.post('/drawings', {
      room_id: roomId,
      drawing_data: drawingData,
    });
    return response.data;
  }

  async getDrawings(roomId: number): Promise<{ drawings: any[] }> {
    const response = await this.api.get(`/drawings/${roomId}`);
    return response.data;
  }
}

export default new ApiService();
