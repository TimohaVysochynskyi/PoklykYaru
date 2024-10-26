import { RootState } from "../store";

export const selectPaymentFormData = (state: RootState) => state.payments.paymentFormData;