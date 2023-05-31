import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import api from '../api/api' // assuming you have an API module for making requests

import {
  Book,
  BookReq,
  BookRes,
  BookState,
  FilterTermPayload,
  SearchTermPayload
} from '../interfaces/interface' // import the necessary interfaces

// fetch all books
export const fetchAllBooks = createAsyncThunk('books/fetch', async () => {
  try {
    const response = await api.get('/book/all')
    if (response.status !== 200) {
      throw new Error('Failed to fetch books')
    }
    const books: Book[] = response.data
    return books
  } catch (error) {
    throw new Error('Failed to fetch books')
  }
})

export const deleteBook = createAsyncThunk(
  'books/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/book/delete/${id}`)
      const deletedId = res.data
      if (deletedId === id) {
        // Book successfully deleted
        return { deletedId }
      } else {
        // Book deletion failed or other error occurred
        return rejectWithValue("Book deletion failed")
      }
    } catch (error: any) {
      // Error occurred during the API request
      return rejectWithValue(error.message)
    }
  }
)

// add a book

export const addBook = createAsyncThunk('books/add', async (addedObject: BookReq) => {
  try {
    const res = await api.post(`/book/add`, {
      title: addedObject.title,
      description: addedObject.description,
      isbn: addedObject.isbn,
      authorId: addedObject.authorId,
      categoryId: addedObject.categoryId,
      publishedDate: addedObject.publishedDate,
      publisher: addedObject.publisher,
      cover: addedObject.cover
    })
    const book: BookRes = await res.data
    console.log(book)
    return {
      book
    }
  } catch (error: any) {
    console.log('Error:> ', error.message)
    throw error
  }
})

const initialState: BookState = {
  items: [],
  filteredItems: [],
  isLoading: false,
  error: null,
  deletedStatus: ""
}

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    filterBooks: (state, action: PayloadAction<FilterTermPayload>) => {
      const { category } = action.payload
      if (category === 'all') {
        state.filteredItems = state.items
      } else {
        state.filteredItems = state.items.filter((book) =>
          book.category.name.toLowerCase().includes(category.toLowerCase())
        )
      }
    },
    searchBooks: (state, action: PayloadAction<SearchTermPayload>) => {
      const { searchTerm } = action.payload
      if (!searchTerm) {
        state.filteredItems = state.items
      } else {
        state.filteredItems = state.items.filter((book) => {
          const titleMatch = book.title.toLowerCase().includes(searchTerm.toLowerCase())
          const authorMatch = book.author.name.toLowerCase().includes(searchTerm.toLowerCase())
          return titleMatch || authorMatch
        })
      }
    },
    setDeletedStatus: (state, action: PayloadAction<string|null>) => {
      state.deletedStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBooks.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAllBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.isLoading = false
        state.items = action.payload
        state.filteredItems = action.payload
      })
      .addCase(fetchAllBooks.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.error = action.payload
      })
    // Delete a book
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      const bookId = action.payload.deletedId
      state.items = state.items.filter((book) => book.id !== bookId)
      state.filteredItems = state.filteredItems.filter((book) => book.id !== bookId)
      state.deletedStatus = 'Book successfully deleted.';
    })
  }
})

export const { filterBooks, searchBooks, setDeletedStatus } = bookSlice.actions

export default bookSlice.reducer
