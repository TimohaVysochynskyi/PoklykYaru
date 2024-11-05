import { createSlice } from '@reduxjs/toolkit';
import { fetchCart, addItem, deleteItem, updateItem, } from './operations';
import { CartProductType } from '../../types/Cart.types';

const handlePending = (state: InitialStateType) => {
    state.loading = true;
}

type InitialStateType = {
    items: CartProductType[];
    isOpen: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: InitialStateType = {
    items: [],
    isOpen: false,
    loading: false,
    error: null
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        openCart(state) {
            state.isOpen = true;
        },
        closeCart(state) {
            state.isOpen = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, handlePending)
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.items = action.payload.data;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Unknown error occurred';
            })

            .addCase(addItem.pending, handlePending)
            .addCase(addItem.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
                state.error = null
            }).addCase(addItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Unknown error occurred';
            })

            .addCase(deleteItem.pending, handlePending)
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
                state.error = null
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Unknown error occurred';
            })

            .addCase(updateItem.pending, handlePending)
            .addCase(updateItem.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
                state.error = null
            })
            .addCase(updateItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Unknown error occurred';
            })
    },
});

export const { openCart, closeCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
