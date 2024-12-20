import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { customerAuthReducer } from './customerAuth/slice';
import { cartReducer } from './cart/slice';
import { paymentsReducer } from './payments/slice';
import { adminAuthReducer } from './adminAuth/slice';

// Persisting token field from auth slice to localstorage
const customerAuthPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['accessToken'],
};

const cartPersistConfig = {
    key: 'cart',
    storage,
    whitelist: ['items'],
};
const adminAuthPersistConfig = {
    key: 'adminAuth',
    storage,
    whitelist: ['accessToken'],
};

// Типізуємо persistReducers для auth та cart
const persistedCustomerAuthReducer = persistReducer(customerAuthPersistConfig, customerAuthReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedAdminAuthReducer = persistReducer(adminAuthPersistConfig, adminAuthReducer);

export const store = configureStore({
    reducer: {
        customerAuth: persistedCustomerAuthReducer,
        cart: persistedCartReducer,
        payments: paymentsReducer,
        adminAuth: persistedAdminAuthReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// Оновлюємо типи RootState та AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
