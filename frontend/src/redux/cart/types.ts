import { CartItemType } from "../../types/Product.types";

type ActionType = {
    action: string;
}
export type UpdateCartItemResponseType = CartItemType & ActionType;