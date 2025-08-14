import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PaymentInvoiceData, SendPaymentRequest } from './types';
import { apiUrl } from '../../../utils/constants';

// Create payment invoice
export const createInvoice = createAsyncThunk<
  PaymentInvoiceData,
  SendPaymentRequest,
  { rejectValue: string }
>(
  'payments/createInvoice', 
  async (paymentInfo, thunkAPI) => {
    try {
      const res = await axios.post(apiUrl('/merch/payments/invoice'), paymentInfo);
      return res.data.data as PaymentInvoiceData;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue('Unknown error occurred');
      }
    }
  }
);