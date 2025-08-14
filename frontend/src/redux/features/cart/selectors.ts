import { RootState } from '../../store';
import { createSelector } from '@reduxjs/toolkit';

// Basic selectors
export const selectCartState = (state: RootState) => state.cart;

export const selectCart = (state: RootState) => state.cart.items;

export const selectIsCartOpen = (state: RootState) => state.cart.isOpen;

export const selectCartLoading = (state: RootState) => state.cart.loading;

export const selectCartError = (state: RootState) => state.cart.error;

// Memoized selectors
export const selectCartItemsCount = createSelector(
  [selectCart],
  (items) => items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotalPrice = createSelector(
  [selectCart],
  (items) => items.reduce((total, item) => total + (item.price * item.quantity), 0)
);

export const selectCartItemById = (productId: string) => createSelector(
  [selectCart],
  (items) => items.find(item => item.product === productId)
);

export const selectCartIsEmpty = createSelector(
  [selectCart],
  (items) => items.length === 0
);

export const selectCartSummary = createSelector(
  [selectCartItemsCount, selectCartTotalPrice, selectCartIsEmpty],
  (itemsCount, totalPrice, isEmpty) => ({
    itemsCount,
    totalPrice,
    isEmpty
  })
);