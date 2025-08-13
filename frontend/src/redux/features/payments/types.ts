// Payment invoice data
export interface PaymentInvoiceData {
  invoiceUrl: string;
  invoiceId: string;
  reference: string;
  orderId: string;
}

// Payment form data
export interface PaymentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city: string;
  postOffice: string;
  items: any[]; // Define more specific type based on your needs
}

// Payment state interface
export interface PaymentsState {
  invoice: PaymentInvoiceData | null;
  paymentFormData: PaymentFormData | null;
  loading: boolean;
  error: string | null;
}

// Send payment request
export interface SendPaymentRequest {
  orderProducts: any[];
  totalPrice: number;
}