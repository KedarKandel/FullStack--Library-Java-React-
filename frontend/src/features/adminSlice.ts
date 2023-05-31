import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Book, BookCopy, Borrowing } from '../interfaces/interface';
import api from '../api/api';



// Async thunk to add a book
export const addBook = createAsyncThunk('admin/addBook', async (newBook: Book) => {
  const response = await api.post("/book/add")
  const book = await response.data();
  return book;
});



// Async thunk to update a book
export const updateBook = createAsyncThunk('admin/updateBook', async (payload: { bookId: string, updatedBook: Book }) => {
    const { bookId, updatedBook } = payload;
    const response = await api.post("/book/update", {bookId,updatedBook})
    const book = await response.data;
    return book;
  });

// Async thunk to delete a book


export const deleteBook = createAsyncThunk('books/delete', async (id: string) => {
  try {
    const res = await api.delete(`/book/delete/${id}`)
    const deletedId: string = await res.data
    
    return {
      deletedId
    }
  } catch (error:any) {
    console.log('Error:> ', error.message)
    throw error
  }
})

// Async thunk to add a book copy
export const addBookCopy = createAsyncThunk('admin/addBookCopy', async (newBookCopy: BookCopy) => {
    const response = await api.post("/bookCopy/update")
  const bookCopy = await response.data;
  return bookCopy;
});

// Async thunk to delete a book copy
export const deleteBookCopy = createAsyncThunk('admin/deleteBookCopy', async (bookCopyId: string) => {
    await api.post("/bookCopy/delete", {bookCopyId})
  return bookCopyId;
});

interface AdminState {
  books: Book[];
  borrowings: Borrowing[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AdminState = {
  books: [],
  borrowings: [],
  status: 'idle',
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add a book
    builder.addCase(addBook.fulfilled, (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
    });

    // Update a book
    builder.addCase(updateBook.fulfilled, (state, action: PayloadAction<Book>) => {
      const updatedBook = action.payload;
      const existingBook = state.books.find((book) => book.id === updatedBook.id);
      if (existingBook) {
        Object.assign(existingBook, updatedBook);
      }
    });

   

    // Add a book copy
    builder.addCase(addBookCopy.fulfilled, (state, action: PayloadAction<BookCopy>) => {
      // Handle adding a book copy
    });

    // Delete a book copy
    builder.addCase(deleteBookCopy.fulfilled, (state, action: PayloadAction<string>) => {
      // Handle deleting a book copy
    });
  },
});

export default adminSlice.reducer;
