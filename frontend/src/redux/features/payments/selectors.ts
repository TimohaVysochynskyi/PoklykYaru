import { RootState } from '../../store';
import { createSelector } from '@reduxjs/toolkit';

// Basic selectors
export const selectPaymentsState = (state: RootState) => state.payments;

export const selectPaymentInvoice = (state: RootState) => state.payments.invoice;

export const selectPaymentFormData = (state: RootState) => state.payments.paymentFormData;

export const selectPaymentLoading = (state: RootState) => state.payments.loading;

export const selectPaymentError = (state: RootState) => state.payments.error;

// Memoized selectors
export const selectInvoiceUrl = createSelector(
  [selectPaymentInvoice],
  (invoice) => invoice?.invoiceUrl || null
);

export const selectInvoiceId = createSelector(
  [selectPaymentInvoice],
  (invoice) => invoice?.invoiceId || null
);

export const selectHasInvoice = createSelector(
  [selectPaymentInvoice],
  (invoice) => !!invoice
);

export const selectPaymentSummary = createSelector(
  [selectPaymentInvoice, selectInvoiceUrl, selectInvoiceId],
  (invoice, invoiceUrl, invoiceId) => ({
    invoice,
    invoiceUrl,
    invoiceId,
    hasInvoice: !!invoice
  })
);