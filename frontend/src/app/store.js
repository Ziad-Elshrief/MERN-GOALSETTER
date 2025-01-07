import {configureStore} from '@reduxjs/toolkit'
import authReducer  from '../slices/authSlice'
import goalsReducer  from '../slices/goalsSlice'
import {apiSlice} from '../slices/apiSlice'

export const store = configureStore({
    reducer:{
        auth:authReducer,
        goals:goalsReducer,
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(apiSlice.middleware),
    devTools: true
})