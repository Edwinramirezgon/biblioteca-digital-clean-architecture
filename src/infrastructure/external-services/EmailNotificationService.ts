import { INotificationService, NotificationData } from '../../application/interfaces/INotificationService';

export class EmailNotificationService implements INotificationService {
  
  async sendNotification(data: NotificationData): Promise<boolean> {
    try {
      // Simulación de envío de email
      console.log(`📧 Enviando ${data.type} a usuario ${data.userId}:`);
      console.log(`   Título: ${data.title}`);
      console.log(`   Mensaje: ${data.message}`);
      
      // En una implementación real, aquí iría la integración con un servicio como SendGrid, AWS SES, etc.
      await this.simulateEmailSending();
      
      return true;
    } catch (error) {
      console.error('Error enviando notificación:', error);
      return false;
    }
  }

  async sendBookAvailableNotification(userId: string, bookTitle: string): Promise<boolean> {
    return this.sendNotification({
      userId,
      title: 'Libro Disponible',
      message: `El libro "${bookTitle}" que reservaste ya está disponible. Tienes 7 días para recogerlo.`,
      type: 'email'
    });
  }

  async sendOverdueNotification(userId: string, bookTitle: string, daysOverdue: number): Promise<boolean> {
    return this.sendNotification({
      userId,
      title: 'Libro Vencido',
      message: `El libro "${bookTitle}" está vencido por ${daysOverdue} días. Por favor devuélvelo lo antes posible para evitar multas adicionales.`,
      type: 'email'
    });
  }

  async sendReservationReadyNotification(userId: string, bookTitle: string): Promise<boolean> {
    return this.sendNotification({
      userId,
      title: 'Reserva Lista',
      message: `Tu reserva para "${bookTitle}" está lista para recoger. Tienes 7 días para completar el préstamo.`,
      type: 'email'
    });
  }

  private async simulateEmailSending(): Promise<void> {
    // Simular latencia de red
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}