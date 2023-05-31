import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  BorrowReq,
  Borrowing,
  BorrowingState,
  ReturnReq,
  User
} from '../interfaces/interface'
import api from '../api/api'

// get all borrowings
export const fetchTransactions = createAsyncThunk('borrowing/fetchBorrowings', async () => {
  const response = await api.get('/borrow/all')
  console.log(response.data)
  return response.data
})

// borrow a book
export const borrowBook = createAsyncThunk('book/borrow', async (object: BorrowReq) => {
  try {
    const res = await api.post(`/borrow/borrowOne`, {
      userId: object.userId,
      bookId: object.bookId
    })
    const borrowing: Borrowing = await res.data
    
    // Save the borrowing information in localStorage
    const borrowedBooks = localStorage.getItem('borrowedBooks')
    const updatedBorrowedBooks = borrowedBooks ? JSON.parse(borrowedBooks) : []
    updatedBorrowedBooks.push(borrowing)
    localStorage.setItem('borrowedBooks', JSON.stringify(updatedBorrowedBooks))
    return borrowing
  } catch (error: any) {
    console.log('Error:', error.message)
    throw error
  }
})

// return a book
export const returnBook = createAsyncThunk('book/return', async (details: ReturnReq) => {
  try {
    const res = await api.post(`/borrow/returnOne`, {
      userId: details.userId,
      bookCopyId: details.bookCopyId
    })
    const returnedBookId: string = await res.data
    return {returnedBookId}
  } catch (error: any) {
    console.log('Error:', error.message)
    throw error
  }
})


// fetch borrowings by username
export const fetchBorrowingsByUser = createAsyncThunk(
  'borrowing/fetchBorrowingsByUsername',
  async ( user:User ) => {
    const response = await api.get(`/borrow/all/${user.id}`);
    return response.data;
  }
);


const initialState: BorrowingState = {
  borrowings: [],
  allBorrowing: [],
  isLoading: false,
  error: null
}

const borrowingSlice = createSlice({
  name: 'borrowing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.allBorrowing = action.payload
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch borrowings'
      })
      .addCase(borrowBook.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(borrowBook.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.borrowings.push(action.payload)
      })
      .addCase(borrowBook.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to create borrowing'
      })
      .addCase(returnBook.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(returnBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const returnedId = action.payload.returnedBookId;
        state.borrowings = state.borrowings.filter((borrowing) => borrowing.bookCopy.book.id!== returnedId);
      })

      .addCase(returnBook.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to return borrowing'
      })

      .addCase(fetchBorrowingsByUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.borrowings= action.payload;
        
      })
  }
})

export default borrowingSlice.reducer
