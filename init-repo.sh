#!/bin/bash

# Script para inicializar el repositorio y configurar GitHub Pages
# Ejecutar con: chmod +x init-repo.sh && ./init-repo.sh

echo "🚀 Inicializando repositorio de Biblioteca Digital - Clean Architecture"

# Verificar si Git está instalado
if ! command -v git &> /dev/null; then
    echo "❌ Git no está instalado. Por favor instala Git primero."
    exit 1
fi

# Inicializar repositorio Git si no existe
if [ ! -d ".git" ]; then
    echo "📁 Inicializando repositorio Git..."
    git init
    git branch -M main
else
    echo "✅ Repositorio Git ya existe"
fi

# Crear .gitignore si no existe
if [ ! -f ".gitignore" ]; then
    echo "📝 Creando .gitignore..."
    cat > .gitignore << EOL
# Dependencies
node_modules/
npm-debug.log*

# Build outputs
dist/
build/

# Environment variables
.env
.env.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log

# VitePress
docs/.vitepress/dist
docs/.vitepress/cache
EOL
fi

# Agregar archivos al staging
echo "📦 Agregando archivos al repositorio..."
git add .

# Hacer commit inicial si no hay commits
if ! git rev-parse --verify HEAD >/dev/null 2>&1; then
    echo "💾 Creando commit inicial..."
    git commit -m "feat: implementación inicial de biblioteca digital con clean architecture

- ✅ Estructura de capas siguiendo Clean Architecture
- ✅ Entidades de dominio (User, Book, Loan, Reservation)
- ✅ Casos de uso de aplicación
- ✅ Repositorios e interfaces
- ✅ Servicios externos (Email, Pagos)
- ✅ API REST con Express y TypeScript
- ✅ Tests unitarios con Jest
- ✅ Documentación completa con VitePress
- ✅ Modelo C4 para arquitectura
- ✅ CI/CD para GitHub Pages
- ✅ Configuración de desarrollo y producción"
else
    echo "✅ Ya existen commits en el repositorio"
fi

echo ""
echo "🎯 Próximos pasos:"
echo ""
echo "1. Crear repositorio en GitHub:"
echo "   - Ve a https://github.com/new"
echo "   - Nombre: biblioteca-digital-clean-architecture"
echo "   - Descripción: Sistema de gestión de bibliotecas digitales con Clean Architecture"
echo "   - Público/Privado según prefieras"
echo "   - NO inicialices con README, .gitignore o licencia"
echo ""
echo "2. Conectar con GitHub:"
echo "   git remote add origin https://github.com/TU-USUARIO/biblioteca-digital-clean-architecture.git"
echo "   git push -u origin main"
echo ""
echo "3. Configurar GitHub Pages:"
echo "   - Ve a Settings > Pages en tu repositorio"
echo "   - Source: GitHub Actions"
echo "   - El workflow se ejecutará automáticamente"
echo ""
echo "4. Instalar dependencias y ejecutar:"
echo "   npm install"
echo "   npm run dev"
echo ""
echo "5. Ver documentación en desarrollo:"
echo "   npm run docs:dev"
echo ""
echo "📚 La documentación estará disponible en:"
echo "https://TU-USUARIO.github.io/biblioteca-digital-clean-architecture/"
echo ""
echo "✨ ¡Repositorio inicializado correctamente!"