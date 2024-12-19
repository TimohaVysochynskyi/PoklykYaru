import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { RegisterCustomerType, LoginCustomerType, ResponseType } from '../../types/CustomerAuth.types';
import { apiDomain } from '../../utils/constants';

axios.defaults.withCredentials = true;

const URL = `${apiDomain}/merch/auth`;

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
            console.log("Logining");
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
        await axios.post(`${URL}/logout`);
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
        const persistedToken = state.customerAuth.accessToken;

        if (persistedToken === null) {
            // If there is no token, exit without performing any request
            return thunkAPI.rejectWithValue('Unable to fetch customer');
        }

        try {
            // If there is a token, add it to the HTTP header and perform the request
            setAuthHeader(persistedToken);
            const res = await axios.post(`${URL}/refresh`);
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
