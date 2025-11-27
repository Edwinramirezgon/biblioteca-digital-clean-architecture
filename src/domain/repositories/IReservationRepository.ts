import { Reservation, ReservationStatus } from '../entities/Reservation';

export interface IReservationRepository {
  findById(id: string): Promise<Reservation | null>;
  save(reservation: Reservation): Promise<Reservation>;
  update(reservation: Reservation): Promise<Reservation>;
  delete(id: string): Promise<void>;
  findByUserId(userId: string): Promise<Reservation[]>;
  findByBookId(bookId: string): Promise<Reservation[]>;
  findByStatus(status: ReservationStatus): Promise<Reservation[]>;
  findExpiredReservations(): Promise<Reservation[]>;
  findReadyForNotification(): Promise<Reservation[]>;
}