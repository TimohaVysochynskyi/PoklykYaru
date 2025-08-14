import { CartItemType } from '../../../types/Cart.types';

// Customer data structure
export interface CustomerData {
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  email: string | null;
}

// Auth state interface
export interface AuthState {
  customer: CustomerData;
  accessToken: string | null;
  refreshToken?: string | null;
  sessionId?: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
}

// API response types
export interface ResponseCustomer {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string | null;
  cart: CartItemType[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  customer: ResponseCustomer;
  accessToken: string;
  refreshToken: string;
  sessionId: string;
}

// Request types
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  email: string | null;
}

export interface LoginRequest {
  phoneNumber: string;
  password: string;
}