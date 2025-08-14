import { RootState } from '../../store';
import { createSelector } from '@reduxjs/toolkit';

// Basic selectors
export const selectAuthState = (state: RootState) => state.customerAuth;

export const selectIsLoggedIn = (state: RootState) => state.customerAuth.isLoggedIn;

export const selectCustomer = (state: RootState) => state.customerAuth.customer;

export const selectAccessToken = (state: RootState) => state.customerAuth.accessToken;

export const selectRefreshToken = (state: RootState) => state.customerAuth.refreshToken;

export const selectSessionId = (state: RootState) => state.customerAuth.sessionId;

export const selectIsRefreshing = (state: RootState) => state.customerAuth.isRefreshing;

// Memoized selectors using createSelector
export const selectCustomerFullName = createSelector(
  [selectCustomer],
  (customer) => {
    if (customer.firstName && customer.lastName) {
      return `${customer.firstName} ${customer.lastName}`;
    }
    return customer.firstName || customer.lastName || null;
  }
);

export const selectIsAuthenticated = createSelector(
  [selectIsLoggedIn, selectAccessToken],
  (isLoggedIn, accessToken) => isLoggedIn && !!accessToken
);

export const selectCanRefresh = createSelector(
  [selectRefreshToken, selectSessionId],
  (refreshToken, sessionId) => !!refreshToken && !!sessionId
);