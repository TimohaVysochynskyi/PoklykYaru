import { RootState } from "../store";

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const selectCustomer = (state: RootState) => state.auth.customer;

export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;
