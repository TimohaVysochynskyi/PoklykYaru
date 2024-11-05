import { ProductType } from "./Product.types";

type CartItemVariationType = {
    size: string[];
    color: string[];
}


export type CartItemType = {
    _id?: string;
    product: string;
    variation: CartItemVariationType;
    quantity: number;
    price: number;
    newVariation?: CartItemVariationType;
}

export type CartProductType = CartItemType & { productData: ProductType; }

export type UpdateCartItemResponseType = CartProductType & { action: string };