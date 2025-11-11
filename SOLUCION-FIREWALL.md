# 🔧 Solución al Problema de Conexión - DuoLove

## 🎯 Estado Actual

✅ **Backend funcionando**: El servidor Node.js está corriendo correctamente en el puerto 4000  
✅ **Frontend funcionando**: La app Expo está corriendo en tu teléfono  
❌ **Problema**: El Firewall de Windows está bloqueando las conexiones desde tu teléfono

---

## 🛡️ Solución: Configurar el Firewall de Windows

### Opción 1: Ejecutar el Script Automático (RECOMENDADO)

1. **Busca** el archivo `CONFIGURAR-FIREWALL.ps1` en esta carpeta
2. **Haz clic derecho** sobre el archivo
3. **Selecciona**: "Ejecutar con PowerShell (como Administrador)"
4. Si aparece un mensaje de seguridad, confirma con **'S'** y **Enter**
5. **Espera** a que aparezca "✅ ¡Firewall configurado correctamente!"
6. **Cierra** la ventana

### Opción 2: Configuración Manual

Si el script no funciona, puedes agregar la regla manualmente:

1. **Presiona** `Windows + R`
2. **Escribe**: `wf.msc` y presiona Enter
3. En la ventana que aparece, haz clic en **"Reglas de entrada"** (panel izquierdo)
4. En el panel derecho, haz clic en **"Nueva regla..."**
5. Selecciona **"Puerto"** → Click en **Siguiente**
6. Selecciona **"TCP"**
7. En "Puerto local específico" escribe: **4000** → Click en **Siguiente**
8. Selecciona **"Permitir la conexión"** → Click en **Siguiente**
9. **Marca todas las casillas** (Dominio, Privado, Público) → Click en **Siguiente**
10. Nombre: **DuoLove Backend** → Click en **Finalizar**

---

## 📱 Después de Configurar el Firewall

1. **En tu teléfono**, recarga la app de DuoLove:
   - Sacude el teléfono para abrir el menú de desarrollo
   - Selecciona **"Reload"**
2. **Intenta registrarte** nuevamente:

   - Nombre: Marco
   - Email: marco@duolove.com
   - Contraseña: 123456

3. **Deberías ver**:
   - ✅ "Registro exitoso"
   - ✅ Navegación automática a la pantalla Home

---

## ⚠️ Nota Importante sobre la Imagen Splash

La app actualmente está buscando la imagen `splash-duolove.jpg` en la carpeta `assets/` pero **este archivo no existe todavía**.

### Para agregar la imagen splash:

1. **Guarda** la imagen navideña (la del Santa y Sra. Claus) como:

   ```
   C:\Users\magis\Documents\DuoLove\duolove\assets\splash-duolove.jpg
   ```

2. **Recarga** la app en el teléfono (sacude → Reload)

### Alternativa temporal (si no tienes la imagen):

Puedo cambiar el código para volver a usar el fondo degradado navideño mientras consigues la imagen.

---

## 🧪 Verificar que Todo Funciona

Una vez configurado el firewall, puedes verificar que todo está bien:

### En PowerShell ejecuta:

```powershell
Test-NetConnection -ComputerName 192.168.1.6 -Port 4000
```

**Resultado esperado:**

```
TcpTestSucceeded : True  ✅
```

Si ves `True`, ¡todo está listo para funcionar!

---

## 📋 Resumen de Cambios Realizados

### ✅ Emojis Reemplazados con Dibujos SVG

- **LoginScreen**: Árbol de Navidad + Copos de nieve, muñeco de nieve, regalo, campana y estrella
- **RegisterScreen**: Regalo + Copos de nieve, muñeco de nieve y regalo

### ✅ Código Splash Actualizado

- Cambiado de gradiente a imagen (`splash-duolove.jpg`)
- Falta agregar el archivo de imagen

### ✅ Backend Configurado

- Escuchando en todas las interfaces de red (0.0.0.0:4000)
- Accesible desde 192.168.1.6:4000
- Falta abrir el puerto en el firewall

---

## 🆘 ¿Necesitas Ayuda?

Si después de configurar el firewall sigues teniendo problemas:

1. Verifica que el backend sigue corriendo (debería haber una ventana de PowerShell abierta con mensajes del servidor)
2. Verifica tu IP con: `ipconfig` y busca "IPv4" en la sección Wi-Fi
3. Si tu IP cambió, avísame para actualizar la configuración

---

## 🎄 ¡Siguiente Paso!

1. **Configura el firewall** (Opción 1 o 2)
2. **Prueba la app** en tu teléfono
3. **Agrega la imagen splash** cuando la tengas lista

¡Estás a un paso de tener DuoLove funcionando completamente! 🎅✨
