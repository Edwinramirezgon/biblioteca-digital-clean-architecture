import { ILoanRepository } from '../../domain/repositories/ILoanRepository';
import { Loan, LoanStatus } from '../../domain/entities/Loan';

export class PostgreSQLLoanRepository implements ILoanRepository {
  private loans: Map<string, Loan> = new Map();

  async findById(id: string): Promise<Loan | null> {
    return this.loans.get(id) || null;
  }

  async save(loan: Loan): Promise<Loan> {
    this.loans.set(loan.id, loan);
    return loan;
  }

  async update(loan: Loan): Promise<Loan> {
    if (!this.loans.has(loan.id)) {
      throw new Error('Préstamo no encontrado');
    }
    this.loans.set(loan.id, loan);
    return loan;
  }

  async delete(id: string): Promise<void> {
    this.loans.delete(id);
  }

  async findByUserId(userId: string): Promise<Loan[]> {
    const loans = Array.from(this.loans.values());
    return loans.filter(loan => loan.userId === userId);
  }

  async findByBookId(bookId: string): Promise<Loan[]> {
    const loans = Array.from(this.loans.values());
    return loans.filter(loan => loan.bookId === bookId);
  }

  async findByStatus(status: LoanStatus): Promise<Loan[]> {
    const loans = Array.from(this.loans.values());
    return loans.filter(loan => loan.status === status);
  }

  async findOverdueLoans(): Promise<Loan[]> {
    const loans = Array.from(this.loans.values());
    return loans.filter(loan => loan.isOverdue());
  }

  async findActiveLoansByUser(userId: string): Promise<Loan[]> {
    const loans = Array.from(this.loans.values());
    return loans.filter(loan => 
      loan.userId === userId && loan.status === LoanStatus.ACTIVE
    );
  }
}