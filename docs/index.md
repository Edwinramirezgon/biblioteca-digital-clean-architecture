---
layout: home

hero:
  name: "📚 Biblioteca Digital"
  text: "Clean Architecture"
  tagline: "Sistema de gestión de bibliotecas digitales siguiendo principios de Arquitectura Limpia y documentado con Modelo C4"
  image:
    src: /logo.svg
    alt: Biblioteca Digital
  actions:
    - theme: brand
      text: 🚀 Comenzar
      link: /architecture/
    - theme: alt
      text: 📊 Ver Modelo C4
      link: /c4-model/
    - theme: alt
      text: 💻 Implementación
      link: /implementation/

features:
  - icon: 🎯
    title: Arquitectura Limpia
    details: Implementación completa de Clean Architecture con separación clara de responsabilidades y inversión de dependencias
  - icon: 📊
    title: Modelo C4
    details: Documentación arquitectónica en 4 niveles - Contexto, Contenedores, Componentes y Código
  - icon: 🔧
    title: Casos de Uso Reales
    details: Préstamos, reservas, búsquedas, notificaciones y gestión completa de biblioteca digital
  - icon: 🧪
    title: Testing Completo
    details: Tests unitarios con mocks, cobertura de casos de uso y entidades de dominio
  - icon: 🚀
    title: CI/CD Automatizado
    details: Despliegue automático en GitHub Pages con documentación viva
  - icon: 📱
    title: API REST
    details: API completa con Express, TypeScript y integración con servicios externos
---

## 🎯 Objetivo del Proyecto

Este proyecto demuestra la **implementación práctica** de los principios de **Arquitectura Limpia** (Clean Architecture) de Robert C. Martin en un sistema real de gestión de bibliotecas digitales.

<div class="architecture-card layer-domain">

### 📚 Funcionalidades Principales

- **Búsqueda y lectura** de libros en línea
- **Gestión de préstamos** (físicos y digitales)
- **Sistema de reservas** con notificaciones
- **Historial completo** de préstamos
- **Membresías premium** con beneficios
- **Portal administrativo** para gestión
- **API pública** para integraciones
- **Servicios externos** (pagos, email, contenido)

</div>

## 🏗️ Arquitectura en Capas Concéntricas

El sistema implementa **Clean Architecture** con dependencias que apuntan hacia el centro:

```mermaid
graph TB
    subgraph "🖥️ PRESENTACIÓN"
        P1[Controllers]
        P2[Routes]
        P3[Middleware]
    end
    
    subgraph "🔧 INFRAESTRUCTURA"
        I1[Repositories]
        I2[External Services]
        I3[Database]
    end
    
    subgraph "📋 APLICACIÓN"
        A1[Use Cases]
        A2[Interfaces]
        A3[DTOs]
    end
    
    subgraph "🎯 DOMINIO"
        D1[Entities]
        D2[Business Rules]
        D3[Value Objects]
    end
    
    P1 --> A1
    P2 --> A1
    I1 --> A2
    I2 --> A2
    A1 --> D1
    A1 --> D2
    
    style D1 fill:#10b981,stroke:#059669,color:#fff
    style D2 fill:#10b981,stroke:#059669,color:#fff
    style D3 fill:#10b981,stroke:#059669,color:#fff
    style A1 fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style A2 fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style A3 fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style I1 fill:#f59e0b,stroke:#d97706,color:#fff
    style I2 fill:#f59e0b,stroke:#d97706,color:#fff
    style I3 fill:#f59e0b,stroke:#d97706,color:#fff
    style P1 fill:#ef4444,stroke:#dc2626,color:#fff
    style P2 fill:#ef4444,stroke:#dc2626,color:#fff
    style P3 fill:#ef4444,stroke:#dc2626,color:#fff
```

## 📋 Principios de Clean Architecture Implementados

<div class="tip custom-block">
<p class="custom-block-title">💡 Regla de Dependencia</p>

**Las dependencias del código fuente solo pueden apuntar hacia adentro**

Cada capa solo puede depender de capas más internas, nunca de las externas.
</div>

<div class="architecture-card layer-domain">

### 🎯 **Capa de Dominio** <span class="badge badge-domain">CORE</span>

- **Entidades**: `User`, `Book`, `Loan`, `Reservation`
- **Reglas de negocio**: Validaciones y lógica invariante
- **Interfaces**: Contratos para repositorios
- **Sin dependencias externas**

</div>

<div class="architecture-card layer-application">

### 📋 **Capa de Aplicación** <span class="badge badge-application">USE CASES</span>

