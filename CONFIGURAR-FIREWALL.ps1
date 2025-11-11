# ==============================================================================
# Script para configurar el Firewall de Windows para DuoLove
# ==============================================================================
# 
# INSTRUCCIONES:
# 1. Haz clic derecho en este archivo
# 2. Selecciona "Ejecutar con PowerShell (como Administrador)"
# 3. Si aparece un mensaje de confirmación, presiona 'S' y Enter
#
# ==============================================================================

Write-Host "`n🎄 Configurando Firewall de Windows para DuoLove..." -ForegroundColor Cyan

try {
    # Eliminar regla existente si hay (por si acaso)
    Write-Host "`n🔍 Verificando reglas existentes..." -ForegroundColor Yellow
    netsh advfirewall firewall delete rule name="DuoLove Backend" 2>&1 | Out-Null

    # Agregar nueva regla para permitir conexiones entrantes en puerto 4000
    Write-Host "`n✨ Agregando regla para permitir puerto 4000..." -ForegroundColor Yellow
    $result = netsh advfirewall firewall add rule name="DuoLove Backend" dir=in action=allow protocol=TCP localport=4000

    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ ¡Firewall configurado correctamente!" -ForegroundColor Green
        Write-Host "`n📱 Ahora tu teléfono podrá conectarse al backend en:" -ForegroundColor Cyan
        Write-Host "   http://192.168.1.6:4000" -ForegroundColor White
        Write-Host "`n💡 Puedes cerrar esta ventana y probar la app nuevamente" -ForegroundColor Yellow
    }
    else {
        throw "Error al agregar regla de firewall"
    }
}
catch {
    Write-Host "`n❌ Error: $_" -ForegroundColor Red
    Write-Host "`n🔧 Solución alternativa:" -ForegroundColor Yellow
    Write-Host "   1. Abre 'Firewall de Windows Defender con seguridad avanzada'" -ForegroundColor White
    Write-Host "   2. Haz clic en 'Reglas de entrada' → 'Nueva regla...'" -ForegroundColor White
    Write-Host "   3. Selecciona 'Puerto' → 'TCP' → Puerto local: 4000" -ForegroundColor White
    Write-Host "   4. Selecciona 'Permitir la conexión'" -ForegroundColor White
    Write-Host "   5. Marca todas las opciones (Dominio, Privado, Público)" -ForegroundColor White
    Write-Host "   6. Nombre: 'DuoLove Backend'" -ForegroundColor White
}

Write-Host "`n"
Read-Host "Presiona Enter para cerrar"
