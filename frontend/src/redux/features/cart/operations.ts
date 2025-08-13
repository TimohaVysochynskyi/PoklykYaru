import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CartProduct, CartItem, UpdateCartItemRequest, CartResponse } from './types';

const URL = `http://localhost:3000/merch/cart`;

// Fetch cart items
export const fetchCart = createAsyncThunk<
  CartResponse,
  void,
  { rejectValue: string }
>(
  'cart/fetchCart', 
  async (_, thunkAPI) => {
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
  }
);

// Add item to cart
export const addItem = createAsyncThunk<
  CartProduct[],
  CartItem,
  { rejectValue: string }
>(
  'cart/addItem', 
  async (itemInfo, thunkAPI) => {
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
  }
);

// Update item in cart
export const updateItem = createAsyncThunk<
  CartProduct[],
  UpdateCartItemRequest,
  { rejectValue: string }
>(
  'cart/updateItem', 
  async (itemInfo, thunkAPI) => {
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
  }
);

// Delete item from cart
export const deleteItem = createAsyncThunk<
  CartProduct[],
  CartItem,
  { rejectValue: string }
>(
  'cart/deleteItem', 
  async (itemInfo, thunkAPI) => {
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
  }
);