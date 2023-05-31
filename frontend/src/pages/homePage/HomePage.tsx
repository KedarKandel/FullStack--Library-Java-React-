import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../app/store'
import './homePage.scss'
import { Book, BookCopy, User } from '../../interfaces/interface'
import BookItem from '../../components/bookItem/BookItem'
import Search from '../../components/search/Search'
import Filter from '../../components/filter/Filter'
import { fetchAllBooks, filterBooks, searchBooks } from '../../features/bookSlice'

type Props = {}

const HomePage = (props: Props) => {
  const books: Book[] = useSelector((state: RootState) => state.book.filteredItems)
  const user = useSelector((state: RootState) => state.user.currentUser)

  // console.log(borrowedBooks)
  // states for search and filter
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const dispatch = useDispatch<AppDispatch>()

  //useEffects
  useEffect(() => {
    dispatch(searchBooks({ searchTerm }))
  }, [dispatch, searchTerm, category])

  useEffect(() => {
    dispatch(filterBooks({ category }))
  }, [dispatch, category])

  useEffect(()=>{
    dispatch(fetchAllBooks())
    console.log(books)
  },[])

  return (
    <div className="homepage">
      <div className="optionContainer">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Filter category={category} setCategory={setCategory} />
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Isbn</th>
              <th>Description</th>
              <th>Authors</th>
              <th>Category</th>
              <th>Publisher</th>
              <th>Published Date</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {books && books.length > 0 ? (
              books?.map((book: Book) => {
                // Get the available copies of the book
                const availableCopies = book.copies.filter((copy: BookCopy) => copy.status === true)

                return (
                  <BookItem
                    key={book.id}
                    book={book}
                    bookCopyId={availableCopies[0]?.id}
                    availableCopies={availableCopies.length}
                    totalCopies={book.copies.length}
                  />
                )
              })
            ) : (
              <tr>
                <td colSpan={8}>No books found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HomePage
