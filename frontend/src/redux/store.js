import { configureStore } from '@reduxjs/toolkit'
import { productApi } from './api/productsApi'
import { authApi } from './api/authApi'
import { userApi } from './api/userApi'
import  useReducer  from './features/userSlice'
import  cartReducer  from './features/cartSlice'
export const store = configureStore({
    reducer: {
        cart:cartReducer,
        auth:useReducer,
        [productApi.reducerPath]: productApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([productApi.middleware, authApi.middleware, userApi.middleware])
})