# Nivel 2: Diagrama de Contenedores

## 🎯 Propósito

El diagrama de contenedores descompone el Sistema de Biblioteca Digital en sus principales **contenedores** (aplicaciones, servicios, bases de datos) y muestra cómo se comunican entre sí.

**Audiencia**: Arquitectos de software, desarrolladores senior, DevOps

## 📦 Contenedores del Sistema

### Frontend - Aplicación Web
- **Tecnología**: React + TypeScript + Vite
- **Responsabilidad**: Interfaz de usuario para lectores y administradores
- **Características**:
  - SPA (Single Page Application)
  - Responsive design
  - PWA capabilities
  - Autenticación JWT

### Backend - API REST
- **Tecnología**: Node.js + Express + TypeScript
- **Responsabilidad**: Lógica de negocio y orquestación de servicios
- **Características**:
  - Arquitectura limpia
  - Validación de datos
  - Manejo de errores
  - Rate limiting
  - Logging estructurado

### Base de Datos Principal
- **Tecnología**: PostgreSQL
- **Responsabilidad**: Persistencia de datos principales
- **Esquemas**:
  - Usuarios y membresías
  - Catálogo de libros
  - Préstamos y reservas
  - Transacciones y multas

### Cache Redis
- **Tecnología**: Redis
- **Responsabilidad**: Cache de sesiones y datos frecuentes
- **Uso**:
  - Sesiones de usuario
  - Resultados de búsqueda
  - Datos de libros populares
  - Rate limiting

## 📊 Diagrama de Contenedores

```mermaid
C4Container
    title Sistema de Biblioteca Digital - Diagrama de Contenedores

    Person(reader, "Lector", "Usuario final que usa la biblioteca")
    Person(admin, "Administrador", "Personal de biblioteca")
    
    Container_Boundary(c1, "Sistema de Biblioteca Digital") {
        Container(webapp, "Aplicación Web", "React + TypeScript", "Proporciona interfaz de usuario para todas las funcionalidades de la biblioteca")
        Container(api, "API REST", "Node.js + Express", "Maneja lógica de negocio, autenticación y orquestación de servicios")
        Container(database, "Base de Datos Principal", "PostgreSQL", "Almacena usuarios, libros, préstamos, reservas y transacciones")
        Container(cache, "Cache", "Redis", "Cache de sesiones, búsquedas y datos frecuentes")
        Container(fileStorage, "Almacenamiento de Archivos", "AWS S3", "Almacena portadas de libros y contenido digital")
    }
    
    System_Ext(contentProvider, "Proveedor de Contenido", "API de libros digitales")
    System_Ext(paymentGateway, "Pasarela de Pago", "Stripe API")
    System_Ext(emailService, "Servicio de Email", "SendGrid API")
    System_Ext(smsService, "Servicio SMS", "Twilio API")
    
    Rel(reader, webapp, "Usa", "HTTPS")
    Rel(admin, webapp, "Administra", "HTTPS")
    
    Rel(webapp, api, "Hace llamadas API", "JSON/HTTPS")
    
    Rel(api, database, "Lee y escribe datos", "SQL/TCP")
    Rel(api, cache, "Cache de datos", "Redis Protocol")
    Rel(api, fileStorage, "Almacena/recupera archivos", "HTTPS")
    
    Rel(api, contentProvider, "Sincroniza catálogo", "JSON/HTTPS")
    Rel(api, paymentGateway, "Procesa pagos", "JSON/HTTPS")
    Rel(api, emailService, "Envía notificaciones", "JSON/HTTPS")
    Rel(api, smsService, "Envía SMS", "JSON/HTTPS")
    
    UpdateElementStyle(webapp, $fontColor="white", $bgColor="#1f77b4")
    UpdateElementStyle(api, $fontColor="white", $bgColor="#ff7f0e")
    UpdateElementStyle(database, $fontColor="white", $bgColor="#2ca02c")
    UpdateElementStyle(cache, $fontColor="white", $bgColor="#d62728")
```

## 🔄 Flujos de Comunicación

### 1. Flujo de Autenticación

```mermaid
sequenceDiagram
    participant U as Usuario
    participant W as Web App
    participant A as API
    participant D as Database
    participant C as Cache

    U->>W: Login (email, password)
    W->>A: POST /auth/login
    A->>D: Validar credenciales
    D-->>A: Usuario válido
    A->>A: Generar JWT
    A->>C: Guardar sesión
    A-->>W: JWT token
    W->>W: Almacenar token
    W-->>U: Redirigir a dashboard
```

