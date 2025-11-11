// Configuración de la API
// IMPORTANTE: Si usas Android Emulator, usa 10.0.2.2
// Si usas dispositivo físico, cambia a la IP de tu computadora (ej: 192.168.1.42)

export const API_URL = 'http://192.168.1.8:4000'; // Dispositivo físico - IP de tu PC
// export const API_URL = 'http://10.0.2.2:4000'; // Android Emulator
// export const API_URL = 'http://localhost:4000'; // Web

export const API_ENDPOINTS = {
  REGISTER: `${API_URL}/register`,
  LOGIN: `${API_URL}/login`,
  PROFILE: `${API_URL}/profile`,
  UPLOAD_AVATAR: `${API_URL}/profile/upload-avatar`,
  ROOMS: `${API_URL}/rooms`,
  CREATE_ROOM: `${API_URL}/rooms/create`,
  JOIN_ROOM: `${API_URL}/rooms/join`,
  DRAWINGS: `${API_URL}/drawings`,
};
