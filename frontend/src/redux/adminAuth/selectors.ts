import { RootState } from "../store";

export const selectIsLoggedIn = (state: RootState) => state.adminAuth.isLoggedIn;

export const selectAdmin = (state: RootState) => state.adminAuth.admin;
export const selectAccessToken = (state: RootState) => state.adminAuth.accessToken;

export const selectIsRefreshing = (state: RootState) => state.adminAuth.isRefreshing;
