
import { Book } from '../../interfaces/interface'
import './bookItem.scss'
import { useNavigate } from 'react-router-dom'
type Props = {
  book: Book
  bookCopyId: string
  availableCopies: number
  totalCopies: number
}

const BookItem = ({ book, bookCopyId, availableCopies, totalCopies }: Props) => {
  const navigate = useNavigate()

  const navigateToBookDetails = () => {
    navigate(`/book/${book.id}`)
  }
  return (
    <tr onClick={navigateToBookDetails}>
      <td>{book.title}</td>
      <td>{book.isbn}</td>
      <td>{book.description}</td>
      <td>{book.author.name}</td>
      <td>{book.category.name}</td>
      <td>{book.publisher}</td>
      <td>{new Date(book.publishedDate).toLocaleDateString()}</td>
      <td>
        {availableCopies > 0 ? `Available (${availableCopies}/${totalCopies})` : 'Not Available'}
      </td>
    </tr>
  )
}

export default BookItem
