import { createSlice } from '@reduxjs/toolkit';
import { login, logOut, refreshAdmin } from './operations';

type AdminPayloadType = {
    psevdo: string | null;
    telegramContact: string | null;
    email: string | null;
    phoneNumber: string | null;
}

type InitialStateType = {
    admin: AdminPayloadType;
    accessToken: string | null;
    isLoggedIn: boolean;
    isRefreshing: boolean;
}

const initialState: InitialStateType = {
    admin: {
        psevdo: null,
        telegramContact: null,
        email: null,
        phoneNumber: null
    },
    accessToken: null,
    isLoggedIn: false,
    isRefreshing: false,
}

const parseAdminData = (payload: AdminPayloadType) => {
    const adminData = {
        psevdo: payload.psevdo,
        telegramContact: payload.telegramContact,
        email: payload.email,
        phoneNumber: payload.phoneNumber
    }

    return adminData
}

const authSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.admin = parseAdminData(action.payload.admin);
                state.accessToken = action.payload.accessToken;
                state.isLoggedIn = true;
            })
            .addCase(logOut.fulfilled, (state) => {
                state.admin = {
                    psevdo: null,
                    telegramContact: null,
                    email: null,
                    phoneNumber: null
                };
                state.accessToken = null;
                state.isLoggedIn = false;
            })
            .addCase(refreshAdmin.pending, (state) => {
                state.isRefreshing = true;
            })
            .addCase(refreshAdmin.fulfilled, (state, action) => {
                state.admin = parseAdminData(action.payload.admin);
                state.accessToken = action.payload.accessToken;
                state.isLoggedIn = true;
                state.isRefreshing = false;
            })
            .addCase(refreshAdmin.rejected, (state) => {
                state.isRefreshing = false;
            });
    },
});

export const adminAuthReducer = authSlice.reducer;
