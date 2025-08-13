import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { SendPaymentType, PaymentInvoiceData } from '../../types/Payments.types';
import { apiUrl } from '../../utils/constants';

export const createInvoice = createAsyncThunk<
    PaymentInvoiceData,
    SendPaymentType,
    { rejectValue: string }
>('payments/createInvoice', async (paymentInfo, thunkAPI) => {
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
})