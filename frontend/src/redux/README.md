# Redux Structure Documentation

## Overview

The Redux implementation in this project has been restructured to follow modern best practices using Redux Toolkit and TypeScript. The new structure provides better organization, type safety, and maintainability.

## Architecture

### Feature-Based Organization

The Redux state is organized using a feature-based approach where each feature has its own directory containing all related Redux logic:

```
src/redux/
├── features/
│   ├── auth/           # Customer authentication
│   ├── adminAuth/      # Admin authentication  
│   ├── cart/           # Shopping cart
│   └── payments/       # Payment processing
├── store.ts           # Store configuration
└── index.ts          # Central exports
```

### Feature Structure

Each feature directory contains:

- `types.ts` - TypeScript interfaces and types
- `slice.ts` - Redux slice with reducers
- `operations.ts` - Async thunks for API calls
- `selectors.ts` - State selectors (including memoized ones)
- `index.ts` - Feature exports

## Features

### Customer Authentication (`auth`)

Handles customer login, registration, and session management.

**Key Types:**
- `AuthState` - Auth state structure
- `CustomerData` - Customer information
- `LoginRequest` / `RegisterRequest` - API request types

**Key Operations:**
- `login` - Customer login
- `register` - Customer registration
- `logOut` - Customer logout
- `refreshCustomer` - Session refresh

**Key Selectors:**
- `selectIsLoggedIn` - Authentication status
- `selectCustomer` - Customer data
- `selectIsAuthenticated` - Memoized auth check

### Admin Authentication (`adminAuth`)

Handles admin user authentication and authorization.

**Key Operations:**
- `loginAdmin` - Admin login
- `logOutAdmin` - Admin logout
- `refreshAdmin` - Admin session refresh

**Key Selectors:**
- `selectIsAdminLoggedIn` - Admin auth status
- `selectAdmin` - Admin user data
- `selectAdminAccessToken` - Admin access token

### Shopping Cart (`cart`)

Manages shopping cart state and operations.

**Key Operations:**
- `fetchCart` - Load cart items
- `addItem` - Add item to cart
- `updateItem` - Update cart item
- `deleteItem` - Remove from cart

**Key Selectors:**
- `selectCart` - Cart items
- `selectCartItemsCount` - Total items count
- `selectCartTotalPrice` - Total cart value
- `selectIsCartOpen` - Cart visibility state

### Payments (`payments`)

Handles payment processing and invoice management.

**Key Operations:**
- `createInvoice` - Create payment invoice

**Key Selectors:**
- `selectPaymentInvoice` - Current invoice
- `selectPaymentFormData` - Payment form state

## Usage

### Importing Redux Functionality

Use the central exports for all Redux imports:

```typescript
// Import from central location
import { 
  useSelector, 
  useDispatch,
  selectIsLoggedIn,
  login,
  CartProduct 
} from '../redux';

// In components
const isLoggedIn = useSelector(selectIsLoggedIn);
const dispatch = useDispatch();

const handleLogin = () => {
  dispatch(login({ phoneNumber, password }));
};
```

### Adding New Features

1. Create a new feature directory under `src/redux/features/`
2. Add the required files: `types.ts`, `slice.ts`, `operations.ts`, `selectors.ts`, `index.ts`
3. Export the reducer from `features/index.ts`
4. Add the reducer to the store configuration
5. Export functionality from `redux/index.ts`

Example feature structure:

```typescript
// features/newFeature/types.ts
export interface NewFeatureState {
  data: any[];
  loading: boolean;
  error: string | null;
}

// features/newFeature/slice.ts
const newFeatureSlice = createSlice({
  name: 'newFeature',
  initialState,
  reducers: {
    // sync actions
  },
  extraReducers: (builder) => {
    // async actions
  }
});

// features/newFeature/operations.ts
export const fetchData = createAsyncThunk(
  'newFeature/fetchData',
  async (params, thunkAPI) => {
    // API call logic
  }
);

// features/newFeature/selectors.ts
export const selectNewFeatureData = (state: RootState) => 
  state.newFeature.data;
```

## Best Practices

### Type Safety
- Always provide proper TypeScript types for state, actions, and API responses
- Use `createAsyncThunk` with proper typing for async operations
- Type your selectors with `RootState`

### Selectors
- Use `createSelector` for complex derived state
- Memoize expensive computations
- Keep selectors pure and predictable

### Error Handling
- Handle pending, fulfilled, and rejected states in async thunks
- Provide meaningful error messages
- Reset error states when appropriate

### State Structure
- Keep state normalized when possible
- Avoid deeply nested structures
- Use loading and error states consistently

## Testing

Each feature should include tests for:
- Reducers (pure function testing)
- Async thunks (mock API responses)
- Selectors (state derivation)

## Migration Notes

This structure replaces the previous Redux implementation while maintaining backward compatibility. All existing functionality has been preserved and enhanced with better typing and organization.