# 🎄 DuoLove - Guía de Inicio Rápido

## ⚡ Inicio Rápido (2 pasos)

### 1️⃣ Instalar dependencias

Ejecuta el script automático:

```powershell
cd C:\Users\magis\Documents\DuoLove
.\INICIO-RAPIDO.ps1
```

O instala manualmente:

**Backend:**

```powershell
cd C:\Users\magis\Documents\DuoLove\backend
Copy-Item .env.example .env
npm install
```

**Frontend:**

```powershell
cd C:\Users\magis\Documents\DuoLove\duolove
npm install
```

### 2️⃣ Ejecutar la app

**Terminal 1 - Backend:**

```powershell
cd C:\Users\magis\Documents\DuoLove\backend
npm run dev
```

**Terminal 2 - Frontend:**

```powershell
cd C:\Users\magis\Documents\DuoLove\duolove
npm start
```

Luego presiona `a` (Android), `w` (Web) o escanea el QR con Expo Go.

---

## 📚 Documentación Completa

- **[COMANDOS-COMPLETOS.md](./COMANDOS-COMPLETOS.md)** - Guía detallada paso a paso
- **[README.md](./README.md)** - Descripción del proyecto y características

---

## 🎨 Assets Faltantes

Si ves errores sobre imágenes faltantes:

1. Ve a `duolove/assets/`
2. Lee `assets/README.md`
3. Crea o descarga las imágenes necesarias:
   - `splash.png` (1284x2778)
   - `icon.png` (1024x1024)
   - `adaptive-icon.png` (1024x1024)
   - `favicon.png` (48x48)

**Nota temporal**: La app funcionará incluso sin assets, pero mostrará errores visuales.

---

## 🐛 Problemas Comunes

### Backend no conecta

- Verifica que esté corriendo: http://localhost:4000
- Si usas Android Emulator: `http://10.0.2.2:4000`
- Si usas teléfono: Cambia IP en `duolove/src/config/api.ts`

### Puerto 4000 ocupado

```powershell
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

### Módulos no encontrados

```powershell
cd duolove
Remove-Item -Recurse node_modules
npm install
```

---

## 🎯 Características Implementadas

✅ Splash navideño (4.5s)  
✅ Login/Registro sin términos y condiciones  
✅ Backend local (Node + SQLite + JWT)  
✅ Crear salas con código único  
✅ Unir sala por código  
✅ QR para compartir sala  
✅ Pizarra dibujable (colores + grosor)  
✅ Perfil editable con foto  
✅ Ajustes navideños  
✅ Navegación con tabs (Home + Perfil)

---

## 🚀 Siguiente Nivel

- **WebSockets**: Para pizarra en tiempo real
- **Chat**: Mensajes de texto entre parejas
- **Notificaciones Push**: Alertas cuando tu pareja dibuja
- **Galería**: Guardar dibujos favoritos

---

**¡Disfruta construyendo DuoLove! 🎄💕**
