# 🧪 Testing en Clean Architecture

## 🎯 Estrategia de Testing

La arquitectura limpia facilita enormemente el testing al separar claramente las responsabilidades y permitir el aislamiento de componentes mediante interfaces.

## 📊 Pirámide de Testing Implementada

```mermaid
graph TD
    subgraph "🔺 Pirámide de Testing"
        E2E[🌐 Tests E2E<br/>API Integration Tests<br/>Pocos, Lentos, Costosos]
        INT[🔗 Tests de Integración<br/>Repository + Database<br/>Moderados]
        UNIT[⚡ Tests Unitarios<br/>Entities + Use Cases<br/>Muchos, Rápidos, Baratos]
    end
    
    E2E --> INT
    INT --> UNIT
    
    style E2E fill:#ef4444,stroke:#dc2626,color:#fff
    style INT fill:#f59e0b,stroke:#d97706,color:#fff
    style UNIT fill:#10b981,stroke:#059669,color:#fff
```

## ⚡ Tests Unitarios - Capa de Dominio

### Testing de Entidades

Las entidades contienen la lógica de negocio más crítica y deben estar completamente cubiertas:

<div class="architecture-card layer-domain">

**Book Entity Tests**
```typescript
describe('Book Entity', () => {
  describe('isAvailable', () => {
    it('should return true when book is available and has copies', () => {
      // Arrange
      const book = new Book(
        '1', 'Clean Architecture', 'Robert C. Martin', '978-0134494166',
        BookFormat.PHYSICAL, BookStatus.AVAILABLE, 3, 2
      );
      
      // Act & Assert
      expect(book.isAvailable()).toBe(true);
    });

    it('should return false when book has no available copies', () => {
      const book = new Book(
        '1', 'Title', 'Author', 'ISBN', BookFormat.PHYSICAL,
        BookStatus.AVAILABLE, 3, 0 // ← Sin copias disponibles
      );
      
      expect(book.isAvailable()).toBe(false);
    });

    it('should return false when book is in maintenance', () => {
      const book = new Book(
        '1', 'Title', 'Author', 'ISBN', BookFormat.PHYSICAL,
        BookStatus.MAINTENANCE, 3, 2 // ← Estado de mantenimiento
      );
      
      expect(book.isAvailable()).toBe(false);
    });
  });

  describe('requiresPremium', () => {
    it('should return true for new digital books', () => {
      const recentDate = new Date();
      recentDate.setMonth(recentDate.getMonth() - 6); // 6 meses atrás
      
      const book = new Book(
        '1', 'New Digital Book', 'Author', 'ISBN', 
        BookFormat.DIGITAL, BookStatus.AVAILABLE, 1, 1, 
        'https://example.com/book.pdf', recentDate
      );
      
      expect(book.requiresPremium()).toBe(true);
    });

    it('should return false for old digital books', () => {
      const oldDate = new Date();
      oldDate.setFullYear(oldDate.getFullYear() - 2); // 2 años atrás
      
      const book = new Book(
        '1', 'Old Digital Book', 'Author', 'ISBN',
        BookFormat.DIGITAL, BookStatus.AVAILABLE, 1, 1,
        'https://example.com/book.pdf', oldDate
      );
      
      expect(book.requiresPremium()).toBe(false);
    });
  });
});
```

</div>

<div class="architecture-card layer-domain">

**Loan Entity Tests**
```typescript
describe('Loan Entity', () => {
  describe('isOverdue', () => {
    it('should return true when loan is past due date', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 5); // 5 días atrás
      
      const loan = new Loan(
        '1', 'user1', 'book1', new Date(), pastDate, LoanStatus.ACTIVE
      );
      
      expect(loan.isOverdue()).toBe(true);
    });
  });

  describe('calculateFine', () => {
    it('should calculate correct fine for overdue loan', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 3); // 3 días de retraso
      
      const loan = new Loan(
        '1', 'user1', 'book1', new Date(), pastDate, LoanStatus.ACTIVE
      );
      
      expect(loan.calculateFine()).toBe(1.50); // 3 días × $0.50
    });

    it('should return zero fine for non-overdue loan', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 7); // 7 días en el futuro
      
      const loan = new Loan(
        '1', 'user1', 'book1', new Date(), futureDate, LoanStatus.ACTIVE
      );
      
      expect(loan.calculateFine()).toBe(0);
    });
  });
});
```

