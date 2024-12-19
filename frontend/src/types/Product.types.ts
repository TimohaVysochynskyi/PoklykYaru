export type ProductType = {
    _id?: string;
    name: string;
    description: string;
    price: number;
    composition: string;
    category: string;
    images: string[];
    variations: {
        size: string[];
        color: string[];
    };
    stock: number;
    createdAt?: string;
    updatedAt?: string;
};

export type CategoryType = {
    _id?: string;
    name: string
}