import { RootState } from "../store";

export const selectCart = (state: RootState) => state.cart.items;

export const selectIsCartOpen = (state: RootState) => state.cart.isOpen;