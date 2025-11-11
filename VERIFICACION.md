# 🧪 DuoLove - Verificación y Pruebas

## ✅ Checklist de Verificación

Sigue estos pasos para asegurarte de que todo funciona:

### 1. Backend Funcionando

```powershell
# Terminal 1
cd C:\Users\magis\Documents\DuoLove\backend
npm run dev
```

**Resultado esperado**:
```
🎄✨ DuoLove Backend corriendo en http://localhost:4000 ✨🎄
✅ Base de datos inicializada correctamente
```

**Probar API**:
```powershell
# En otra terminal (PowerShell):
curl http://localhost:4000
```

Deberías ver:
```json
{"message":"🎄 DuoLove Backend API","version":"1.0.0","status":"running"}
```

---

### 2. Frontend Iniciando

```powershell
# Terminal 2
cd C:\Users\magis\Documents\DuoLove\duolove
npm start
```

**Resultado esperado**:
- Se abre una página web en http://localhost:8081
- Ves un QR code
- Opciones para presionar `a` (Android), `w` (Web), etc.

---

### 3. Ejecutar en Web (más rápido para probar)

En la terminal de Expo, presiona **`w`**

**Resultado esperado**:
- Se abre http://localhost:8081 en navegador
- Ves splash navideño 4.5 segundos
- Aparece pantalla de Login

---

### 4. Probar Flujo Completo

#### A. Registro
1. Click en "Regístrate"
2. Ingresa:
   - Nombre: `Usuario 1`
   - Email: `user1@duolove.com`
   - Contraseña: `123456`
   - Confirmar: `123456`
3. Click "Registrarse"

**✅ Éxito**: Entras a pantalla Home

#### B. Crear Sala
1. En Home, click "Crear Sala"
2. Ingresa nombre: `Sala de Prueba`
3. Click "Crear Sala"

**✅ Éxito**: Ves código (ej: `ABC12345`) y QR

4. **Copia el código** (lo necesitarás)
5. Click "Ir a mis salas"

#### C. Ver Sala en Lista
**✅ Éxito**: Ves "Sala de Prueba" en la lista de salas

#### D. Abrir Pizarra
1. Click en "Sala de Prueba"

**✅ Éxito**: 
- Ves pizarra blanca grande
- Selector de colores arriba
- Selector de grosor
- Botones Deshacer/Limpiar

2. Dibuja algo con el mouse/dedo
3. Cambia color y grosor
4. Click "Deshacer"
5. Click "Limpiar" → Confirmar

**✅ Éxito**: Todo funciona

#### E. Perfil
1. Ve al tab "Perfil" (abajo)

**✅ Éxito**: Ves tu nombre, email, botón de foto

2. Click en la foto → Seleccionar imagen (si tienes)
3. Click "Ajustes"

**✅ Éxito**: Ves opciones de ajustes

#### F. Segundo Usuario (Unirse a Sala)
1. Click "Cerrar sesión"
2. Registra otro usuario: `user2@duolove.com`
3. En Home, click "Unir Sala"
4. Ingresa el código que copiaste antes
5. Click "Unirse a la Sala"

**✅ Éxito**: "Te has unido a la sala correctamente"

---

## 🔍 Verificar Base de Datos

```powershell
cd C:\Users\magis\Documents\DuoLove\backend

# Verificar que existe
Test-Path duolove.db
# Debería mostrar: True

# Ver tamaño (debería ser > 0)
(Get-Item duolove.db).Length
```

Para inspeccionar contenido (requiere sqlite3):
```powershell
sqlite3 duolove.db
```

Dentro de sqlite:
```sql
.tables
-- Deberías ver: drawings  room_members  rooms  users

SELECT COUNT(*) FROM users;
-- Debería mostrar: 2 (o el número de usuarios que registraste)

SELECT email, name FROM users;
-- Verás la lista de usuarios

SELECT code, name FROM rooms;
-- Verás las salas creadas

.quit
```

---

## 🌐 Probar en Android Emulator

### Requisitos:
- Android Studio instalado
- AVD (emulador) creado

### Pasos:
1. Abre Android Studio
2. Tools → Device Manager
3. Play en un dispositivo virtual
4. En terminal de Expo, presiona **`a`**

**✅ Éxito**: La app se instala y abre en el emulador

**Nota**: Si el backend no conecta, el problema es la URL. En `duolove/src/config/api.ts` debe decir:
```typescript
export const API_URL = 'http://10.0.2.2:4000'; // Para Android Emulator
```

---

## 📱 Probar en Teléfono Real

