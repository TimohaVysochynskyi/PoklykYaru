
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { CartItemType, CartProductType, UpdateCartItemResponseType } from '../../types/Cart.types';
import { apiUrl } from '../../utils/constants';

const URL = apiUrl('/merch/cart');

export const fetchCart = createAsyncThunk('cart/get', async (_, thunkAPI) => {
    try {
        const res = await axios.get(`${URL}/`);

        return res.data;
    } catch (error) {
        if (error instanceof Error) {
            return thunkAPI.rejectWithValue(error.message);
        } else {
            return thunkAPI.rejectWithValue('Unknown error occurred');
        }
    }
})

export const addItem = createAsyncThunk<
    CartProductType[],
    CartItemType,
    { rejectValue: string }
>('cart/add', async (itemInfo, thunkAPI) => {
    try {
        const res = await axios.post(`${URL}/add`, itemInfo);

        return res.data.data;
    } catch (error) {
        if (error instanceof Error) {
            return thunkAPI.rejectWithValue(error.message);
        } else {
            return thunkAPI.rejectWithValue('Unknown error occurred');
        }
    }
})

export const updateItem = createAsyncThunk<
    CartProductType[],
    UpdateCartItemResponseType,
    { rejectValue: string }
>('cart/update', async (itemInfo, thunkAPI) => {
    try {
        const res = await axios.post(`${URL}/update`, itemInfo);

        return res.data.data;
    } catch (error) {
        if (error instanceof Error) {
            return thunkAPI.rejectWithValue(error.message);
        } else {
            return thunkAPI.rejectWithValue('Unknown error occurred');
        }
    }
})

export const deleteItem = createAsyncThunk<
    CartProductType[],
    CartItemType,
    { rejectValue: string }
>('cart/delete', async (itemInfo, thunkAPI) => {
    try {
        const res = await axios.post(`${URL}/delete`, itemInfo);

        return res.data.data;
    } catch (error) {
        if (error instanceof Error) {
            return thunkAPI.rejectWithValue(error.message);
        } else {
            return thunkAPI.rejectWithValue('Unknown error occurred');
        }
    }
})