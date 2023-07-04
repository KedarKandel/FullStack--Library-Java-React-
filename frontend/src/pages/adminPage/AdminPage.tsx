import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../app/store'
import { Book, BookCopy } from '../../interfaces/interface'
import {
  addBook,
  deleteBook,
  fetchAllBooks,
  filterBooks,
  searchBooks,
  setDeletedStatus,
  setUpdatedStatus,
  updateBook
} from '../../features/bookSlice'
import AdminBookItem from '../../components/adminBookItem/AdminBookItem'
import Search from '../../components/search/Search'
import Filter from '../../components/filter/Filter'
import UpdateForm from '../../components/updateForm/UpdateForm'
import AuthorItem from '../../components/author/AuthorItem'
import TransactionItem from '../../components/transaction/TransactionItem'
import { fetchAllAuthors } from '../../features/authorSlice'
import { fetchTransactions } from '../../features/borrowingSlice'
import { fetchAllCategories } from '../../features/categorySlice'
import './adminPage.scss'
import AddBookForm from '../../components/addBookForm/AddBookForm'
import { setAddedStatus } from '../../features/bookSlice'
import AddAuthorForm from '../../components/addAuthorForm/AddAuthorForm'

const AdminPage = () => {
  const books = useSelector((state: RootState) => state.book.filteredItems)
  const user = useSelector((state: RootState) => state.user.currentUser)
  const authors = useSelector((state: RootState) => state.author.authors)
  const transactions = useSelector((state: RootState) => state.borrow.allBorrowing)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const dispatch = useDispatch<AppDispatch>()

  //show messages for delete, update, ....
  const deletedStatus = useSelector((state: RootState) => state.book.deletedStatus)
  const updatedStatus = useSelector((state: RootState) => state.book.updatedStatus)
  const addedStatus = useSelector((state: RootState) => state.book.addedStatus)

  // states
  const [isOpen, setIsOpen] = useState(false)
  const [showTransactions, setShowTransactions] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [isAdd, setIsAdd] = useState(false)

  //useEffects
  useEffect(() => {
    dispatch(searchBooks({ searchTerm }))
  }, [dispatch, searchTerm, category])

  useEffect(() => {
    dispatch(filterBooks({ category }))
  }, [dispatch, category])

  useEffect(() => {
    dispatch(fetchAllBooks())
    dispatch(fetchAllAuthors())
    dispatch(fetchAllCategories())
  }, [dispatch])

  // getAll transaction
  const getAllTransactions = () => {
    dispatch(fetchTransactions())
    setShowTransactions(true)
  }

  // to delete a book
  const handleDeleteBook = (book: Book) => {
    if (user && book) {
      dispatch(deleteBook(book.id))
        .then((action) => {
          const deletedId = (action.payload as any).deletedId
          if (deletedId === book.id) {
            // Book deleted successfully, show success message
            dispatch(setDeletedStatus('Book successfully deleted.'))
            setTimeout(() => {
              // Clear the success message after a certain duration (e.g., 3 seconds)
              dispatch(setDeletedStatus(''))
            }, 3000)
          } else {
            // Book deletion failed or other error occurred
            dispatch(setDeletedStatus('Book cannot be deleted, copies are borrowed by users'))
            setTimeout(() => {
              // Clear the success message after a certain duration (e.g., 3 seconds)
              dispatch(setDeletedStatus(''))
            }, 3000)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  // to update a book
  const handleUpdateBook = (book: Book) => {
    setSelectedBook(book)
    setIsOpen(true)
  }
  const handleSubmitUpdateForm = (book: Book) => {
    if (user && book) {
      dispatch(updateBook(book))
        .then((action) => {
          const updatedId = (action.payload as any).updatedBook.id
          if (updatedId === selectedBook?.id) {
            // Book deleted successfully, show success message
            dispatch(setUpdatedStatus('Book updated successfully'))
            setTimeout(() => {
              // Clear the success message after a certain duration (e.g., 3 seconds)
              dispatch(setUpdatedStatus(''))
            }, 3000)
          } else {
            // Book deletion failed or other error occurred
            dispatch(setUpdatedStatus('Book update failed'))
            setTimeout(() => {
              // Clear the success message after a certain duration (e.g., 3 seconds)
              dispatch(setUpdatedStatus(''))
            }, 3000)
          }
        })
        .catch((error) => {
          console.log(error)
        })

      setSelectedBook(null)
      setIsOpen(false)
    }
  }
  // add a book
  const handleAddBook = (book: Book) => {
    dispatch(addBook(book))
      .then((action) => {
        setIsAdd(false)
        const payload = action.payload
        if (typeof payload === 'object' && payload !== null && 'book' in payload) {
          const addedBook: Book = (payload as { book: Book }).book
          console.log(addedBook)
          if (addedBook && addedBook.id) {
            // Book added successfully, show success message
            dispatch(setAddedStatus('Book added successfully'))
            setTimeout(() => {
              // Clear the success message after a certain duration (e.g., 3 seconds)
              dispatch(setAddedStatus(''))
            }, 3000)
          } else {
            // Book addition failed or other error occurred
            dispatch(setAddedStatus('Failed to add book to the database'))
            setTimeout(() => {
              // Clear the error message after a certain duration (e.g., 3 seconds)
              dispatch(setAddedStatus(''))
            }, 3000)
          }
        } else {
          // Payload does not have the expected structure
          console.error('Invalid payload structure')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="adminpage__container">
      <div className="left__side">
        <h1>Admin</h1>
        <div className="adminFunctions">
          {isAdd && <AddBookForm onSubmit={handleAddBook} setIsAdd={setIsAdd} />}
          <button onClick={() => setIsAdd(true)}>Add book</button>
          <button>Add Author</button>
          <button onClick={getAllTransactions}>View transactions</button>
        </div>

        <div className="author__container">
          <h3>Authors</h3>
          <div className="authors">
            {authors?.map((author) => (
              <AuthorItem key={author.id} author={author} />
            ))}
          </div>
        </div>
        <AddAuthorForm/>
      </div>

      <div className="right__side">
        <div className="option__container">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Filter category={category} setCategory={setCategory} />
        </div>

        {updatedStatus && <p className="status-message">{updatedStatus}</p>}
        {addedStatus && <p className="status-message">{addedStatus}</p>}
        {deletedStatus && <p className="status-message deleted-status">{deletedStatus}</p>}

        <div className="item__container">
          {showTransactions ? (
            <div className="transactionContainer">
              <h3 style={{ alignSelf: 'center' }}>Transactions</h3>
              <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Book Copy ID</th>
                    <th>Borrow Date</th>
                    <th>Return Date</th>
                    <th>IsReturned</th>
                    <th>Returned Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction} />
                  ))}
                </tbody>
              </table>
              <button
                onClick={() => setShowTransactions(false)}
                style={{ color: 'white', backgroundColor: 'red', alignSelf: 'right' }}>
                close
              </button>
            </div>
          ) : (
            <div className="adminBookContainer">
              {books && books.length > 0 ? (
                books?.map((book: Book) => {
                  // Get the available copies of the book
                  const availableCopies = book.copies.filter(
                    (copy: BookCopy) => copy.status === true
                  )

                  return (
                    <React.Fragment key={book.id}>
                      <AdminBookItem
                        key={book.id}
                        book={book}
                        bookCopyId={availableCopies[0]?.id}
                        availableCopies={availableCopies.length}
                        totalCopies={book.copies.length}
                        onDeleteBook={() => handleDeleteBook(book)}
                        onUpdateBook={() => handleUpdateBook(book)}
                      />
                      {isOpen && selectedBook && selectedBook.id === book.id && (
                        <UpdateForm
                          key={`update-form-${book.id}`} // Add a unique key for UpdateForm
                          book={selectedBook}
                          onUpdateBook={handleSubmitUpdateForm}
                          setIsOpen={setIsOpen}
                        />
                      )}
                    </React.Fragment>
                  )
                })
              ) : (
                <div>
                  <span>No books found</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPage