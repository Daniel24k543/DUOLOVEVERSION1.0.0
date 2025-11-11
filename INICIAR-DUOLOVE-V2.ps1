# ==============================================================================
# Script de Inicio Mejorado para DuoLove
# ==============================================================================
# Este script inicia el backend y frontend de DuoLove de forma confiable
# ==============================================================================

$ErrorActionPreference = "Continue"

Write-Host "`n🎄✨ Iniciando DuoLove ✨🎄" -ForegroundColor Cyan
Write-Host "=" * 80 -ForegroundColor Gray

# Verificar Node.js
Write-Host "`n📦 Verificando Node.js..." -ForegroundColor Yellow
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js no está instalado" -ForegroundColor Red
    Read-Host "Presiona Enter para salir"
    exit 1
}
Write-Host "✅ Node.js: $(node --version)" -ForegroundColor Green

# Verificar que el puerto 4000 no esté en uso
Write-Host "`n🔍 Verificando puerto 4000..." -ForegroundColor Yellow
$portInUse = netstat -ano | Select-String ":4000.*LISTENING"
if ($portInUse) {
    Write-Host "⚠️  Puerto 4000 ya está en uso" -ForegroundColor Yellow
    Write-Host "   Esto podría significar que el backend ya está corriendo" -ForegroundColor Gray
    $continuar = Read-Host "¿Quieres detener el proceso y reiniciar? (S/N)"
    if ($continuar -eq "S" -or $continuar -eq "s") {
        $pid = ($portInUse -split "\s+")[-1]
        Write-Host "   Deteniendo proceso $pid..." -ForegroundColor Gray
        taskkill /PID $pid /F | Out-Null
        Start-Sleep -Seconds 2
    }
}

# Backend
Write-Host "`n🚀 Iniciando Backend..." -ForegroundColor Yellow
Write-Host "   Ubicación: C:\Users\magis\Documents\DuoLove\backend" -ForegroundColor Gray
Write-Host "   Puerto: 4000" -ForegroundColor Gray

Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location 'C:\Users\magis\Documents\DuoLove\backend'; node server.js"

Write-Host "`n⏳ Esperando que el backend inicie..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Verificar que el backend esté corriendo
$backendRunning = netstat -ano | Select-String ":4000.*LISTENING"
if ($backendRunning) {
    Write-Host "✅ Backend corriendo en puerto 4000" -ForegroundColor Green
}
else {
    Write-Host "❌ El backend no pudo iniciar correctamente" -ForegroundColor Red
    Write-Host "   Revisa la ventana del backend para ver el error" -ForegroundColor Yellow
    Read-Host "Presiona Enter para salir"
    exit 1
}

# Frontend
Write-Host "`n📱 Iniciando Frontend (Expo)..." -ForegroundColor Yellow
Write-Host "   Ubicación: C:\Users\magis\Documents\DuoLove\duolove" -ForegroundColor Gray

Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location 'C:\Users\magis\Documents\DuoLove\duolove'; npm start"

Write-Host "`n✅ ¡DuoLove iniciado correctamente!" -ForegroundColor Green
Write-Host "=" * 80 -ForegroundColor Gray
Write-Host "`n📋 Ventanas abiertas:" -ForegroundColor Cyan
Write-Host "   1️⃣  Backend  → http://192.168.1.6:4000" -ForegroundColor White
Write-Host "   2️⃣  Frontend → Expo (escanea el QR con tu teléfono)" -ForegroundColor White

Write-Host "`n📱 En tu teléfono:" -ForegroundColor Yellow
Write-Host "   • Abre la app 'Expo Go'" -ForegroundColor White
Write-Host "   • Escanea el código QR que aparece en la ventana del Frontend" -ForegroundColor White

Write-Host "`n⚠️  IMPORTANTE:" -ForegroundColor Red
Write-Host "   • NO cierres las ventanas del Backend y Frontend" -ForegroundColor White
Write-Host "   • Si el teléfono no se conecta, ejecuta CONFIGURAR-FIREWALL.ps1 como administrador" -ForegroundColor White

Write-Host "`n💡 Puedes cerrar ESTA ventana sin problemas" -ForegroundColor Gray
Write-Host "`n"
Start-Sleep -Seconds 3
