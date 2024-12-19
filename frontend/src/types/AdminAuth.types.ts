export type LoginAdminType = {
    psevdo: string;
    password: string;
}

type ResponseAdminType = {
    _id: string;
    psevdo: string;
    telegramContact: string;
    email: string;
    phoneNumber: string;
}

export type ResponseType = {
    admin: ResponseAdminType;
    accessToken: string;
};