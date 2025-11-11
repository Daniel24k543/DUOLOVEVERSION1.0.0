#!/usr/bin/env pwsh
# Script para iniciar DuoLove Backend y Frontend

Write-Host "🎄 Iniciando DuoLove Backend..." -ForegroundColor Green

# Ir al directorio del backend
Set-Location "C:\Users\magis\Documents\DuoLove\backend"

# Iniciar backend
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd C:\Users\magis\Documents\DuoLove\backend; npm run dev" -WindowStyle Normal

Write-Host "✅ Backend iniciado" -ForegroundColor Green
Write-Host ""
Write-Host "🎄 Iniciando DuoLove Frontend..." -ForegroundColor Cyan

# Esperar 3 segundos
Start-Sleep -Seconds 3

# Ir al directorio del frontend  
Set-Location "C:\Users\magis\Documents\DuoLove\duolove"

# Iniciar frontend
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd C:\Users\magis\Documents\DuoLove\duolove; npm start" -WindowStyle Normal

Write-Host "✅ Frontend iniciado" -ForegroundColor Cyan
Write-Host ""
Write-Host "📱 Backend: http://192.168.1.6:4000" -ForegroundColor Yellow
Write-Host "📱 Frontend: Presiona 'a' para Android o 'w' para Web" -ForegroundColor Yellow
Write-Host ""
Write-Host "✨ DuoLove está corriendo! ✨" -ForegroundColor Magenta
