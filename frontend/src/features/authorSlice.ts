import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';
import { Author } from '../interfaces/interface';



export interface AuthorState {
    authors: Author[];
    loading: boolean;
    error: string | null| undefined;
  }
// Define the initial state
const initialState: AuthorState = {
    authors: [],
    loading: false,
    error: null,
  };

// Create an async thunk to fetch all authors
export const fetchAllAuthors = createAsyncThunk('author/all', async () => {
  try {
    const response = await api.get('/author/all');
    const authorsData = response.data;
    console.log(authorsData)
    return authorsData;

  } catch (error:any) {
    throw new Error('Failed to fetch authors');
  }
});

// Create the author slice
const authorSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAuthors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAuthors.fulfilled, (state, action) => {
        state.loading = false;
        state.authors = action.payload;
      })
      .addCase(fetchAllAuthors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authorSlice.reducer;
