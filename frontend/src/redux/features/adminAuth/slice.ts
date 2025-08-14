import { createSlice } from '@reduxjs/toolkit';
import { loginAdmin, logOutAdmin, refreshAdmin } from './operations';
import { AdminAuthState, AdminData, ResponseAdmin } from './types';

const initialState: AdminAuthState = {
  admin: {
    psevdo: null,
    telegramContact: null,
    email: null,
    phoneNumber: null
  },
  accessToken: null,
  refreshToken: null,
  sessionId: null,
  isLoggedIn: false,
  isRefreshing: false,
};

// Helper function to parse admin data
const parseAdminData = (payload: ResponseAdmin): AdminData => ({
  psevdo: payload.psevdo,
  telegramContact: payload.telegramContact,
  email: payload.email,
  phoneNumber: payload.phoneNumber
});

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    // Add synchronous actions if needed
    clearAdminError: (state) => {
      state.isRefreshing = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.admin = parseAdminData(action.payload.admin);
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.sessionId = action.payload.sessionId;
        state.isLoggedIn = true;
      })
      
      // Logout cases
      .addCase(logOutAdmin.fulfilled, (state) => {
        state.admin = {
          psevdo: null,
          telegramContact: null,
          email: null,
          phoneNumber: null
        };
        state.accessToken = null;
        state.refreshToken = null;
        state.sessionId = null;
        state.isLoggedIn = false;
      })
      
      // Refresh cases
      .addCase(refreshAdmin.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshAdmin.fulfilled, (state, action) => {
        state.admin = parseAdminData(action.payload.admin);
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.sessionId = action.payload.sessionId;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshAdmin.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export const { clearAdminError } = adminAuthSlice.actions;
export const adminAuthReducer = adminAuthSlice.reducer;