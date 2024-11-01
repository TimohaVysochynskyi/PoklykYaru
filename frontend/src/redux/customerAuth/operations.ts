import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiDomain } from '../../utils/constants';
import { RootState } from '../store';

import { RegisterCustomerType, LoginCustomerType, ResponseType } from '../../types/Auth.types';

axios.defaults.baseURL = `${apiDomain}/merch/`;
axios.defaults.withCredentials = true;

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
            const res = await axios.post('/auth/register', newCustomer);
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
            const res = await axios.post('/auth/login', customerInfo);
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
        await axios.post('/auth/logout');
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
        // Reading the token from the state via getState()
        const state: RootState = thunkAPI.getState();
        const persistedToken = state.auth.accessToken;

        if (persistedToken === null) {
            // If there is no token, exit without performing any request
            return thunkAPI.rejectWithValue('Unable to fetch customer');
        }

        try {
            // If there is a token, add it to the HTTP header and perform the request
            setAuthHeader(persistedToken);
            const res = await axios.post('/auth/refresh');
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
