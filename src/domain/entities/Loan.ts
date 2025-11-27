export enum LoanStatus {
  ACTIVE = 'active',
  RETURNED = 'returned',
  OVERDUE = 'overdue',
  RENEWED = 'renewed'
}

export class Loan {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly bookId: string,
    public readonly loanDate: Date,
    public readonly dueDate: Date,
    public readonly status: LoanStatus,
    public readonly returnDate?: Date,
    public readonly renewalCount: number = 0
  ) {}

  isOverdue(): boolean {
    return this.status === LoanStatus.ACTIVE && new Date() > this.dueDate;
  }

  canBeRenewed(): boolean {
    return this.status === LoanStatus.ACTIVE && 
           this.renewalCount < 2 && 
           !this.isOverdue();
  }

  getDaysUntilDue(): number {
    const today = new Date();
    const diffTime = this.dueDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  calculateFine(): number {
    if (!this.isOverdue()) return 0;
    
    const overdueDays = Math.abs(this.getDaysUntilDue());
    return overdueDays * 0.50; // $0.50 por día de retraso
  }
}