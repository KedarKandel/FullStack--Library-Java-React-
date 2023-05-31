import { Link } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import jwtDecode from 'jwt-decode'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../app/store'
import { setCurrentUser, logout } from '../../features/userSlice'

import { User } from '../../interfaces/interface'
import api from '../../api/api'
import axios from 'axios'
import { useEffect } from 'react'
import { fetchAllBooks } from '../../features/bookSlice'
import './navbar.scss'

type Props = {}

const Navbar = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const currentUser = useSelector((state: RootState) => state.user.currentUser)
  const borrowedBooks = useSelector((state: RootState) => state.borrow.borrowings)

  useEffect(() => {
    const getTokenAndSetUser = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`

          // Decode the token to retrieve the user data
          const decodedToken: any = jwtDecode(token)
          const user: User = {
            id: decodedToken?.user_id,
            username: decodedToken?.username,
            password: '',
            role: 'USER'
          }

          dispatch(setCurrentUser(user))
        } else {
          delete api.defaults.headers.common['Authorization']
          dispatch(logout())
        }
      } catch (error) {
        console.error('Error while setting user:', error)
      }
    }

    getTokenAndSetUser()
  }, [dispatch])

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    
    try {
      const decodedToken: any = jwtDecode(credentialResponse.credential)
      // Register the user
      const res = await axios.post('http://localhost:8080/api/v1/user/signup', {
        username: decodedToken?.email,
        password: "12345",
        role: 'USER'
      })
      // Perform signin process to obtain the JWT token
      const signinResponse = await axios.post('http://localhost:8080/api/v1/user/signin', {
        username: res.data.username,
        password: "12345"
      })

      // Store the token in the local storage
      localStorage.setItem('token', signinResponse.data)
    
      // Create a user object with the extracted data
      const userDetails: any = jwtDecode(signinResponse.data)

      const user: User = {
        id: userDetails.user_id,
        username: userDetails.username,
        password: '',
        role: 'USER'
      }
      // Set the token as a default header for axios requests
      api.defaults.headers.common['Authorization'] = `Bearer ${signinResponse.data}`
      dispatch(setCurrentUser(user))
    } catch (error) {
      // Handle any errors
      console.error('Error during google signin')
    }
  }

  const handleLogout = () => {
    // Clear the user data from the Redux store
    dispatch(logout())

    // Remove the token from the local storage
    localStorage.removeItem('token')
    localStorage.removeItem('borrowedBooks')

    // Remove the token from the default header for axios requests
    delete api.defaults.headers.common['Authorization']
  }

  return (
    <header className="navbar">
      {currentUser ? (
        // Render navbar for authenticated user
        <>
          <Link to="/" style={{ textDecoration: 'none', color:"rgb(246, 189, 47)" }}>
            <h1 className='logo'>e-Library</h1>
          </Link>
          <div className="links">
            <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
              <span>Home</span>
            </Link>
            <Link to="/admin" style={{ textDecoration: 'none', color: '#fff' }}>
              <span>Admin</span>
            </Link>
          </div>
          <Link to="/user" style={{ textDecoration: 'none', color: '#fff' }}>
            <div>
              <span>My Profile({borrowedBooks.length})</span>
            </div>
          </Link>
          <button
            onClick={handleLogout}
            style={{
              color: 'crimson',
              padding: '4px 8px',
              cursor: 'pointer',
              fontSize: '18px',
              outline: 'none'
            }}>
            Logout
          </button>
        </>
      ) : (
        // Render navbar for non-authenticated user
        <div className='navbar_login'>
          <Link to="/" style={{ textDecoration: 'none',color:"rgb(246, 189, 47)"}}>
            <h1 >e-Library</h1>
          </Link>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => {
              console.log('Login Failed')
            }}
          />
        </div>
      )}
    </header>
  )
}

export default Navbar
