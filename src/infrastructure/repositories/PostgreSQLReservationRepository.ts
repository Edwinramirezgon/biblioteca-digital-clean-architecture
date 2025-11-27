import { IReservationRepository } from '../../domain/repositories/IReservationRepository';
import { Reservation, ReservationStatus } from '../../domain/entities/Reservation';

export class PostgreSQLReservationRepository implements IReservationRepository {
  private reservations: Map<string, Reservation> = new Map();

  async findById(id: string): Promise<Reservation | null> {
    return this.reservations.get(id) || null;
  }

  async save(reservation: Reservation): Promise<Reservation> {
    this.reservations.set(reservation.id, reservation);
    return reservation;
  }

  async update(reservation: Reservation): Promise<Reservation> {
    if (!this.reservations.has(reservation.id)) {
      throw new Error('Reserva no encontrada');
    }
    this.reservations.set(reservation.id, reservation);
    return reservation;
  }

  async delete(id: string): Promise<void> {
    this.reservations.delete(id);
  }

  async findByUserId(userId: string): Promise<Reservation[]> {
    const reservations = Array.from(this.reservations.values());
    return reservations.filter(reservation => reservation.userId === userId);
  }

  async findByBookId(bookId: string): Promise<Reservation[]> {
    const reservations = Array.from(this.reservations.values());
    return reservations.filter(reservation => reservation.bookId === bookId);
  }

  async findByStatus(status: ReservationStatus): Promise<Reservation[]> {
    const reservations = Array.from(this.reservations.values());
    return reservations.filter(reservation => reservation.status === status);
  }

  async findExpiredReservations(): Promise<Reservation[]> {
    const reservations = Array.from(this.reservations.values());
    return reservations.filter(reservation => reservation.isExpired());
  }

  async findReadyForNotification(): Promise<Reservation[]> {
    const reservations = Array.from(this.reservations.values());
    return reservations.filter(reservation => reservation.needsNotification());
  }
}