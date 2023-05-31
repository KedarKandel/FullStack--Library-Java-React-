import { Book } from '../../interfaces/interface'
import './adminbookItem.scss'

type Props = {
  book: Book
  availableCopies: number
  totalCopies: number
  bookCopyId: string
  onDeleteBook: () => void
  onUpdateBook: ()=>void
}

const AdminBookItem = ({ book, availableCopies, totalCopies,onUpdateBook, onDeleteBook }: Props) => {
  return (
    <div className="admin__book__item">
      <h2>{book.title}</h2>
      <p>Isbn:<small>{book.isbn}</small></p>
      <p>Desc:<small>{book.description}</small></p>
      <p>Author:<small>{book.author.name}</small></p>
      <p>Category:<small>{book.category.name}</small></p>
      <p>Publisher:<small>{book.publisher}</small></p>
      <p>Published Date:<small>{new Date(book.publishedDate).toLocaleDateString()}</small></p>
      <p>
        {availableCopies > 0 ? `Available (${availableCopies}/${totalCopies})` : 'Not Available'}
      </p>
      <button className='update' onClick={onUpdateBook}>update</button>
      <button className='delete' onClick={onDeleteBook}>delete</button>
    </div>
  )
}

export default AdminBookItem
