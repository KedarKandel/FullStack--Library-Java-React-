import { configureStore } from '@reduxjs/toolkit'
import bookReducer from '../features/bookSlice'
import userReducer from '../features/userSlice'
import borrowingReducer from '../features/borrowingSlice'
import authorReducer from '../features/authorSlice'
import categoryReducer from '../features/categorySlice'


export const store = configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
    borrow: borrowingReducer,
    author: authorReducer,
    category: categoryReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch