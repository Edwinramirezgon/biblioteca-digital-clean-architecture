import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { IBookRepository } from '../../domain/repositories/IBookRepository';
import { ILoanRepository } from '../../domain/repositories/ILoanRepository';
import { Loan, LoanStatus } from '../../domain/entities/Loan';
import { BookStatus } from '../../domain/entities/Book';
import { v4 as uuidv4 } from 'uuid';

export class BorrowBookUseCase {
  constructor(
    private userRepository: IUserRepository,
    private bookRepository: IBookRepository,
    private loanRepository: ILoanRepository
  ) {}

  async execute(userId: string, bookId: string): Promise<Loan> {
    // Validar usuario
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    if (!user.canBorrowBooks()) {
      throw new Error('Usuario no puede tomar libros prestados');
    }

    // Validar libro
    const book = await this.bookRepository.findById(bookId);
    if (!book) {
      throw new Error('Libro no encontrado');
    }

    if (!book.isAvailable()) {
      throw new Error('Libro no disponible');
    }

    // Verificar si requiere membresía premium
    if (book.requiresPremium() && !user.isPremium()) {
      throw new Error('Este libro requiere membresía premium');
    }

    // Verificar límite de préstamos activos
    const activeLoans = await this.loanRepository.findActiveLoansByUser(userId);
    const maxLoans = user.isPremium() ? 10 : 3;
    
    if (activeLoans.length >= maxLoans) {
      throw new Error(`Límite de préstamos alcanzado (${maxLoans})`);
    }

    // Crear préstamo
    const loanDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(loanDate.getDate() + (book.isDigital() ? 21 : 14)); // 3 semanas digital, 2 físico

    const loan = new Loan(
      uuidv4(),
      userId,
      bookId,
      loanDate,
      dueDate,
      LoanStatus.ACTIVE
    );

    // Actualizar disponibilidad del libro
    const updatedBook = new (book.constructor as any)(
      book.id,
      book.title,
      book.author,
      book.isbn,
      book.format,
      book.availableCopies === 1 ? BookStatus.BORROWED : book.status,
      book.totalCopies,
      book.availableCopies - 1,
      book.digitalUrl,
      book.publishedDate,
      book.genre
    );

    await this.bookRepository.update(updatedBook);
    return await this.loanRepository.save(loan);
  }
}