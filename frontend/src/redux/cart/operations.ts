import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { CartItemType } from '../../types/Product.types';
import { UpdateCartItemResponseType } from './types';

export const fetchCart = createAsyncThunk('cart/get', async (_, thunkAPI) => {
    try {
        const res = await axios.get('/cart');

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
    Array<CartItemType>,
    CartItemType,
    { rejectValue: string }
>('cart/add', async (itemInfo, thunkAPI) => {
    try {
        const res = await axios.post('/cart/add', itemInfo);

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
    Array<CartItemType>,
    UpdateCartItemResponseType,
    { rejectValue: string }
>('cart/update', async (itemInfo, thunkAPI) => {
    try {
        const res = await axios.post('/cart/update', itemInfo);

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
    Array<CartItemType>,
    CartItemType,
    { rejectValue: string }
>('cart/delete', async (itemInfo, thunkAPI) => {
    try {
        const res = await axios.post('/cart/delete', itemInfo);

        return res.data.data;
    } catch (error) {
        if (error instanceof Error) {
            return thunkAPI.rejectWithValue(error.message);
        } else {
            return thunkAPI.rejectWithValue('Unknown error occurred');
        }
    }
})