import { useState } from 'react'
import { Book } from '../../interfaces/interface'
import './updateForm.scss'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'

type Props = {
  book: Book
  onUpdateBook: (book: Book) => void
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdateForm = ({ book, onUpdateBook, setIsOpen }: Props) => {
  const authors = useSelector((state: RootState) => state.author.authors)
  const categories = useSelector((state: RootState) => state.category.categories)
  const [updatedBook, setUpdatedBook] = useState<Book>(book)
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUpdatedBook((prevBook) => ({
      ...prevBook,
      [name]: name === "category" || name === "author" ? { id: value } : value
    }));
  };
  

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
           <select
            id="category"
            name="category"
            value={updatedBook.category.id}
            onChange={handleChange}
            required>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <label htmlFor="author">Authors</label>
          <select
            id="author"
            name="author"
            value={updatedBook.author.id}
            onChange={handleChange}
            required>
            {authors?.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>

          <label htmlFor="publishedDate">Published date</label>
          <input
            type="date"
            id="publishedDate"
            name="publishedDate"
            value={new Date(updatedBook.publishedDate).toISOString().split('T')[0]}
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