- **Casos de uso**: `BorrowBookUseCase`, `SearchBooksUseCase`
- **Orquestación**: Coordinación de entidades y servicios
- **Interfaces de servicios**: Contratos para servicios externos
- **DTOs**: Objetos de transferencia de datos

</div>

<div class="architecture-card layer-infrastructure">

### 🔧 **Capa de Infraestructura** <span class="badge badge-infrastructure">ADAPTERS</span>

- **Repositorios**: Implementaciones de persistencia
- **Servicios externos**: Email, pagos, contenido digital
- **Base de datos**: PostgreSQL, Redis
- **Frameworks**: Express, TypeScript

</div>

<div class="architecture-card layer-presentation">

### 🖥️ **Capa de Presentación** <span class="badge badge-presentation">UI/API</span>

- **Controladores**: Manejo de requests HTTP
- **Rutas**: Definición de endpoints
- **Middleware**: Autenticación, validación
- **Serialización**: Conversión de datos

</div>

## 🚀 Stack Tecnológico

| Capa | Tecnología | Propósito |
|------|------------|----------|
| **Backend** | Node.js + TypeScript + Express | API REST y lógica de negocio |
| **Base de Datos** | PostgreSQL + Redis | Persistencia y cache |
| **Testing** | Jest + Supertest | Tests unitarios e integración |
| **Documentación** | VitePress + Mermaid | Documentación técnica |
| **CI/CD** | GitHub Actions | Despliegue automático |
| **Servicios** | Stripe + SendGrid + AWS S3 | Pagos, email y almacenamiento |

## 🗺️ Navegación por la Documentación

<div class="c4-diagram c4-level-1">

### 🏛️ [Arquitectura Limpia](/architecture/)
Principos SOLID, capas, inversión de dependencias y beneficios de Clean Architecture

</div>

<div class="c4-diagram c4-level-2">

### 📊 [Modelo C4](/c4-model/)
Documentación arquitectónica en 4 niveles: Contexto → Contenedores → Componentes → Código

</div>

<div class="c4-diagram c4-level-3">

### 💻 [Implementación](/implementation/)
Detalles técnicos, estructura del proyecto y código por capas

</div>

<div class="c4-diagram c4-level-4">

### 🧪 [Testing](/implementation/testing)
Tests unitarios, mocks y cobertura de casos de uso

</div>

## 🎓 Casos de Uso Implementados

```mermaid
flowchart LR
    U[👤 Usuario] --> S[🔍 Buscar Libros]
    U --> B[📚 Tomar Prestado]
    U --> R[🔖 Reservar]
    U --> H[📊 Ver Historial]
    
    A[👨‍💼 Admin] --> M[📋 Gestionar Inventario]
    A --> P[💰 Configurar Políticas]
    A --> Rep[📈 Generar Reportes]
    
    S --> DB[(🗄️ Base de Datos)]
    B --> DB
    R --> N[📧 Notificaciones]
    B --> Pay[💳 Pagos]
    
    style U fill:#3b82f6,stroke:#1d4ed8,color:#fff
    style A fill:#10b981,stroke:#059669,color:#fff
    style DB fill:#f59e0b,stroke:#d97706,color:#fff
    style N fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style Pay fill:#ef4444,stroke:#dc2626,color:#fff
```

## 🎯 Beneficios Demostrados

::: tip ✅ **MANTENIBILIDAD**
Código organizado por responsabilidades, fácil de modificar y extender
:::

::: info 🧪 **TESTABILIDAD**  
Lógica de negocio aislada, mocking sencillo, tests rápidos y confiables
:::

::: warning 🚀 **ESCALABILIDAD**
Separación clara permite equipos especializados y crecimiento natural
:::

::: danger 🔄 **FLEXIBILIDAD**
Cambio de frameworks, bases de datos o servicios sin afectar el core
:::

---

<div style="text-align: center; padding: 2rem; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 12px; margin: 2rem 0;">

*"La arquitectura de software es el arte de dibujar líneas que llamo límites. Esos límites separan los elementos de software unos de otros, y restringen a aquellos de un lado a conocer sobre aquellos del otro lado."*

**— Robert C. Martin (Uncle Bob)**

</div>

## 🚀 Próximos Pasos

1. **[Explorar la Arquitectura](/architecture/)** - Entiende los principios fundamentales
2. **[Revisar el Modelo C4](/c4-model/)** - Visualiza la arquitectura en 4 niveles  
3. **[Analizar la Implementación](/implementation/)** - Examina el código por capas
4. **[Ejecutar el Proyecto](https://github.com/tu-usuario/biblioteca-digital-clean-architecture)** - Clona y ejecuta localmente