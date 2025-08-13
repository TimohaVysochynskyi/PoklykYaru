import { createSlice } from '@reduxjs/toolkit';
import { createInvoice } from './operations';
import { PaymentInvoiceData } from '../../types/Payments.types';

const handlePending = (state: InitialStateType) => {
    state.loading = true;
}

type InitialStateType = {
    invoice: PaymentInvoiceData | null;
    loading: boolean;
    error: string | null;
}

const initialState: InitialStateType = {
    invoice: null,
    loading: false,
    error: null
}

const paymentsSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {
        cancelPayment(state) {
            state.invoice = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createInvoice.pending, handlePending)
            .addCase(createInvoice.fulfilled, (state, action) => {
                state.invoice = action.payload;
                state.loading = false;
                state.error = null
            })
            .addCase(createInvoice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Unknown error occurred';
            })
    },
});

export const { cancelPayment } = paymentsSlice.actions;
export const paymentsReducer = paymentsSlice.reducer;
