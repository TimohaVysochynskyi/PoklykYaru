import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { AuthResponse, RegisterRequest, LoginRequest } from './types';
import { apiUrl } from '../../../utils/constants';

// Configure axios defaults
axios.defaults.withCredentials = false;

const URL = apiUrl('/merch/auth');

// Helper functions for auth headers
const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

// Register customer
export const register = createAsyncThunk<
  AuthResponse,
  RegisterRequest,
  { rejectValue: string }
>(
  'auth/register',
  async (newCustomer, thunkAPI) => {
    try {
      const res = await axios.post(`${URL}/register`, newCustomer);
      // After successful registration, add the token to the HTTP header
      setAuthHeader(res.data.accessToken);
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

// Login customer
export const login = createAsyncThunk<
  AuthResponse,
  LoginRequest,
  { rejectValue: string }
>(
  'auth/login',
  async (customerInfo, thunkAPI) => {
    try {
      const res = await axios.post(`${URL}/login`, customerInfo);
      // After successful login, add the token to the HTTP header
      setAuthHeader(res.data.accessToken);
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

// Logout customer
export const logOut = createAsyncThunk<
  void,
  void,
  { state: RootState; rejectValue: string }
>(
  'auth/logout', 
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      await axios.post(`${URL}/logout`, {
        sessionId: state.customerAuth.sessionId,
      });
      // After a successful logout, remove the token from the HTTP header
      clearAuthHeader();
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue('Unknown error occurred');
      }
    }
  }
);

// Refresh customer session
export const refreshCustomer = createAsyncThunk<
  AuthResponse,
  void,
  { state: RootState; rejectValue: string }
>(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const { accessToken, refreshToken, sessionId } = state.customerAuth;
    
    if (!accessToken || !refreshToken || !sessionId) {
      return thunkAPI.rejectWithValue('Unable to refresh customer');
    }

    try {
      setAuthHeader(accessToken);
      const res = await axios.post(`${URL}/refresh`, {
        refreshToken,
        sessionId,
      });
      setAuthHeader(res.data.accessToken);
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