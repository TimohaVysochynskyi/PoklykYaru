import { createSlice } from '@reduxjs/toolkit';
import { paymentForm } from './operations';
import { PaymentFormData } from '../../types/Payments.types';

const handlePending = (state: InitialStateType) => {
    state.loading = true;
}

type InitialStateType = {
    paymentFormData: PaymentFormData | null;
    loading: boolean;
    error: string | null;
}

const initialState: InitialStateType = {
    paymentFormData: null,
    loading: false,
    error: null
}

const paymentsSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {
        cancelPayment(state) {
            state.paymentFormData = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(paymentForm.pending, handlePending)
            .addCase(paymentForm.fulfilled, (state, action) => {
                state.paymentFormData = action.payload;
                state.loading = false;
                state.error = null
            })
            .addCase(paymentForm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Unknown error occurred';
            })
    },
});

export const { cancelPayment } = paymentsSlice.actions;
export const paymentsReducer = paymentsSlice.reducer;
