import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { IBookRepository } from '../../domain/repositories/IBookRepository';
import { IReservationRepository } from '../../domain/repositories/IReservationRepository';
import { Reservation, ReservationStatus } from '../../domain/entities/Reservation';
import { INotificationService } from '../interfaces/INotificationService';
import { v4 as uuidv4 } from 'uuid';

export class ReserveBookUseCase {
  constructor(
    private userRepository: IUserRepository,
    private bookRepository: IBookRepository,
    private reservationRepository: IReservationRepository,
    private notificationService: INotificationService
  ) {}

  async execute(userId: string, bookId: string): Promise<Reservation> {
    // Validar usuario
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    if (!user.canBorrowBooks()) {
      throw new Error('Usuario no puede hacer reservas');
    }

    // Validar libro
    const book = await this.bookRepository.findById(bookId);
    if (!book) {
      throw new Error('Libro no encontrado');
    }

    if (book.isAvailable()) {
      throw new Error('El libro está disponible, no necesita reserva');
    }

    if (!book.canBeReserved()) {
      throw new Error('El libro no puede ser reservado');
    }

    // Verificar si ya tiene una reserva activa para este libro
    const existingReservations = await this.reservationRepository.findByUserId(userId);
    const hasActiveReservation = existingReservations.some(
      r => r.bookId === bookId && 
           (r.status === ReservationStatus.PENDING || r.status === ReservationStatus.READY)
    );

    if (hasActiveReservation) {
      throw new Error('Ya tienes una reserva activa para este libro');
    }

    // Crear reserva
    const reservationDate = new Date();
    const expirationDate = new Date();
    expirationDate.setDate(reservationDate.getDate() + 7); // 7 días para recoger

    const reservation = new Reservation(
      uuidv4(),
      userId,
      bookId,
      reservationDate,
      expirationDate,
      ReservationStatus.PENDING
    );

    const savedReservation = await this.reservationRepository.save(reservation);

    // Enviar notificación de confirmación
    await this.notificationService.sendNotification({
      userId,
      title: 'Reserva Confirmada',
      message: `Tu reserva para "${book.title}" ha sido confirmada. Te notificaremos cuando esté disponible.`,
      type: 'email'
    });

    return savedReservation;
  }
}