import { useState } from 'react'
import { Book } from '../../interfaces/interface'
import './updateForm.scss'

type Props = {
  book: Book
  onUpdateBook: (book: Book) => void
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdateForm = ({ book, onUpdateBook, setIsOpen }: Props) => {
  const [updatedBook, setUpdatedBook] = useState(book)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUpdatedBook((prevBook) => ({
      ...prevBook,
      [name]: value
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onUpdateBook(updatedBook)
    setIsOpen(false)
  }

  return (
    <div className="updateForm">
      <div className="updateFormWrapper">
        <h2>Update book</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title of the book</label>
          <input
            type="text"
            id="title"
            name="title"
            value={updatedBook.title}
            onChange={handleChange}
            required
          />
          <label htmlFor="isbn">Isbn</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={updatedBook.isbn}
            onChange={handleChange}
            required
          />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={updatedBook.description}
            onChange={handleChange}
            required
          />
          <label htmlFor="publisher">Publisher</label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            value={updatedBook.publisher}
            onChange={handleChange}
            required
          />
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={updatedBook.category.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="authors">Authors</label>
          <input
            type="text"
            id="authors"
            name="authors"
            value={updatedBook.author.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="publishedDate">Published date</label>
          <input
            type="date"
            id="publishedDate"
            name="publishDate"
            value={updatedBook.publishedDate.toString()}
            onChange={handleChange}
            required
          />

          <div className="updateFormButtons">
            <button type="submit" className="submit">
              Update book
            </button>
            <button type="button" className="cancel" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateForm
