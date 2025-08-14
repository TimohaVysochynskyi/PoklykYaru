// Central exports for all Redux features - for easy importing
// This file consolidates all exports from the features into one place

// Auth exports (customer authentication)
export { 
  authReducer,
  clearError as clearAuthError,
  register,
  login,
  logOut,
  refreshCustomer
} from './features/auth/index';

export {
  selectAuthState,
  selectIsLoggedIn,
  selectCustomer,
  selectAccessToken,
  selectRefreshToken,
  selectSessionId,
  selectIsRefreshing,
  selectCustomerFullName,
  selectIsAuthenticated,
  selectCanRefresh
} from './features/auth/index';

export type {
  CustomerData,
  AuthState,
  ResponseCustomer,
  AuthResponse,
  RegisterRequest,
  LoginRequest
} from './features/auth/index';

// Admin Auth exports
export { 
  adminAuthReducer,
  clearAdminError,
  loginAdmin,
  logOutAdmin,
  refreshAdmin
} from './features/adminAuth/index';

export {
  selectAdminAuthState,
  selectIsAdminLoggedIn,
  selectAdmin,
  selectAdminAccessToken,
  selectAdminRefreshToken,
  selectAdminSessionId,
  selectIsAdminRefreshing,
  selectAdminDisplayName,
  selectIsAdminAuthenticated,
  selectAdminCanRefresh
} from './features/adminAuth/index';

export type {
  AdminData,
  AdminAuthState,
  ResponseAdmin,
  AdminAuthResponse,
  AdminLoginRequest
} from './features/adminAuth/index';

// Cart exports
export { 
  cartReducer,
  openCart,
  closeCart,
  clearCartError,
  fetchCart,
  addItem,
  deleteItem,
  updateItem
} from './features/cart/index';

export {
  selectCartState,
  selectCart,
  selectIsCartOpen,
  selectCartLoading,
  selectCartError,
  selectCartItemsCount,
  selectCartTotalPrice,
  selectCartItemById,
  selectCartIsEmpty,
  selectCartSummary
} from './features/cart/index';

export type {
  CartItemVariation,
  CartItem,
  CartProduct,
  UpdateCartItemRequest,
  CartState,
  CartResponse
} from './features/cart/index';

// Payments exports
export { 
  paymentsReducer,
  cancelPayment,
  setPaymentFormData,
  clearPaymentFormData,
  clearPaymentError,
  createInvoice
} from './features/payments/index';

export {
  selectPaymentsState,
  selectPaymentInvoice,
  selectPaymentFormData,
  selectPaymentLoading,
  selectPaymentError,
  selectInvoiceUrl,
  selectInvoiceId,
  selectHasInvoice,
  selectPaymentSummary
} from './features/payments/index';

export type {
  PaymentInvoiceData,
  PaymentFormData,
  PaymentsState,
  SendPaymentRequest
} from './features/payments/index';