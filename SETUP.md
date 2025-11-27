# 🚀 Guía de Configuración - Biblioteca Digital Clean Architecture

## 📋 Prerrequisitos

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0
- **Git** >= 2.30.0
- **PostgreSQL** >= 13.0 (opcional para desarrollo)

## 🛠️ Instalación Local

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/biblioteca-digital-clean-architecture.git
cd biblioteca-digital-clean-architecture
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

```bash
cp .env.example .env
```

Editar `.env` con tus configuraciones:

```env
# Base de datos
DATABASE_URL=postgresql://usuario:password@localhost:5432/biblioteca_db
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=tu_jwt_secret_muy_seguro
JWT_EXPIRES_IN=24h

# Servicios externos
SENDGRID_API_KEY=tu_sendgrid_api_key
STRIPE_SECRET_KEY=tu_stripe_secret_key
STRIPE_WEBHOOK_SECRET=tu_stripe_webhook_secret

# Configuración del servidor
PORT=3001
NODE_ENV=development
```

### 4. Ejecutar en Desarrollo

```bash
# Iniciar el servidor de desarrollo
npm run dev

# En otra terminal, iniciar la documentación
npm run docs:dev
```

### 5. Ejecutar Tests

```bash
# Tests unitarios
npm test

# Tests con coverage
npm run test:coverage

# Tests en modo watch
npm run test:watch
```

## 🐳 Configuración con Docker

### 1. Docker Compose para Desarrollo

```bash
# Iniciar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f api

# Parar servicios
docker-compose down
```

### 2. Crear archivo `docker-compose.yml`

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:password@db:5432/biblioteca_db
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    volumes:
      - .:/app
      - /app/node_modules

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=biblioteca_db
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

## 📊 Base de Datos

### 1. Configuración de PostgreSQL

```sql
-- Crear base de datos
CREATE DATABASE biblioteca_db;

-- Crear usuario
CREATE USER biblioteca_user WITH PASSWORD 'tu_password';
GRANT ALL PRIVILEGES ON DATABASE biblioteca_db TO biblioteca_user;
```

### 2. Ejecutar Migraciones

```bash
# Crear tablas
npm run db:migrate

# Poblar con datos de prueba
npm run db:seed
```

## 🌐 Despliegue en Producción

### 1. Configuración de GitHub Pages

La documentación se despliega automáticamente en GitHub Pages cuando haces push a `main`.

**Configurar en GitHub:**

1. Ve a **Settings** > **Pages**
2. Selecciona **GitHub Actions** como source
3. El workflow `.github/workflows/deploy-docs.yml` se ejecutará automáticamente

### 2. Despliegue de la API

#### Opción A: Heroku

```bash
# Instalar Heroku CLI
npm install -g heroku

# Login y crear app
heroku login
heroku create biblioteca-digital-api

# Configurar variables de entorno
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=tu_jwt_secret_produccion
heroku config:set DATABASE_URL=tu_database_url_produccion

# Desplegar
git push heroku main
```

#### Opción B: AWS/Vercel/Railway

```bash
# Para Vercel
npm install -g vercel
vercel --prod

# Para Railway
npm install -g @railway/cli
railway login
railway deploy
```

### 3. Variables de Entorno de Producción

```env
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://user:pass@host:5432/db
REDIS_URL=redis://host:6379
JWT_SECRET=super_secure_jwt_secret_production
SENDGRID_API_KEY=real_sendgrid_key
STRIPE_SECRET_KEY=real_stripe_key
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo con hot reload
npm run docs:dev         # Documentación en desarrollo

# Construcción
npm run build            # Compilar TypeScript
npm run docs:build       # Construir documentación

# Testing
npm test                 # Ejecutar tests
npm run test:watch       # Tests en modo watch
npm run test:coverage    # Tests con coverage

# Base de datos
npm run db:migrate       # Ejecutar migraciones
npm run db:seed          # Poblar con datos de prueba
npm run db:reset         # Resetear base de datos

# Linting y formato
npm run lint             # Ejecutar ESLint
npm run lint:fix         # Corregir errores de linting
npm run format           # Formatear código con Prettier

# Producción
npm start                # Ejecutar en producción
```

## 📁 Estructura de Archivos de Configuración

```
proyecto/
├── .env.example         # Plantilla de variables de entorno
├── .gitignore          # Archivos ignorados por Git
├── docker-compose.yml  # Configuración de Docker
├── Dockerfile          # Imagen de Docker
├── jest.config.js      # Configuración de Jest
├── tsconfig.json       # Configuración de TypeScript
├── package.json        # Dependencias y scripts
└── .github/
    └── workflows/
        └── deploy-docs.yml  # CI/CD para documentación
```

## 🐛 Solución de Problemas

### Error: "Cannot find module"

```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error de conexión a PostgreSQL

```bash
# Verificar que PostgreSQL esté ejecutándose
sudo service postgresql status

# Verificar conexión
psql -h localhost -U postgres -d biblioteca_db
```

### Error de permisos en Docker

```bash
# Dar permisos al directorio
sudo chown -R $USER:$USER .

# Reconstruir contenedores
docker-compose down
docker-compose build --no-cache
docker-compose up
```

### Tests fallan

```bash
# Verificar configuración de Jest
npm run test -- --verbose

# Ejecutar un test específico
npm test -- Book.test.ts
```

## 📚 Recursos Adicionales

- [**Documentación Completa**](https://tu-usuario.github.io/biblioteca-digital-clean-architecture/)
- [**Clean Architecture**](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [**Modelo C4**](https://c4model.com/)
- [**TypeScript Handbook**](https://www.typescriptlang.org/docs/)
- [**Jest Testing Framework**](https://jestjs.io/docs/getting-started)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.