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
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string | null;
    cart: Array<object>;
    createdAt: string;
    updatedAt: string;
}

export type ResponseType = {
    customer: ResponseCustomerType;
    accessToken: string;
};