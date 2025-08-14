import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createInvoice } from './operations';
import { PaymentsState, PaymentFormData } from './types';

const initialState: PaymentsState = {
  invoice: null,
  paymentFormData: null,
  loading: false,
  error: null
};

// Helper function for pending state
const handlePending = (state: PaymentsState) => {
  state.loading = true;
  state.error = null;
};

// Helper function for rejected state
const handleRejected = (state: PaymentsState, action: PayloadAction<string | undefined>) => {
  state.loading = false;
  state.error = action.payload || 'Unknown error occurred';
};

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    cancelPayment: (state) => {
      state.invoice = null;
    },
    setPaymentFormData: (state, action: PayloadAction<PaymentFormData>) => {
      state.paymentFormData = action.payload;
    },
    clearPaymentFormData: (state) => {
      state.paymentFormData = null;
    },
    clearPaymentError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create invoice cases
      .addCase(createInvoice.pending, handlePending)
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.invoice = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(createInvoice.rejected, handleRejected);
  },
});

export const { 
  cancelPayment, 
  setPaymentFormData, 
  clearPaymentFormData, 
  clearPaymentError 
} = paymentsSlice.actions;

export const paymentsReducer = paymentsSlice.reducer;