import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiDomain } from '../../utils/constants';
import { RootState } from '../store';

import { LoginAdminType, ResponseType } from '../../types/AdminAuth.types';

axios.defaults.baseURL = `${apiDomain}/admin`;
axios.defaults.withCredentials = true;

const setAuthHeader = (token: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
};

export const login = createAsyncThunk<
    ResponseType,
    LoginAdminType,
    { rejectValue: string }
>(
    'login',
    async (adminInfo, thunkAPI) => {
        try {
            const res = await axios.post('/login', adminInfo);
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


export const logOut = createAsyncThunk('logout', async (_, thunkAPI) => {
    try {
        await axios.post('/logout');
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


export const refreshAdmin = createAsyncThunk<
    ResponseType,
    void,
    { state: RootState }
>(
    'refresh',
    async (_, thunkAPI) => {
        // Reading the token from the state via getState()
        const state: RootState = thunkAPI.getState();
        const persistedToken = state.adminAuth.accessToken;

        if (persistedToken === null) {
            // If there is no token, exit without performing any request
            return thunkAPI.rejectWithValue('Unable to fetch admin');
        }

        try {
            // If there is a token, add it to the HTTP header and perform the request
            setAuthHeader(persistedToken);
            const res = await axios.post('/refresh');
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
