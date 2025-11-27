export interface PaymentData {
  userId: string;
  amount: number;
  currency: string;
  description: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  errorMessage?: string;
}

export interface IPaymentService {
  processPayment(paymentData: PaymentData): Promise<PaymentResult>;
  refundPayment(transactionId: string): Promise<PaymentResult>;
  validatePayment(transactionId: string): Promise<boolean>;
}