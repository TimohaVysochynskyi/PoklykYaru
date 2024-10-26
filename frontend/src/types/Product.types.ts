export type ProductType = {
    _id: string;
    name: string;
    description: string;
    images: Array<string>;
    price: number;
    variations: {
        size: Array<string>;
        color: Array<string>;
    };
    createdAt: string;
    updatedAt: string;
};

type CartItemVariationType = {
    size: Array<string>;
    color: Array<string>
}

export type CartItemType = {
    product: string;
    variation: CartItemVariationType;
    quantity: number;
    price: number;
    newVariation?: CartItemVariationType;
}