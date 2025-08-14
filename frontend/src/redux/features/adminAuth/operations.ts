import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { AdminAuthResponse, AdminLoginRequest } from './types';
import { apiUrl } from '../../../utils/constants';

// Configure axios defaults
axios.defaults.withCredentials = false;

const URL = apiUrl('/admin');

// Helper functions for auth headers
const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

// Login admin
export const loginAdmin = createAsyncThunk<
  AdminAuthResponse,
  AdminLoginRequest,
  { rejectValue: string }
>(
  'adminAuth/login',
  async (adminInfo, thunkAPI) => {
    try {
      const res = await axios.post(`${URL}/login`, adminInfo);
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

// Logout admin
export const logOutAdmin = createAsyncThunk<
  void,
  void,
  { state: RootState; rejectValue: string }
>(
  'adminAuth/logout', 
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      await axios.post(`${URL}/logout`, {
        sessionId: state.adminAuth.sessionId,
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

// Refresh admin session
export const refreshAdmin = createAsyncThunk<
  AdminAuthResponse,
  void,
  { state: RootState; rejectValue: string }
>(
  'adminAuth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const { accessToken, refreshToken, sessionId } = state.adminAuth;
    
    if (!accessToken || !refreshToken || !sessionId) {
      return thunkAPI.rejectWithValue('Unable to refresh admin');
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