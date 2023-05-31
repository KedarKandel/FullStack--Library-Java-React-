//libraries import
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { AppDispatch, RootState } from './app/store'
import { useEffect } from 'react'
// import of components
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import HomePage from './pages/homePage/HomePage'
import LandingPage from './pages/landingPage/LandingPage'
import BookDetailPage from './pages/bookDetailsPage/BookDetailsPage'
import { fetchBorrowingsByUser } from './features/borrowingSlice'
import UserProfile from './pages/userProfile/UserProfile'
import AdminPage from './pages/adminPage/AdminPage'
import { fetchAllBooks } from './features/bookSlice'


function App() {
  const user = useSelector((state: RootState) => state.user.currentUser)
  const borrowedBooks = useSelector((state: RootState) => state.borrow.borrowings)
  console.log(user)
  console.log(borrowedBooks)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (user !== null) {
      console.log("first")
      dispatch(fetchBorrowingsByUser(user))
      dispatch(fetchAllBooks())
    }
  }, [user])

  useEffect(() => {
    if (user !== null) {
      localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks))
    }
  }, [borrowedBooks, user, dispatch])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route index path="/" element={user ? <HomePage /> : <LandingPage />} />
        <Route path="/book/:id" element={user ? <BookDetailPage /> : <LandingPage />} />
        <Route index path="/user/" element={user ? < UserProfile/> : <LandingPage />} />
        <Route index path="/admin/" element={user ? < AdminPage/> : <LandingPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
