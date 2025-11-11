# 🎄 DuoLove - Script de Inicio Rápido

# INSTRUCCIONES:
# 1. Abre PowerShell como Administrador
# 2. Navega a la carpeta del proyecto: cd C:\Users\magis\Documents\DuoLove
# 3. Ejecuta este script: .\INICIO-RAPIDO.ps1

Write-Host "🎄✨ DuoLove - Inicio Rápido ✨🎄" -ForegroundColor Green
Write-Host ""

# Verificar Node.js
Write-Host "Verificando instalaciones..." -ForegroundColor Cyan
$nodeVersion = node -v 2>$null
if ($nodeVersion) {
    Write-Host "✅ Node.js instalado: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js NO encontrado. Instálalo desde https://nodejs.org/" -ForegroundColor Red
    exit 1
}

$npmVersion = npm -v 2>$null
if ($npmVersion) {
    Write-Host "✅ npm instalado: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "❌ npm NO encontrado" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📦 PASO 1: Instalando dependencias del BACKEND..." -ForegroundColor Yellow
Write-Host ""

Set-Location backend

# Copiar .env si no existe
if (-Not (Test-Path .env)) {
    Copy-Item .env.example .env
    Write-Host "✅ Archivo .env creado" -ForegroundColor Green
}

# Instalar dependencias backend
if (-Not (Test-Path node_modules)) {
    Write-Host "Instalando paquetes del backend (esto puede tardar 1-2 minutos)..." -ForegroundColor Cyan
    npm install
    Write-Host "✅ Backend instalado" -ForegroundColor Green
} else {
    Write-Host "✅ Backend ya tiene dependencias instaladas" -ForegroundColor Green
}

Write-Host ""
Write-Host "📱 PASO 2: Instalando dependencias del FRONTEND..." -ForegroundColor Yellow
Write-Host ""

Set-Location ..\duolove

# Instalar dependencias frontend
if (-Not (Test-Path node_modules)) {
    Write-Host "Instalando paquetes del frontend (esto puede tardar 3-5 minutos)..." -ForegroundColor Cyan
    npm install
    Write-Host "✅ Frontend instalado" -ForegroundColor Green
} else {
    Write-Host "✅ Frontend ya tiene dependencias instaladas" -ForegroundColor Green
}

Write-Host ""
Write-Host "✅ ¡Instalación completada!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 PARA INICIAR LA APP:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Abre una terminal y ejecuta:" -ForegroundColor Cyan
Write-Host "   cd C:\Users\magis\Documents\DuoLove\backend" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "2. Abre OTRA terminal y ejecuta:" -ForegroundColor Cyan
Write-Host "   cd C:\Users\magis\Documents\DuoLove\duolove" -ForegroundColor White
Write-Host "   npm start" -ForegroundColor White
Write-Host ""
Write-Host "3. Presiona 'a' para Android o 'w' para Web" -ForegroundColor Cyan
Write-Host ""
Write-Host "📖 Para más detalles, lee: COMANDOS-COMPLETOS.md" -ForegroundColor Yellow
Write-Host ""
Write-Host "💕 ¡Disfruta DuoLove! 🎄" -ForegroundColor Magenta

Set-Location ..
