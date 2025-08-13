import { RootState } from '../../store';
import { createSelector } from '@reduxjs/toolkit';

// Basic selectors
export const selectAdminAuthState = (state: RootState) => state.adminAuth;

export const selectIsAdminLoggedIn = (state: RootState) => state.adminAuth.isLoggedIn;

export const selectAdmin = (state: RootState) => state.adminAuth.admin;

export const selectAdminAccessToken = (state: RootState) => state.adminAuth.accessToken;

export const selectAdminRefreshToken = (state: RootState) => state.adminAuth.refreshToken;

export const selectAdminSessionId = (state: RootState) => state.adminAuth.sessionId;

export const selectIsAdminRefreshing = (state: RootState) => state.adminAuth.isRefreshing;

// Memoized selectors
export const selectAdminDisplayName = createSelector(
  [selectAdmin],
  (admin) => {
    return admin.psevdo || admin.email || admin.phoneNumber || 'Admin';
  }
);

export const selectIsAdminAuthenticated = createSelector(
  [selectIsAdminLoggedIn, selectAdminAccessToken],
  (isLoggedIn, accessToken) => isLoggedIn && !!accessToken
);

export const selectAdminCanRefresh = createSelector(
  [selectAdminRefreshToken, selectAdminSessionId],
  (refreshToken, sessionId) => !!refreshToken && !!sessionId
);