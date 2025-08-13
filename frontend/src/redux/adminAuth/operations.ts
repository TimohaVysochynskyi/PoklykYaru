import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { LoginAdminType, ResponseType } from '../../types/AdminAuth.types';
import { apiUrl } from '../../utils/constants';

axios.defaults.withCredentials = false;

const URL = apiUrl('/admin');

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


export const logOut = createAsyncThunk('logout', async (_, thunkAPI) => {
    try {
        const state: RootState = (thunkAPI.getState() as RootState);
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
});


export const refreshAdmin = createAsyncThunk<
    ResponseType,
    void,
    { state: RootState }
>(
    'refresh',
    async (_, thunkAPI) => {
        const state: RootState = thunkAPI.getState();
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
