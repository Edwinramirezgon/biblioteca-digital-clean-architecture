# Nivel 1: Diagrama de Contexto del Sistema

## 🎯 Propósito

El diagrama de contexto muestra el **Sistema de Biblioteca Digital** como una caja negra, enfocándose en las personas que lo usan y los sistemas externos con los que interactúa.

**Audiencia**: Todos los stakeholders (técnicos y no técnicos)

## 👥 Actores Principales

### Lectores (Usuarios Finales)
- **Rol**: Usuarios que consumen contenido de la biblioteca
- **Actividades**:
  - Buscar libros por título, autor o género
  - Leer libros digitales en línea
  - Tomar libros prestados (físicos y digitales)
  - Reservar libros no disponibles
  - Ver historial de préstamos
  - Recibir notificaciones

### Administradores
- **Rol**: Personal de la biblioteca que gestiona el sistema
- **Actividades**:
  - Gestionar inventario de libros
  - Administrar usuarios y membresías
  - Configurar políticas de préstamo
  - Generar reportes
  - Gestionar reservas y multas

## 🔗 Sistemas Externos

### Proveedor de Contenido Digital
- **Propósito**: Suministra libros en formato digital
- **Interacción**: 
  - Sincronización de catálogo
  - Descarga de contenido
  - Validación de licencias
- **Ejemplos**: OverDrive, Hoopla, bibliotecas digitales

### Pasarela de Pago
- **Propósito**: Procesa pagos de membresías premium
- **Interacción**:
  - Procesamiento de pagos
  - Validación de transacciones
  - Gestión de reembolsos
- **Ejemplos**: Stripe, PayPal, Square

### Servicio de Notificaciones
- **Propósito**: Envía comunicaciones a los usuarios
- **Interacción**:
  - Notificaciones por email
  - SMS para recordatorios urgentes
  - Push notifications (futuro)
- **Ejemplos**: SendGrid, AWS SES, Twilio

## 📊 Diagrama de Contexto

```mermaid
C4Context
    title Sistema de Biblioteca Digital - Diagrama de Contexto

    Person(reader, "Lector", "Usuario que busca, lee y toma prestados libros físicos y digitales")
    Person(admin, "Administrador de Biblioteca", "Personal que gestiona inventario, usuarios y políticas del sistema")
    
    System(biblioteca, "Sistema de Biblioteca Digital", "Permite la gestión completa de una biblioteca: préstamos, reservas, lectura digital y administración")
    
    System_Ext(contentProvider, "Proveedor de Contenido Digital", "Plataforma externa que suministra libros electrónicos y audiolibros")
    System_Ext(paymentGateway, "Pasarela de Pago", "Servicio externo para procesar pagos de membresías premium")
    System_Ext(emailService, "Servicio de Email", "Plataforma para envío de notificaciones y comunicaciones")
    System_Ext(smsService, "Servicio SMS", "Plataforma para envío de recordatorios urgentes")
    
    Rel(reader, biblioteca, "Busca libros, hace préstamos, reservas y lee contenido digital", "Web Browser / Mobile App")
    Rel(admin, biblioteca, "Gestiona inventario, usuarios, políticas y genera reportes", "Web Browser")
    
    Rel(biblioteca, contentProvider, "Sincroniza catálogo y obtiene contenido digital", "API REST / HTTPS")
    Rel(biblioteca, paymentGateway, "Procesa pagos de membresías", "API REST / HTTPS")
    Rel(biblioteca, emailService, "Envía notificaciones y recordatorios", "API REST / HTTPS")
    Rel(biblioteca, smsService, "Envía alertas urgentes", "API REST / HTTPS")
    
    UpdateElementStyle(reader, $fontColor="white", $bgColor="#1f77b4")
    UpdateElementStyle(admin, $fontColor="white", $bgColor="#ff7f0e")
    UpdateElementStyle(biblioteca, $fontColor="white", $bgColor="#2ca02c")
```

## 🔄 Flujos de Interacción Principales

### 1. Flujo de Préstamo de Libro Digital

```mermaid
sequenceDiagram
    participant L as Lector
    participant S as Sistema Biblioteca
    participant P as Proveedor Contenido
    participant E as Servicio Email

    L->>S: Busca libro digital
    S-->>L: Muestra resultados
    L->>S: Solicita préstamo
    S->>P: Valida disponibilidad
    P-->>S: Confirma disponibilidad
    S->>S: Crea préstamo
    S->>E: Envía confirmación
    E-->>L: Email de confirmación
    S-->>L: Acceso al libro
```

### 2. Flujo de Pago de Membresía Premium

```mermaid
sequenceDiagram
    participant L as Lector
    participant S as Sistema Biblioteca
    participant P as Pasarela Pago
    participant E as Servicio Email

    L->>S: Solicita upgrade a premium
    S-->>L: Muestra opciones de pago
    L->>S: Selecciona plan y método
    S->>P: Procesa pago
    P-->>S: Confirma transacción
    S->>S: Actualiza membresía
    S->>E: Envía confirmación
    E-->>L: Email de bienvenida premium
    S-->>L: Acceso a funciones premium
```

## 📋 Casos de Uso Principales

### Para Lectores
1. **Búsqueda de Libros**: Encontrar libros por múltiples criterios
2. **Préstamo Digital**: Acceder a libros electrónicos
3. **Préstamo Físico**: Reservar libros físicos para recoger
4. **Gestión de Reservas**: Ver y cancelar reservas activas
5. **Historial Personal**: Consultar préstamos anteriores
6. **Upgrade de Membresía**: Acceder a funciones premium

### Para Administradores
1. **Gestión de Inventario**: Agregar, editar y eliminar libros
2. **Administración de Usuarios**: Gestionar cuentas y membresías
3. **Configuración de Políticas**: Definir reglas de préstamo
4. **Reportes y Analytics**: Generar estadísticas de uso
5. **Gestión de Multas**: Administrar pagos y penalizaciones

## 🎯 Objetivos del Sistema

### Objetivos de Negocio
- **Aumentar el acceso** a recursos bibliotecarios
- **Modernizar** la experiencia del usuario
- **Optimizar** la gestión de recursos
- **Generar ingresos** a través de membresías premium

### Objetivos Técnicos
- **Escalabilidad** para miles de usuarios concurrentes
- **Disponibilidad** 24/7 con mínimo downtime
- **Seguridad** de datos personales y transacciones
- **Integración** fluida con sistemas externos

## 🚀 Próximo Nivel

Una vez entendido el contexto general, podemos profundizar en la arquitectura interna:

➡️ [**Nivel 2: Contenedores**](./containers) - Arquitectura de alto nivel del sistema