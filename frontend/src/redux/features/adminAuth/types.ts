// Admin data structure
export interface AdminData {
  psevdo: string | null;
  telegramContact: string | null;
  email: string | null;
  phoneNumber: string | null;
}

// Admin auth state interface
export interface AdminAuthState {
  admin: AdminData;
  accessToken: string | null;
  refreshToken?: string | null;
  sessionId?: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
}

// API response types
export interface ResponseAdmin {
  _id: string;
  psevdo: string;
  telegramContact: string | null;
  email: string | null;
  phoneNumber: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminAuthResponse {
  admin: ResponseAdmin;
  accessToken: string;
  refreshToken: string;
  sessionId: string;
}

// Request types
export interface AdminLoginRequest {
  email?: string;
  phoneNumber?: string;
  psevdo?: string;
  password: string;
}