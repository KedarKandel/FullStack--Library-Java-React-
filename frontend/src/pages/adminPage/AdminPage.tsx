import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../app/store'
import { Book, BookCopy } from '../../interfaces/interface'
import {
  deleteBook,
  fetchAllBooks,
  filterBooks,
  searchBooks,
  setDeletedStatus
} from '../../features/bookSlice'
import AdminBookItem from '../../components/adminBookItem/AdminBookItem'
import Search from '../../components/search/Search'
import Filter from '../../components/filter/Filter'
import UpdateForm from '../../components/updateForm/UpdateForm'
import AuthorItem from '../../components/author/AuthorItem'
import TransactionItem from '../../components/transaction/TransactionItem'
import { fetchAllAuthors } from '../../features/authorSlice'
import { fetchTransactions } from '../../features/borrowingSlice'

import './aa.scss'

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

  // states
  const [isOpen, setIsOpen] = useState(false)
  const [showTransactions, setShowTransactions] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

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
          // Handle error or show error message
          console.log(error)
        })
    }
  }

  // to update a book
  const handleUpdateBook = (book: Book) => {
    setSelectedBook(book)
    setIsOpen(true)
  }

  const handleSubmitUpdateForm = () => {}

  return (
    <div className="adminpage__container">
      <div className="left__side">
        <h1>Admin</h1>

        <div className="adminFunctions">
          <button onClick={() => setShowTransactions(false)}>Add book</button>
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
      </div>

      <div className="right__side">
        <div className="option__container">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Filter category={category} setCategory={setCategory} />
        </div>

        {deletedStatus && <p style={{ color: 'crimson' }}>{deletedStatus}</p>}

        <div className="item__container">
          {showTransactions ? (
            <div className='transactionContainer'>
              
              <h3 style={{alignSelf:"center"}}>Transactions</h3>
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
            <div className='adminBookContainer'>
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
