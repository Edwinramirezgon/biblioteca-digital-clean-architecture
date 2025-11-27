import express from 'express';
import { BookController } from './presentation/controllers/BookController';
import { SearchBooksUseCase } from './application/use-cases/SearchBooksUseCase';
import { BorrowBookUseCase } from './application/use-cases/BorrowBookUseCase';
import { ReserveBookUseCase } from './application/use-cases/ReserveBookUseCase';
import { PostgreSQLUserRepository } from './infrastructure/repositories/PostgreSQLUserRepository';
import { PostgreSQLBookRepository } from './infrastructure/repositories/PostgreSQLBookRepository';
import { PostgreSQLLoanRepository } from './infrastructure/repositories/PostgreSQLLoanRepository';
import { PostgreSQLReservationRepository } from './infrastructure/repositories/PostgreSQLReservationRepository';
import { EmailNotificationService } from './infrastructure/external-services/EmailNotificationService';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Inicializar repositorios
const userRepository = new PostgreSQLUserRepository();
const bookRepository = new PostgreSQLBookRepository();
const loanRepository = new PostgreSQLLoanRepository();
const reservationRepository = new PostgreSQLReservationRepository();

// Inicializar servicios
const notificationService = new EmailNotificationService();

// Inicializar casos de uso
const searchBooksUseCase = new SearchBooksUseCase(bookRepository);
const borrowBookUseCase = new BorrowBookUseCase(userRepository, bookRepository, loanRepository);
const reserveBookUseCase = new ReserveBookUseCase(userRepository, bookRepository, reservationRepository, notificationService);

// Inicializar controladores
const bookController = new BookController(searchBooksUseCase, borrowBookUseCase, reserveBookUseCase);

// Rutas
app.get('/api/books/search', (req, res) => bookController.searchBooks(req, res));
app.post('/api/books/borrow', (req, res) => bookController.borrowBook(req, res));
app.post('/api/books/reserve', (req, res) => bookController.reserveBook(req, res));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Biblioteca Digital API funcionando' });
});

// Inicializar datos de prueba
async function initializeData() {
  await userRepository.seedData();
  await bookRepository.seedData();
  console.log('✅ Datos de prueba inicializados');
}

app.listen(port, async () => {
  await initializeData();
  console.log(`🚀 Servidor ejecutándose en http://localhost:${port}`);
  console.log(`📚 API de Biblioteca Digital - Arquitectura Limpia`);
});

export default app;