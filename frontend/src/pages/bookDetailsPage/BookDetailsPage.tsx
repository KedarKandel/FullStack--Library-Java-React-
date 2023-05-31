import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../app/store'
import { Book, BookCopy, User, Borrowing, BorrowReq } from '../../interfaces/interface'
import { borrowBook, fetchBorrowingsByUser, returnBook } from '../../features/borrowingSlice'
import './bookDetailsPage.scss'

type RouteParams = {
  id: string
}

const BookDetailPage: React.FC = () => {
  const { id } = useParams<RouteParams>()
  const book: Book | undefined = useSelector((state: RootState) =>
    state.book.items.find((item: Book) => item.id === id)
  )
  const currentUser: User | null = useSelector((state: RootState) => state.user.currentUser)
  const borrowings: Borrowing[] = useSelector((state: RootState) => state.borrow.borrowings)
  const dispatch = useDispatch<AppDispatch>()

  const isBookBorrowed = borrowings.some(
    (borrowing: Borrowing) =>
      borrowing?.bookCopy.book?.id === id && borrowing.user.id === currentUser?.id
  )

  const availableCopy = book?.copies.find((copy: BookCopy) => copy.status === true)
  //borrow a book
  const handleBorrowClick = () => {
    if (!isBookBorrowed && book && currentUser?.id) {
      if (!isBookBorrowed && availableCopy) {
        const borrowReq: BorrowReq = {
          userId: currentUser.id,
          bookId: availableCopy.book.id
        }
        dispatch(borrowBook(borrowReq))
      }
    }
  }
  const handleReturnClick = () => {
    if (isBookBorrowed && book && currentUser) {
      const borrowedCopy = borrowings.find(
        (borrowing: Borrowing) =>
          borrowing.bookCopy.book.id === book.id && borrowing.user.id === currentUser.id
      )
      if (borrowedCopy) {
        dispatch(returnBook({ userId: currentUser.id, bookCopyId: borrowedCopy.bookCopy.id }))
      }
    }
  }

  if (!book) {
    return <div>Book not found</div>
  }

  return (
    <div className="book-detail-page">
      <div className="book-detail-container">
        <div className="book-image">
          <img src={book.cover} alt="Book Cover" />
        </div>
        <div className="book-details">
          <h2>{book.title}</h2>
          <p>Author: {book.author.name}</p>
          <p>Category: {book.category.name}</p>
          <p>Description: {book.description}</p>
          <p>Published Date: {new Date(book.publishedDate).toLocaleDateString()}</p>
          {isBookBorrowed ? (
            <button className="return-button" onClick={handleReturnClick}>
              Return Book
            </button>
          ) : (
            <button
              className={`borrow-button ${availableCopy ? '' : 'not-available'}`}
              onClick={handleBorrowClick}>
              {availableCopy ? 'Borrow Book' : 'Not Available'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookDetailPage
