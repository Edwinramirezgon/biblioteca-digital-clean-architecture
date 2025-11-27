export enum BookFormat {
  PHYSICAL = 'physical',
  DIGITAL = 'digital'
}

export enum BookStatus {
  AVAILABLE = 'available',
  BORROWED = 'borrowed',
  RESERVED = 'reserved',
  MAINTENANCE = 'maintenance'
}

export class Book {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly author: string,
    public readonly isbn: string,
    public readonly format: BookFormat,
    public readonly status: BookStatus,
    public readonly totalCopies: number,
    public readonly availableCopies: number,
    public readonly digitalUrl?: string,
    public readonly publishedDate?: Date,
    public readonly genre?: string
  ) {}

  isAvailable(): boolean {
    return this.status === BookStatus.AVAILABLE && this.availableCopies > 0;
  }

  isDigital(): boolean {
    return this.format === BookFormat.DIGITAL;
  }

  canBeReserved(): boolean {
    return this.availableCopies === 0 && this.status !== BookStatus.MAINTENANCE;
  }

  requiresPremium(): boolean {
    // Lógica de negocio: algunos libros digitales requieren membresía premium
    return this.isDigital() && this.publishedDate && 
           this.publishedDate > new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
  }
}