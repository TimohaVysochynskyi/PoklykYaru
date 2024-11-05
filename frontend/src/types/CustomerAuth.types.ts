import { CartItemType } from "./Cart.types";

export type RegisterCustomerType = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
    email: string | null;
}
export type LoginCustomerType = {
    phoneNumber: string;
    password: string;
}

type ResponseCustomerType = {
    _id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string | null;
    cart: CartItemType[];
    createdAt: string;
    updatedAt: string;
}

export type ResponseType = {
    customer: ResponseCustomerType;
    accessToken: string;
};