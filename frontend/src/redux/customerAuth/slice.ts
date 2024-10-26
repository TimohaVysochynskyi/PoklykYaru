import { createSlice } from '@reduxjs/toolkit';
import { register, login, logOut, refreshCustomer } from './operations';

type CustomerPayloadType = {
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string | null;
    email: string | null;
}

type InitialStateType = {
    customer: CustomerPayloadType;
    accessToken: string | null;
    isLoggedIn: boolean;
    isRefreshing: boolean;
}

const initialState: InitialStateType = {
    customer: {
        firstName: null,
        lastName: null,
        phoneNumber: null,
        email: null
    },
    accessToken: null,
    isLoggedIn: false,
    isRefreshing: false,
}

const parseCustomerData = (payload: CustomerPayloadType) => {
    const customerData = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        phoneNumber: payload.phoneNumber,
        email: payload.email,
    }

    return customerData
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.customer = parseCustomerData(action.payload.customer);
                state.accessToken = action.payload.accessToken;
                state.isLoggedIn = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.customer = parseCustomerData(action.payload.customer);
                state.accessToken = action.payload.accessToken;
                state.isLoggedIn = true;
            })
            .addCase(logOut.fulfilled, (state) => {
                state.customer = { firstName: null, lastName: null, phoneNumber: null, email: null };
                state.accessToken = null;
                state.isLoggedIn = false;
            })
            .addCase(refreshCustomer.pending, (state) => {
                state.isRefreshing = true;
            })
            .addCase(refreshCustomer.fulfilled, (state, action) => {
                state.customer = parseCustomerData(action.payload.customer);
                state.accessToken = action.payload.accessToken;
                state.isLoggedIn = true;
                state.isRefreshing = false;
            })
            .addCase(refreshCustomer.rejected, (state) => {
                state.isRefreshing = false;
            });
    },
});

export const authReducer = authSlice.reducer;
