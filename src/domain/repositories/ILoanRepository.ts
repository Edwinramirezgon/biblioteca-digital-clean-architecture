import { Loan, LoanStatus } from '../entities/Loan';

export interface ILoanRepository {
  findById(id: string): Promise<Loan | null>;
  save(loan: Loan): Promise<Loan>;
  update(loan: Loan): Promise<Loan>;
  delete(id: string): Promise<void>;
  findByUserId(userId: string): Promise<Loan[]>;
  findByBookId(bookId: string): Promise<Loan[]>;
  findByStatus(status: LoanStatus): Promise<Loan[]>;
  findOverdueLoans(): Promise<Loan[]>;
  findActiveLoansByUser(userId: string): Promise<Loan[]>;
}