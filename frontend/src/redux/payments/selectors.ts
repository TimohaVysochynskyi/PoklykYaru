import { RootState } from "../store";

export const selectInvoice = (state: RootState) => state.payments.invoice;