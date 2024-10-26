import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { SendPaymentType } from '../../types/Payments.types';
import { PaymentFormData } from '../../types/Payments.types';

export const paymentForm = createAsyncThunk<
    PaymentFormData,
    SendPaymentType,
    { rejectValue: string }
>('payments/form', async (paymentInfo, thunkAPI) => {
    try {
        const res = await axios.post('/payments/form', paymentInfo);

        return res.data;
    } catch (error) {
        if (error instanceof Error) {
            return thunkAPI.rejectWithValue(error.message);
        } else {
            return thunkAPI.rejectWithValue('Unknown error occurred');
        }
    }
})