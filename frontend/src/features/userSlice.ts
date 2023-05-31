import {createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from '../interfaces/interface';



const initialState: UserState = {
  currentUser: null,
  isLoggedIn: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    },
    setError: (state, action: PayloadAction<string | any>) => {
      state.error = action.payload;
    },
  },
 
});

export const { setCurrentUser, logout, setError } = userSlice.actions;

export default userSlice.reducer;
