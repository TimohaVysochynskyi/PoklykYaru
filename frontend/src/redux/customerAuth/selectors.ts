import { RootState } from "../store";

export const selectIsLoggedIn = (state: RootState) => state.customerAuth.isLoggedIn;

export const selectCustomer = (state: RootState) => state.customerAuth.customer;

export const selectIsRefreshing = (state: RootState) => state.customerAuth.isRefreshing;
