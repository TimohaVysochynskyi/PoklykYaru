import { ProductType } from "./Product.types";

type CartItemVariationType = {
    size: string[];
    color: string[];
}


export type CartItemType = {
    product: string;
    variation: CartItemVariationType;
    quantity: number;
    price: number;
    newVariation?: CartItemVariationType;
    productData: ProductType;
}

export type UpdateCartItemResponseType = CartItemType & { action: string };