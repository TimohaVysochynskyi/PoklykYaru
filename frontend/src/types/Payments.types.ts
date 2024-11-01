import { CartItemType } from "./Cart.types";

export type SendPaymentType = {
    orderProducts: CartItemType[],
    totalPrice: number;
}

export type PaymentFormData = {
    data: string;
    signature: string;
}