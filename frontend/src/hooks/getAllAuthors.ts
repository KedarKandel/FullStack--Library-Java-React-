import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api/api'
import { Author } from '../interfaces/interface'

// Async thunk to add a book
export const getAllAuthors = createAsyncThunk('get/authors', async () => {
  try {
    const response = await api.post('/author/all')
    const authors: Author[] = await response.data()
    return authors
  } catch (error) {
    throw new Error('Failed to fetch authors')
  }
})
