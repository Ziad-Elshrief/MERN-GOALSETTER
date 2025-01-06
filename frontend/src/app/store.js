import {configureStore} from '@reduxjs/toolkit'
import authReducer  from '../slices/authSlice'
import {apiSlice} from '../slices/apiSlice'
import goalReducer  from '../features/goals/goalSlice'

export const store = configureStore({
    reducer:{
        auth:authReducer,
        goals:goalReducer,
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(apiSlice.middleware),
    devTools: true
})