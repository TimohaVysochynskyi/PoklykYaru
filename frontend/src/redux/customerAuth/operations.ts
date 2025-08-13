import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { RegisterCustomerType, LoginCustomerType, ResponseType } from '../../types/CustomerAuth.types';
import { apiUrl } from '../../utils/constants';

axios.defaults.withCredentials = false;

const URL = apiUrl('/merch/auth');

const setAuthHeader = (token: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk<
    ResponseType,
    RegisterCustomerType,
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


export const login = createAsyncThunk<
    ResponseType,
    LoginCustomerType,
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


export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        const state: RootState = (thunkAPI.getState() as RootState);
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
});


export const refreshCustomer = createAsyncThunk<
    ResponseType,
    void,
    { state: RootState }
>(
    'auth/refresh',
    async (_, thunkAPI) => {
        const state: RootState = thunkAPI.getState();
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