### Requisitos:
- Expo Go instalado en tu teléfono
- Estar en la misma red WiFi que tu PC

### Pasos:

1. **Obtén la IP de tu PC**:
```powershell
ipconfig
```
Busca "IPv4 Address" (ej: `192.168.1.42`)

2. **Actualiza la configuración**:

Edita `duolove/src/config/api.ts`:
```typescript
export const API_URL = 'http://192.168.1.42:4000'; // Tu IP
```

3. **Reinicia Expo**:
```powershell
# Ctrl+C para detener
npm start
```

4. **Escanea QR con Expo Go**

**✅ Éxito**: La app se carga en tu teléfono

---

## 🐛 Problemas Comunes y Soluciones

### Error: "Cannot connect to backend"

**Diagnóstico**:
```powershell
# ¿El backend está corriendo?
curl http://localhost:4000
```

Si no responde:
```powershell
cd C:\Users\magis\Documents\DuoLove\backend
npm run dev
```

### Error: "Port 4000 is already in use"

**Solución**:
```powershell
# Encontrar proceso
netstat -ano | findstr :4000

# Matar proceso (reemplaza 1234 con el PID de la columna final)
taskkill /PID 1234 /F
```

### Error: "Network request failed"

**Soluciones**:
1. Verifica que backend esté corriendo
2. Si usas Android Emulator: URL debe ser `http://10.0.2.2:4000`
3. Si usas teléfono: URL debe ser `http://TU_IP:4000`
4. Verifica firewall de Windows (permitir puerto 4000)

### Error: "Module not found"

**Solución**:
```powershell
cd C:\Users\magis\Documents\DuoLove\duolove
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Assets/Imágenes no cargan

**Solución temporal**: Ignora los warnings. La app funciona sin imágenes.

**Solución permanente**: Crea/agrega imágenes en `duolove/assets/`

---

## 📊 Endpoints API Disponibles

### Públicos (sin token)
- `GET /` - Health check
- `POST /register` - Registro
- `POST /login` - Login

### Privados (requieren token)
- `GET /profile` - Obtener perfil
- `POST /profile` - Actualizar perfil
- `POST /profile/upload-avatar` - Subir foto
- `GET /rooms` - Mis salas
- `POST /rooms/create` - Crear sala
- `POST /rooms/join` - Unir sala
- `GET /rooms/:id` - Detalles de sala
- `GET /rooms/:id/qr` - QR de sala
- `POST /drawings` - Guardar dibujo
- `GET /drawings/:room_id` - Dibujos de sala

---

## 🎯 Test Cases

### Caso 1: Registro con validación
```
Input: Email inválido "test"
Expected: Error "Email no válido"

Input: Contraseña corta "123"
Expected: Error "La contraseña debe tener al menos 6 caracteres"

Input: Email duplicado
Expected: Error "Este email ya está registrado"
```

### Caso 2: Login
```
Input: Email no existe
Expected: Error "Usuario no encontrado"

Input: Contraseña incorrecta
Expected: Error "Contraseña incorrecta"

Input: Datos correctos
Expected: Navegación a Home
```

### Caso 3: Crear Sala
```
Input: Nombre vacío
Expected: Error "Por favor ingresa un nombre para la sala"

Input: Nombre válido
Expected: Código de 8 caracteres generado + QR
```

### Caso 4: Unir Sala
```
Input: Código no existe
Expected: Error "Sala no encontrada"

Input: Código válido
Expected: "Te has unido a la sala correctamente"

Input: Mismo código dos veces
Expected: "Ya eres miembro de esta sala"
```

---

## ✅ Checklist Final

- [ ] Backend corriendo en http://localhost:4000
- [ ] Frontend corriendo (Expo Dev Tools abierto)
- [ ] App carga en navegador/emulador/teléfono
- [ ] Splash navideño se muestra 4.5s
- [ ] Puedo registrarme
- [ ] Puedo hacer login
- [ ] Puedo crear sala y ver código/QR
- [ ] Puedo unirme a sala con código
- [ ] Puedo dibujar en pizarra
- [ ] Puedo cambiar color y grosor
- [ ] Puedo deshacer y limpiar
- [ ] Puedo ver mi perfil
- [ ] Puedo cerrar sesión
- [ ] Base de datos se crea y guarda datos

---

## 🎉 Si Todo Funciona

¡Felicitaciones! Tu app DuoLove está **100% operativa**.

Ahora puedes:
1. Agregar assets bonitos
2. Invitar a tu pareja a probar
3. Personalizar colores/tema
4. Agregar más funcionalidades

---

**¡Disfruta DuoLove!** 🎄💕✨
