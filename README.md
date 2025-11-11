# 🎄 DuoLove - Aplicación Navideña para Parejas

Una aplicación imprescindible para parejas con tema navideño, pizarra compartida y salas privadas.

## 🚀 Inicio Rápido

### Pre-requisitos
- Node.js 16+ ([Descargar aquí](https://nodejs.org/))
- Git (opcional)
- Para Android: Android Studio + Emulador o Expo Go en tu teléfono

### 📦 Instalación

#### 1. Backend (Node + Express + SQLite)
```powershell
cd backend
npm install
npm run dev
```

El backend estará corriendo en `http://localhost:4000`

#### 2. Frontend (Expo - React Native)
```powershell
cd duolove
npm install
npm start
```

- Para **Android Emulator**: Presiona `a` en la terminal
- Para **Dispositivo físico**: Escanea el QR con Expo Go
- Para **Web**: Presiona `w` en la terminal

## 🎨 Características

- ✨ Splash navideño animado (4-6 segundos)
- 🔐 Login/Registro con backend local (sin Google Cloud)
- 👤 Perfil editable con foto
- 🏠 Pantalla principal con navegación inferior
- 🎨 Pizarra compartida para dibujar juntos
- 🔑 Salas privadas con código único
- 📱 QR opcional para unirse rápidamente
- ⚙️ Ajustes personalizables
- 🎄 Tema navideño completo

## 🛠️ Tecnologías

- **Frontend**: Expo (React Native) + TypeScript
- **Backend**: Node.js + Express + SQLite
- **Autenticación**: JWT
- **Storage**: AsyncStorage (móvil), SQLite (servidor)

## 📱 Pantallas

1. **Splash** - Pantalla de bienvenida navideña
2. **Login/Registro** - Autenticación sin términos y condiciones
3. **Home** - Pantalla principal con opciones de sala
4. **Pizarra** - Área de dibujo compartida
5. **Perfil** - Editar nombre, foto y preferencias
6. **Ajustes** - Configuración de la app

## 🔧 Configuración

### Backend (.env)
Crea un archivo `backend/.env`:
```
JWT_SECRET=tu_clave_secreta_cambiala_por_una_real
PORT=4000
```

### Frontend (IP del servidor)
Si usas un dispositivo físico, cambia la IP en `duolove/src/config/api.ts` a la IP de tu computadora:
```typescript
export const API_URL = 'http://TU_IP_LOCAL:4000';
```

## 📝 Estructura del Proyecto

```
DuoLove/
├── backend/              # Servidor Node + Express
│   ├── server.js        # Punto de entrada
│   ├── duolove.db       # Base de datos SQLite (auto-generada)
│   └── package.json
├── duolove/             # App móvil Expo
│   ├── App.tsx          # Componente principal
│   ├── src/
│   │   ├── screens/     # Pantallas
│   │   ├── components/  # Componentes reutilizables
│   │   ├── config/      # Configuración
│   │   └── theme/       # Tema navideño
│   └── assets/          # Imágenes y recursos
└── README.md
```

## 🎯 Próximos Pasos

- [ ] WebSockets para pizarra en tiempo real
- [ ] Notificaciones push
- [ ] Chat de texto
- [ ] Galería de dibujos guardados
- [ ] Personalización de temas

## 📄 Licencia

Proyecto personal - DuoLove © 2025