### 2. Flujo de Búsqueda de Libros

```mermaid
sequenceDiagram
    participant U as Usuario
    participant W as Web App
    participant A as API
    participant C as Cache
    participant D as Database

    U->>W: Buscar "Clean Architecture"
    W->>A: GET /books/search?q=Clean Architecture
    A->>C: Buscar en cache
    alt Cache hit
        C-->>A: Resultados cacheados
    else Cache miss
        A->>D: SELECT * FROM books WHERE...
        D-->>A: Resultados de DB
        A->>C: Cachear resultados
    end
    A-->>W: Lista de libros
    W-->>U: Mostrar resultados
```

### 3. Flujo de Préstamo Digital

```mermaid
sequenceDiagram
    participant U as Usuario
    participant W as Web App
    participant A as API
    participant D as Database
    participant P as Proveedor Contenido
    participant E as Email Service

    U->>W: Solicitar préstamo libro digital
    W->>A: POST /loans
    A->>D: Validar usuario y libro
    A->>P: Verificar disponibilidad
    P-->>A: Libro disponible
    A->>D: Crear registro de préstamo
    A->>E: Enviar confirmación
    A-->>W: Préstamo creado
    W-->>U: Acceso al libro
```

## 🏗️ Arquitectura de Despliegue

### Desarrollo Local
```
┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │
│   localhost:3000│◄──►│ localhost:3001  │
└─────────────────┘    └─────────────────┘
                              │
                       ┌─────────────────┐
                       │   PostgreSQL    │
                       │   localhost:5432│
                       └─────────────────┘
```

### Producción (AWS)
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CloudFront    │    │   Application   │    │   RDS PostgreSQL│
│   (CDN)         │◄──►│   Load Balancer │◄──►│   (Multi-AZ)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                       ┌─────────────────┐
                       │   ElastiCache   │
                       │   (Redis)       │
                       └─────────────────┘
```

## 📋 Responsabilidades por Contenedor

### Aplicación Web (Frontend)
- **Autenticación**: Login/logout, gestión de tokens
- **Navegación**: Routing, breadcrumbs, menús
- **Búsqueda**: Interfaz de búsqueda avanzada
- **Gestión de Préstamos**: Lista, renovación, devolución
- **Administración**: Paneles para administradores
- **Responsive**: Adaptación a móviles y tablets

### API REST (Backend)
- **Autenticación y Autorización**: JWT, roles, permisos
- **Casos de Uso**: Implementación de lógica de negocio
- **Validación**: Validación de entrada y reglas de negocio
- **Orquestación**: Coordinación de servicios externos
- **Logging y Monitoreo**: Trazabilidad y métricas
- **Rate Limiting**: Protección contra abuso

### Base de Datos Principal
- **Persistencia**: Almacenamiento ACID de datos críticos
- **Integridad**: Constraints y relaciones
- **Performance**: Índices optimizados
- **Backup**: Respaldos automáticos
- **Escalabilidad**: Read replicas para consultas

### Cache (Redis)
- **Sesiones**: Almacenamiento de sesiones de usuario
- **Búsquedas**: Cache de resultados frecuentes
- **Rate Limiting**: Contadores de requests
- **Pub/Sub**: Notificaciones en tiempo real

## 🔒 Consideraciones de Seguridad

### Autenticación y Autorización
- **JWT Tokens**: Stateless authentication
- **RBAC**: Role-based access control
- **HTTPS**: Encriptación en tránsito
- **CORS**: Configuración restrictiva

### Protección de Datos
- **Encriptación**: Datos sensibles en DB
- **Sanitización**: Prevención de SQL injection
- **Rate Limiting**: Protección contra DDoS
- **Audit Logs**: Trazabilidad de acciones

## 📊 Métricas y Monitoreo

### Métricas de Aplicación
- **Response Time**: Latencia de API endpoints
- **Throughput**: Requests por segundo
- **Error Rate**: Porcentaje de errores
- **User Sessions**: Usuarios activos

### Métricas de Infraestructura
- **CPU/Memory**: Utilización de recursos
- **Database**: Conexiones, query performance
- **Cache**: Hit ratio, memory usage
- **Network**: Bandwidth, latency

## 🚀 Próximo Nivel

Con la arquitectura de contenedores clara, podemos profundizar en los componentes internos:

➡️ [**Nivel 3: Componentes**](./components) - Componentes dentro de cada contenedor