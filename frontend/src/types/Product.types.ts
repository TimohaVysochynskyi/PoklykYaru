export type ProductType = {
    _id: string;
    name: string;
    description: string;
    images: string[];
    price: number;
    composition: string;
    variations: {
        size: string[];
        color: string[];
    };
    createdAt: string;
    updatedAt: string;
};