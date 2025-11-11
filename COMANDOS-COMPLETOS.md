# 🎄 DuoLove - Comandos de Instalación y Ejecución (PowerShell)

Este documento contiene **todos los comandos completos** para construir y ejecutar DuoLove desde cero en Windows con PowerShell.

---

## ✅ Pre-requisitos

Antes de empezar, asegúrate de tener instalado:

1. **Node.js 16+** - [Descargar aquí](https://nodejs.org/)
2. **Git** (opcional) - [Descargar aquí](https://git-scm.com/)
3. **Android Studio** (para emulador Android) O **Expo Go** en tu teléfono

### Verificar instalaciones:

```powershell
node -v
npm -v
git --version
```

---

## 📦 PARTE 1: Instalación del Backend

### 1.1 Navegar a la carpeta del backend

```powershell
cd C:\Users\magis\Documents\DuoLove\backend
```

### 1.2 Copiar el archivo de ejemplo .env

```powershell
Copy-Item .env.example .env
```

**IMPORTANTE**: Abre `backend\.env` y cambia `JWT_SECRET` por una clave segura si lo deseas.

### 1.3 Instalar dependencias del backend

```powershell
npm install
```

Esto instalará: express, sqlite3, bcryptjs, jsonwebtoken, cors, dotenv, multer, qrcode, nodemon

### 1.4 Iniciar el backend

**Opción A - Modo desarrollo (con auto-reinicio):**
```powershell
npm run dev
```

**Opción B - Modo producción:**
```powershell
npm start
```

✅ **Resultado esperado**: Verás en consola:
```
🎄✨ DuoLove Backend corriendo en http://localhost:4000 ✨🎄
✅ Base de datos inicializada correctamente
```

**Deja esta terminal abierta** (el backend debe seguir corriendo).

---

## 📱 PARTE 2: Instalación del Frontend (Expo)

### 2.1 Abrir NUEVA terminal de PowerShell

Abre una **segunda ventana** de PowerShell (el backend debe seguir corriendo en la primera).

### 2.2 Navegar a la carpeta del frontend

```powershell
cd C:\Users\magis\Documents\DuoLove\duolove
```

### 2.3 Instalar dependencias del frontend

```powershell
npm install
```

Esto puede tardar 2-5 minutos. Instalará React Native, Expo, navegación, etc.

### 2.4 Configurar IP del backend (solo para dispositivo físico)

**Si vas a usar Android Emulator**, omite este paso.

**Si vas a usar tu teléfono real**, necesitas cambiar la IP:

1. Obtén la IP de tu computadora:
```powershell
ipconfig
```
Busca "IPv4 Address" de tu adaptador de red (ej: `192.168.1.42`)

2. Edita `duolove\src\config\api.ts`:
   - Cambia `http://10.0.2.2:4000` por `http://TU_IP:4000`
   - Ejemplo: `http://192.168.1.42:4000`

### 2.5 Iniciar Expo

```powershell
npm start
```

✅ **Resultado esperado**: Se abrirá una página web con un QR y opciones.

---

## 🚀 PARTE 3: Ejecutar la App

### Opción A: Android Emulator (recomendado para desarrollo)

1. Abre **Android Studio**
2. Inicia un **AVD (Android Virtual Device)**
3. En la terminal de Expo, presiona **`a`** para abrir en Android

### Opción B: Expo Go en tu teléfono

1. Instala **Expo Go** desde Google Play Store / App Store
2. Escanea el QR que aparece en la terminal con Expo Go
3. Asegúrate de estar en la **misma red WiFi** que tu computadora

### Opción C: Web (navegador)

En la terminal de Expo, presiona **`w`** para abrir en navegador web.

⚠️ **Nota**: Algunas funciones (cámara, permisos) no funcionan en web.

---

## 🧪 PARTE 4: Probar la App

### 4.1 Registro de usuario

1. Abre la app (verás splash navideño 4.5 segundos)
2. Haz clic en **"Regístrate"**
3. Ingresa:
   - Nombre: `Tu Nombre`
   - Email: `test@duolove.com`
   - Contraseña: `123456`
4. Haz clic en **"Registrarse"**

✅ Deberías entrar a la pantalla principal (Home)

### 4.2 Crear una sala

1. En Home, haz clic en **"Crear Sala"**
2. Ingresa nombre: `Nuestra Sala`
3. Haz clic en **"Crear Sala"**
4. Verás el **código** y **QR** de la sala
5. **Copia el código** (ej: `ABC12345`)

### 4.3 Unirse a una sala (segundo usuario)

**Opción 1 - Mismo dispositivo:**
1. Cierra sesión (Perfil → Cerrar sesión)
2. Registra otro usuario: `test2@duolove.com`
3. En Home, haz clic en **"Unir Sala"**
4. Ingresa el código copiado
5. Haz clic en **"Unirse a la Sala"**

**Opción 2 - Otro dispositivo:**
1. Instala la app en otro dispositivo
2. Registra otro usuario
3. Escanea el QR O ingresa el código manualmente

### 4.4 Usar la pizarra

1. Haz clic en una sala desde Home
2. Selecciona color y grosor
3. Dibuja con el dedo/mouse
4. Usa botones "Deshacer" y "Limpiar"

---

## 🔧 PARTE 5: Comandos Útiles

### Reiniciar backend
```powershell
# Detén con Ctrl+C, luego:
cd C:\Users\magis\Documents\DuoLove\backend
npm run dev
```

### Reiniciar frontend
```powershell
# Detén con Ctrl+C, luego:
cd C:\Users\magis\Documents\DuoLove\duolove
npm start
```

### Limpiar cache de Expo
```powershell
cd C:\Users\magis\Documents\DuoLove\duolove
npx expo start -c
```

### Ver logs del backend
Los logs aparecen en la terminal donde ejecutaste `npm run dev`

### Ver base de datos SQLite
```powershell
cd C:\Users\magis\Documents\DuoLove\backend
# Instalar sqlite3 CLI (opcional)
# Luego:
sqlite3 duolove.db
# Dentro de sqlite:
# .tables
# SELECT * FROM users;
# .quit
```

---

## 🐛 Solución de Problemas

### Problema: "Cannot connect to backend"

**Solución:**
1. Verifica que el backend esté corriendo (`http://localhost:4000`)
2. Abre http://localhost:4000 en navegador, deberías ver:
   ```json
   {"message":"🎄 DuoLove Backend API","version":"1.0.0","status":"running"}
   ```
3. Si usas Android Emulator, usa `http://10.0.2.2:4000`
4. Si usas teléfono real, usa `http://TU_IP:4000`

### Problema: "Port 4000 already in use"

**Solución:**
```powershell
# Encontrar proceso en puerto 4000
netstat -ano | findstr :4000
# Matar proceso (reemplaza PID por el número de la columna final)
taskkill /PID <PID> /F
```

### Problema: Expo no inicia

**Solución:**
```powershell
# Limpiar cache
cd C:\Users\magis\Documents\DuoLove\duolove
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
npx expo start -c
```

### Problema: "Module not found"

**Solución:**
```powershell
cd C:\Users\magis\Documents\DuoLove\duolove
npm install
```

---

## 📝 Notas Importantes

1. **Backend debe estar corriendo SIEMPRE** para que la app funcione
2. **Base de datos** se crea automáticamente en `backend/duolove.db`
3. **Assets faltantes**: Si ves errores sobre `splash.png`, crea un archivo placeholder:
   ```powershell
   mkdir C:\Users\magis\Documents\DuoLove\duolove\assets
   # Coloca una imagen PNG llamada splash.png, icon.png, etc.
   ```
4. **Tema navideño**: Los colores están en `duolove\src\theme\index.ts`

---

## 🎯 Próximos Pasos (Opcional)

### Build para producción (APK Android)

```powershell
cd C:\Users\magis\Documents\DuoLove\duolove
npx eas build --platform android --profile preview
```

### Deploy backend a producción

Considera usar:
- **Render.com** (gratis)
- **Railway.app** (gratis)
- **Heroku**

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en ambas terminales (backend y frontend)
2. Verifica que Node.js versión sea 16+
3. Asegúrate de estar en la carpeta correcta
4. Intenta limpiar cache (comandos arriba)

---

## ✨ ¡Listo!

Tu app DuoLove está funcionando. Ahora puedes:
- ✅ Crear usuarios
- ✅ Crear salas con código/QR
- ✅ Dibujar en la pizarra compartida
- ✅ Subir fotos de perfil
- ✅ Ver ajustes

**¡Disfruta de DuoLove! 🎄💕**
