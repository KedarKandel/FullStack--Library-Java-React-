import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../app/store'

import './userProfile.scss'
import { returnBook } from '../../features/borrowingSlice'


const UserProfile = () => {
  const user = useSelector((state: RootState) => state.user.currentUser)
  const borrowedBooks = useSelector((state: RootState) => state.borrow.borrowings)
  const dispatch = useDispatch<AppDispatch>()

  const handleReturnClick = (userId: string | undefined, bookCopyId: string) => {
    if (userId && bookCopyId) {
      dispatch(returnBook({ userId, bookCopyId }));
      
    }
  };

  return (
    <div className="user_profile_container">
      <div className="user_details">
        <h2>User Profile</h2>
        <p>Username: {user?.username}</p>
        <p>ID: {user?.id}</p>
      </div>

      <div className="borrowed_books">
        <h2>Borrowed Books</h2>
        {borrowedBooks?.map((b) => (
          <div className="book_card" key={b.id}>
            <div className="book-details">
              <p className="book_title">Title:{b.bookCopy.book.title}</p>
              <p className="book_author">Author:{b.bookCopy.book.author.name}</p>
              <p className="book_copy_id">BookCopyid:{b.bookCopy.id}</p>
              <p className="borrow_date">Borrowed at: {new Date(b.borrowDate).toLocaleString()}</p>
              <p className="return_date">Return Date: {new Date(b.returnDate).toLocaleString()}</p>
              <button onClick={() => handleReturnClick(user?.id, b.bookCopy.id)}>Return Book</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserProfile
