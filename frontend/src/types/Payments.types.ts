import { CartItemType } from "./Product.types";

export type SendPaymentType = {
    orderProducts: Array<CartItemType>,
    totalPrice: number;
}

export type PaymentFormData = {
    data: string;
    signature: string;
}