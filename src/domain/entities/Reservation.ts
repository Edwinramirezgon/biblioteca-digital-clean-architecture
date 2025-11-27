export enum ReservationStatus {
  PENDING = 'pending',
  READY = 'ready',
  EXPIRED = 'expired',
  FULFILLED = 'fulfilled',
  CANCELLED = 'cancelled'
}

export class Reservation {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly bookId: string,
    public readonly reservationDate: Date,
    public readonly expirationDate: Date,
    public readonly status: ReservationStatus,
    public readonly notificationSent: boolean = false
  ) {}

  isExpired(): boolean {
    return new Date() > this.expirationDate;
  }

  canBeFulfilled(): boolean {
    return this.status === ReservationStatus.READY && !this.isExpired();
  }

  needsNotification(): boolean {
    return this.status === ReservationStatus.READY && !this.notificationSent;
  }

  getDaysUntilExpiration(): number {
    const today = new Date();
    const diffTime = this.expirationDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}