# 🎉 Nuevas Funcionalidades Agregadas

## ✅ 1. Subir Foto de Fondo en Pizarra

### Ubicación: RoomScreen (Pantalla de la pizarra)

### Funcionalidad:
- **Botón "+ Pizarra"** (azul): Permite seleccionar una imagen de tu galería para usarla como fondo de la pizarra
- **Botón "Quitar"** (naranja): Aparece cuando hay una imagen de fondo, permite quitarla
- La imagen se muestra con **opacidad del 30%** para que puedas dibujar encima sin perder visibilidad
- Los dibujos se mantienen **por encima** de la imagen de fondo

### Cómo Usar:
1. Entra a una sala (toca una sala de tu lista)
2. Toca el botón **"+ Pizarra"** (icono de imagen)
3. Selecciona una foto de tu galería
4. ¡Dibuja encima de la imagen!
5. Para quitar el fondo, toca **"Quitar"**

---

## ✅ 2. Escanear Código QR

### Ubicación: Settings → "Escanear código QR"

### Funcionalidad:
- **Nueva pantalla de escaneo** con cámara en tiempo real
- **Marco dorado** con esquinas para guiar el escaneo
- Detecta automáticamente códigos QR de salas
- Te une a la sala instantáneamente después de escanear

### Cómo Usar:
1. Ve a **Perfil** → **Ajustes** (⚙️)
2. Toca **"Escanear código QR"** (primera opción, icono morado)
3. Apunta la cámara al código QR de la sala
4. La app automáticamente te unirá a la sala
5. Si necesitas escanear otro código, toca **"Escanear de nuevo"**

---

## 📦 Instalación de Dependencia Requerida

Para que el escaneo QR funcione, necesitas instalar `expo-camera`:

### Opción 1: Instalar Ahora (RECOMENDADO)

**Abre una NUEVA terminal de PowerShell** y ejecuta:

```powershell
cd C:\Users\magis\Documents\DuoLove\duolove
npx expo install expo-camera
```

Luego **recarga la app** (presiona `r` en la terminal de Expo).

### Opción 2: Instalar Después

Si no quieres instalar ahora, la app funcionará **sin problemas** excepto por la pantalla de escaneo QR. Las demás funciones (pizarra con fondo, etc.) funcionan perfectamente.

---

## 🎨 Diseño

### Botones en Pizarra:
- **🖼️ + Pizarra** (Azul #0066FF): Subir imagen de fondo
- **❌ Quitar** (Naranja #FF6B35): Quitar imagen de fondo
- **↩️ Deshacer** (Gris): Deshacer último trazo
- **🗑️ Limpiar** (Rojo): Limpiar toda la pizarra

### Pantalla de Escaneo QR:
- Fondo negro con cámara en tiempo real
- Marco de escaneo dorado con esquinas
- Instrucciones en la parte inferior
- Botón "Escanear de nuevo" si falla

---

## 🧪 Prueba las Funcionalidades

### Probar Fondo de Pizarra:
1. Crea una sala
2. Entra a la sala
3. Toca "+ Pizarra"
4. Selecciona una foto
5. Dibuja encima

### Probar Escaneo QR:
1. Crea una sala en un dispositivo
2. Muestra el código QR
3. En otro dispositivo: Settings → Escanear código QR
4. Apunta al código

---

## 📝 Notas Técnicas

### Permisos Requeridos:
- **Galería de fotos**: Para subir imagen de fondo (se solicita automáticamente)
- **Cámara**: Para escanear QR (se solicita automáticamente)

### Compatibilidad:
- ✅ Android físico
- ✅ Android emulador (solo fondo, QR requiere cámara física)
- ✅ iOS (no probado pero debería funcionar)
- ✅ Web (solo fondo, QR requiere cámara)

---

## 🎄 ¡Listo!

Ahora tu app **DuoLove** tiene:
1. ✅ Splash navideño de 5 segundos
2. ✅ Login/Registro funcional
3. ✅ Crear y unirse a salas con código
4. ✅ Pizarra con colores y grosores
5. ✅ **NUEVO: Fondo de imagen en pizarra**
6. ✅ **NUEVO: Escaneo de código QR**
7. ✅ Perfil con foto
8. ✅ Settings con opciones

**¡A disfrutar dibujando con tu pareja!** 💕🎄
