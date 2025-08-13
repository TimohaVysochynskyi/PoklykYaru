import { CartItemType } from "./Cart.types";

export type SendPaymentType = {
    orderProducts: CartItemType[],
    totalPrice: number;
}

export type PaymentInvoiceData = {
    invoiceUrl: string;
    invoiceId: string;
    reference: string;
    orderId: string;
}