</div>

## 📋 Tests Unitarios - Capa de Aplicación

### Testing de Casos de Uso con Mocks

Los casos de uso orquestan múltiples componentes, por lo que usamos mocks para aislar la lógica:

<div class="architecture-card layer-application">

**BorrowBookUseCase Tests**
```typescript
describe('BorrowBookUseCase', () => {
  let useCase: BorrowBookUseCase;
  let mockUserRepository: jest.Mocked<IUserRepository>;
  let mockBookRepository: jest.Mocked<IBookRepository>;
  let mockLoanRepository: jest.Mocked<ILoanRepository>;

  beforeEach(() => {
    // Crear mocks de todas las dependencias
    mockUserRepository = {
      findById: jest.fn(),
      findByEmail: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    };

    mockBookRepository = {
      findById: jest.fn(),
      findByIsbn: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      searchByTitle: jest.fn(),
      searchByAuthor: jest.fn(),
      findByFormat: jest.fn(),
      findAvailableBooks: jest.fn(),
    };

    mockLoanRepository = {
      findById: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findByUserId: jest.fn(),
      findByBookId: jest.fn(),
      findByStatus: jest.fn(),
      findOverdueLoans: jest.fn(),
      findActiveLoansByUser: jest.fn(),
    };

    useCase = new BorrowBookUseCase(
      mockUserRepository,
      mockBookRepository,
      mockLoanRepository
    );
  });

  describe('Successful borrowing', () => {
    it('should successfully borrow an available book', async () => {
      // Arrange
      const user = new User('1', 'user@test.com', 'Test User', 
                           UserRole.READER, MembershipType.FREE, new Date());
      const book = new Book('1', 'Test Book', 'Author', 'ISBN', 
                           BookFormat.PHYSICAL, BookStatus.AVAILABLE, 3, 2);
      const expectedLoan = new Loan('1', '1', '1', new Date(), 
                                   new Date(), LoanStatus.ACTIVE);

      mockUserRepository.findById.mockResolvedValue(user);
      mockBookRepository.findById.mockResolvedValue(book);
      mockLoanRepository.findActiveLoansByUser.mockResolvedValue([]);
      mockLoanRepository.save.mockResolvedValue(expectedLoan);
      mockBookRepository.update.mockResolvedValue(book);

      // Act
      const result = await useCase.execute('1', '1');

      // Assert
      expect(result).toBeDefined();
      expect(result.userId).toBe('1');
      expect(result.bookId).toBe('1');
      expect(mockUserRepository.findById).toHaveBeenCalledWith('1');
      expect(mockBookRepository.findById).toHaveBeenCalledWith('1');
      expect(mockLoanRepository.save).toHaveBeenCalled();
    });
  });

  describe('Error scenarios', () => {
    it('should throw error when user not found', async () => {
      // Arrange
      mockUserRepository.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(useCase.execute('1', '1'))
        .rejects.toThrow('Usuario no encontrado');
    });

    it('should throw error when book not available', async () => {
      // Arrange
      const user = new User('1', 'user@test.com', 'Test User', 
                           UserRole.READER, MembershipType.FREE, new Date());
      const unavailableBook = new Book('1', 'Test Book', 'Author', 'ISBN',
                                      BookFormat.PHYSICAL, BookStatus.BORROWED, 3, 0);

      mockUserRepository.findById.mockResolvedValue(user);
      mockBookRepository.findById.mockResolvedValue(unavailableBook);

      // Act & Assert
      await expect(useCase.execute('1', '1'))
        .rejects.toThrow('Libro no disponible');
    });

    it('should throw error when user exceeds loan limit', async () => {
      // Arrange
      const user = new User('1', 'user@test.com', 'Test User',
                           UserRole.READER, MembershipType.FREE, new Date());
      const book = new Book('1', 'Test Book', 'Author', 'ISBN',
                           BookFormat.PHYSICAL, BookStatus.AVAILABLE, 3, 2);
      const activeLoans = [
        new Loan('1', '1', 'book1', new Date(), new Date(), LoanStatus.ACTIVE),
        new Loan('2', '1', 'book2', new Date(), new Date(), LoanStatus.ACTIVE),
        new Loan('3', '1', 'book3', new Date(), new Date(), LoanStatus.ACTIVE)
      ]; // 3 préstamos activos (límite para usuarios FREE)

      mockUserRepository.findById.mockResolvedValue(user);
      mockBookRepository.findById.mockResolvedValue(book);
      mockLoanRepository.findActiveLoansByUser.mockResolvedValue(activeLoans);

      // Act & Assert
      await expect(useCase.execute('1', '1'))
        .rejects.toThrow('Límite de préstamos alcanzado (3)');
    });

    it('should allow premium users to borrow premium books', async () => {
      // Arrange
      const premiumUser = new User('1', 'premium@test.com', 'Premium User',
                                  UserRole.READER, MembershipType.PREMIUM, new Date());
      const premiumBook = new Book('1', 'New Digital Book', 'Author', 'ISBN',
                                  BookFormat.DIGITAL, BookStatus.AVAILABLE, 1, 1,
                                  'url', new Date()); // Libro reciente que requiere premium

      mockUserRepository.findById.mockResolvedValue(premiumUser);
      mockBookRepository.findById.mockResolvedValue(premiumBook);
      mockLoanRepository.findActiveLoansByUser.mockResolvedValue([]);
      mockLoanRepository.save.mockImplementation(loan => Promise.resolve(loan));
      mockBookRepository.update.mockResolvedValue(premiumBook);

      // Act
      const result = await useCase.execute('1', '1');

      // Assert
      expect(result).toBeDefined();
      expect(mockLoanRepository.save).toHaveBeenCalled();
    });
  });
});
```

</div>

## 🔗 Tests de Integración

### Testing de Repositorios con Base de Datos

<div class="architecture-card layer-infrastructure">

**Repository Integration Tests**
```typescript
describe('PostgreSQLBookRepository Integration', () => {
  let repository: PostgreSQLBookRepository;
  let database: Database;

  beforeAll(async () => {
    // Configurar base de datos de prueba
    database = await setupTestDatabase();
    repository = new PostgreSQLBookRepository(database);
  });

  afterAll(async () => {
    await cleanupTestDatabase(database);
  });

  beforeEach(async () => {
    await clearBooksTable(database);
  });

  describe('findById', () => {
    it('should return book when exists', async () => {
      // Arrange
      const bookData = {
        id: '1',
        title: 'Test Book',
        author: 'Test Author',
        isbn: '123456789',
        format: 'physical',
        status: 'available',
        total_copies: 3,
        available_copies: 2
      };
      await insertBook(database, bookData);

      // Act
      const result = await repository.findById('1');

      // Assert
      expect(result).not.toBeNull();
      expect(result!.title).toBe('Test Book');
      expect(result!.author).toBe('Test Author');
    });

    it('should return null when book does not exist', async () => {
      // Act
      const result = await repository.findById('nonexistent');

      // Assert
      expect(result).toBeNull();
    });
  });

  describe('searchByTitle', () => {
    it('should return books matching title', async () => {
      // Arrange
      await insertBook(database, { 
        id: '1', title: 'Clean Architecture', author: 'Martin' 
      });
      await insertBook(database, { 
        id: '2', title: 'Clean Code', author: 'Martin' 
      });
      await insertBook(database, { 
        id: '3', title: 'Dirty Code', author: 'Someone' 
      });

      // Act
      const results = await repository.searchByTitle('Clean');

      // Assert
      expect(results).toHaveLength(2);
      expect(results.map(b => b.title)).toContain('Clean Architecture');
      expect(results.map(b => b.title)).toContain('Clean Code');
    });
  });
});
```

</div>

## 🌐 Tests End-to-End (E2E)

### Testing de API Completa

<div class="architecture-card layer-presentation">

**API E2E Tests**
```typescript
describe('Books API E2E', () => {
  let app: Application;
  let server: Server;

  beforeAll(async () => {
    app = await createTestApp();
    server = app.listen(0);
  });

  afterAll(async () => {
    await server.close();
  });

  describe('POST /api/books/borrow', () => {
    it('should successfully borrow an available book', async () => {
      // Arrange
      const user = await createTestUser({ membershipType: 'premium' });
      const book = await createTestBook({ status: 'available', availableCopies: 2 });

      // Act
      const response = await request(app)
        .post('/api/books/borrow')
        .set('Authorization', `Bearer ${user.token}`)
        .send({
          userId: user.id,
          bookId: book.id
        });

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.userId).toBe(user.id);
      expect(response.body.data.bookId).toBe(book.id);

      // Verificar que el libro se actualizó
      const updatedBook = await getBookById(book.id);
      expect(updatedBook.availableCopies).toBe(1);
    });

    it('should return 400 when book is not available', async () => {
      // Arrange
      const user = await createTestUser();
      const book = await createTestBook({ status: 'borrowed', availableCopies: 0 });

      // Act
      const response = await request(app)
        .post('/api/books/borrow')
        .set('Authorization', `Bearer ${user.token}`)
        .send({
          userId: user.id,
          bookId: book.id
        });

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('no disponible');
    });
  });

  describe('GET /api/books/search', () => {
    it('should return books matching search criteria', async () => {
      // Arrange
      await createTestBook({ title: 'Clean Architecture', author: 'Martin' });
      await createTestBook({ title: 'Clean Code', author: 'Martin' });
      await createTestBook({ title: 'Dirty Code', author: 'Someone' });

      // Act
      const response = await request(app)
        .get('/api/books/search')
        .query({ title: 'Clean', availableOnly: 'true' });

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.count).toBe(2);
    });
  });
});
```

</div>

## 📊 Configuración de Coverage

### Jest Configuration para Coverage

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts', // Excluir punto de entrada
    '!src/**/*.test.ts', // Excluir archivos de test
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html', 'json'],
  coverageThresholds: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    },
    // Requerir mayor cobertura en dominio y aplicación
    'src/domain/**/*.ts': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    },
    'src/application/**/*.ts': {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85
    }
  }
};
```

## 🛠️ Herramientas de Testing

### Scripts de NPM

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:unit": "jest --testPathPattern=unit",
    "test:integration": "jest --testPathPattern=integration",
    "test:e2e": "jest --testPathPattern=e2e",
    "test:ci": "jest --coverage --watchAll=false --ci"
  }
}
```

### Configuración de CI/CD

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_PASSWORD: test
          POSTGRES_DB: biblioteca_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run unit tests
      run: npm run test:unit
    
    - name: Run integration tests
      run: npm run test:integration
      env:
        DATABASE_URL: postgresql://postgres:test@localhost:5432/biblioteca_test
    
    - name: Run E2E tests
      run: npm run test:e2e
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
```

## ✅ Beneficios del Testing en Clean Architecture

### 1. **Aislamiento Perfecto**
- Cada capa se puede testear independientemente
- Mocks sencillos gracias a las interfaces
- Tests rápidos y confiables

### 2. **Cobertura Completa**
- Lógica de negocio 100% cubierta
- Casos de uso completamente testeados
- Integración verificada

### 3. **Refactoring Seguro**
- Tests actúan como red de seguridad
- Cambios internos no rompen tests
- Confianza para evolucionar el código

### 4. **Documentación Viva**
- Tests documentan comportamiento esperado
- Ejemplos de uso de las APIs
- Especificaciones ejecutables

---

Esta estrategia de testing demuestra cómo Clean Architecture facilita enormemente la creación de tests mantenibles, rápidos y confiables, proporcionando una base sólida para el desarrollo continuo del sistema.