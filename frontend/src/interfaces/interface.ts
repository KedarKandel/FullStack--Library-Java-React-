import { UUID } from 'crypto'

export type User = {
  id: string
  username: string
  password: string
  role: 'USER' | 'ADMIN'
}
export interface Book {
  id: string
  title: string
  description: string
  isbn: string
  author: Author
  category: Category
  publishedDate: Date
  publisher: string
  cover: string
  copies: BookCopy[]
}

export type Category = {
  id: string
  name: string
}

export type BookCopy = {
  id: string
  book: Book
  status: boolean
}
export type Author = {
  id: string
  name: string
  email: string
  phone?: string
}

export interface Borrowing {
  id: string
  user: User
  bookCopy: BookCopy
  borrowDate: Date
  returnDate: Date
}

// types for states

export type UserState = {
  currentUser: User | null
  isLoggedIn: boolean
  error: string | null
}

export type BookState = {
  items: Book[]
  filteredItems: Book[]
  isLoading: boolean
  error: string | null
  deletedStatus: string|null
}

export interface BorrowingState {
  borrowings: Borrowing[]
  isLoading: boolean
  error: string | null
  allBorrowing: TransactionType[]
}

// interface for payload
export interface SearchTermPayload {
  searchTerm: string
}

export interface FilterTermPayload {
  category: string
}

// types for res and req
export type BorrowReq = {
  userId: string
  bookId: string
}
export type ReturnReq = {
  userId: string
  bookCopyId: string
}

export type BookReq = {
  id?: UUID
  title: string
  isbn: string
  description: string
  authorId: UUID
  categoryId: UUID
  publishedDate: string
  publisher: string
  cover: string
}

export type BookRes = {
  id: UUID
  title: string
  isbn: string
  description: string
  author: {
    id: UUID
    authorName: string
    email: string
    phone: string
  }
  category: {
    id: UUID
    name: string
  }
  publishedDate: string
  publisher: string
  cover: string
}

export interface TransactionType  {
  id: string
  user: User
  bookCopy: BookCopy
  borrowDate: Date
  returnDate: Date
  returned: boolean
  returnedDate: Date
}
