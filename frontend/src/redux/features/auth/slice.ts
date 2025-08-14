import { createSlice } from '@reduxjs/toolkit';
import { register, login, logOut, refreshCustomer } from './operations';
import { AuthState, CustomerData, ResponseCustomer } from './types';

const initialState: AuthState = {
  customer: {
    firstName: null,
    lastName: null,
    phoneNumber: null,
    email: null
  },
  accessToken: null,
  refreshToken: null,
  sessionId: null,
  isLoggedIn: false,
  isRefreshing: false,
};

// Helper function to parse customer data
const parseCustomerData = (payload: ResponseCustomer): CustomerData => ({
  firstName: payload.firstName,
  lastName: payload.lastName,
  phoneNumber: payload.phoneNumber,
  email: payload.email,
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Add synchronous actions if needed
    clearError: (state) => {
      // Can be used to clear any error state if added later
      state.isRefreshing = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(register.fulfilled, (state, action) => {
        state.customer = parseCustomerData(action.payload.customer);
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.sessionId = action.payload.sessionId;
        state.isLoggedIn = true;
      })
      
      // Login cases
      .addCase(login.fulfilled, (state, action) => {
        state.customer = parseCustomerData(action.payload.customer);
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.sessionId = action.payload.sessionId;
        state.isLoggedIn = true;
      })
      
      // Logout cases
      .addCase(logOut.fulfilled, (state) => {
        state.customer = { 
          firstName: null, 
          lastName: null, 
          phoneNumber: null, 
          email: null 
        };
        state.accessToken = null;
        state.refreshToken = null;
        state.sessionId = null;
        state.isLoggedIn = false;
      })
      
      // Refresh cases
      .addCase(refreshCustomer.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshCustomer.fulfilled, (state, action) => {
        state.customer = parseCustomerData(action.payload.customer);
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.sessionId = action.payload.sessionId;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshCustomer.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export const authReducer = authSlice.reducer;