export interface NotificationData {
  userId: string;
  title: string;
  message: string;
  type: 'email' | 'sms' | 'push';
}

export interface INotificationService {
  sendNotification(data: NotificationData): Promise<boolean>;
  sendBookAvailableNotification(userId: string, bookTitle: string): Promise<boolean>;
  sendOverdueNotification(userId: string, bookTitle: string, daysOverdue: number): Promise<boolean>;
  sendReservationReadyNotification(userId: string, bookTitle: string): Promise<boolean>;
}