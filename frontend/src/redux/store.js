import { configureStore } from '@reduxjs/toolkit'
import { productApi } from './api/productsApi'
import { authApi } from './api/authApi'
import { userApi } from './api/userApi'
import useReducer from './features/userSlice'
import cartReducer from './features/cartSlice'
import { orderApi } from './api/orderApi'
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: useReducer,
        [productApi.reducerPath]: productApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            productApi.middleware,
            authApi.middleware,
            userApi.middleware,
            orderApi.middleware,
        ]),
})