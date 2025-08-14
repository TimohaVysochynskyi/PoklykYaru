import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCart, addItem, deleteItem, updateItem } from './operations';
import { CartState } from './types';

const initialState: CartState = {
  items: [],
  isOpen: false,
  loading: false,
  error: null
};

// Helper function for pending state
const handlePending = (state: CartState) => {
  state.loading = true;
  state.error = null;
};

// Helper function for rejected state
const handleRejected = (state: CartState, action: PayloadAction<string | undefined>) => {
  state.loading = false;
  state.error = action.payload || 'Unknown error occurred';
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    clearCartError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart cases
      .addCase(fetchCart.pending, handlePending)
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCart.rejected, handleRejected)

      // Add item cases
      .addCase(addItem.pending, handlePending)
      .addCase(addItem.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(addItem.rejected, handleRejected)

      // Delete item cases
      .addCase(deleteItem.pending, handlePending)
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteItem.rejected, handleRejected)

      // Update item cases
      .addCase(updateItem.pending, handlePending)
      .addCase(updateItem.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateItem.rejected, handleRejected);
  },
});

export const { openCart, closeCart, clearCartError } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;