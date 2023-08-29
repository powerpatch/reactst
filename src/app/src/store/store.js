import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import statusReducer from '../features/status/statusSlice';
import themeReducer from '../features/theme/themeSlice';
import { spacetradersApi } from '../services/spacetraders';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        status: statusReducer,
        theme: themeReducer,
        [spacetradersApi.reducerPath]: spacetradersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(spacetradersApi.middleware),
    devTools: true,
});

setupListeners(store.dispatch);