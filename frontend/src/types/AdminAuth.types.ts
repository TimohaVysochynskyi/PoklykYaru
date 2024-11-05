export type LoginAdminType = {
    psevdo: string;
    password: string;
}

type ResponseAdminType = {
    _id: string;
    psevdo: string;
    createdAt: string;
    updatedAt: string;
}

export type ResponseType = {
    admin: ResponseAdminType;
    accessToken: string;
};