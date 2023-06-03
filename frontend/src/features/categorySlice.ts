import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../api/api';
import {  Category } from '../interfaces/interface';



export interface CategoryState {
    categories: Category[];
    loading: boolean;
    error: string | null| undefined;
  }
// Define the initial state
const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null,
  };

// Create an async thunk to fetch all authors
export const fetchAllCategories = createAsyncThunk('categories/all', async () => {
  try {
    const response = await api.get('/category/all');
    const categoryData = response.data;
    return categoryData;

  } catch (error:any) {
    throw new Error('Failed to fetch authors');
  }
});

// Create the author slice
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action:PayloadAction<Category[]>) => {
        state.loading = false;
        state.categories = action.payload
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export default categorySlice.reducer;