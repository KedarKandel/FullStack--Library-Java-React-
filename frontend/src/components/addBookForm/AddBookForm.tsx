import { useState } from 'react'
import { Book } from '../../interfaces/interface'
import './addForm.scss'
import {  useSelector } from 'react-redux'
import {  RootState } from '../../app/store'


type Props = {
  onSubmit: (book: Book) => void
  setIsAdd: React.Dispatch<React.SetStateAction<boolean>>
}

const AddBookForm: React.FC<Props> = ({ onSubmit, setIsAdd }) => {
  const authors = useSelector((state: RootState) => state.author.authors)
  const categories = useSelector((state: RootState) => state.category.categories)
  const [addedBook, setAddedBook] = useState<Book>({
    id: '',
    title: '',
    description: '',
    isbn: '',
    author: { id: '', name: '', email: '' },
    category: { id: '', name: '' },
    publishedDate: new Date(),
    publisher: '',
    cover: '',
    copies: []
  })



  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    if (name === 'bookImage') {
      setAddedBook((prevBook) => ({
        ...prevBook,
        cover: value
      }));
    } else {
      setAddedBook((prevBook) => ({
        ...prevBook,
        [name]: name === 'category' || name === 'author' ? { id: value } : value
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const defaultAuthorId = authors.length > 0 ? authors[0].id : '';
    const defaultCategoryId = categories.length > 0 ? categories[0].id : '';

    const bookToAdd = {
      ...addedBook,
      author: addedBook.author.id ? addedBook.author : { id: defaultAuthorId, name: '', email: '' },
      category: addedBook.category.id ? addedBook.category : { id: defaultCategoryId, name: '' }
    };

    onSubmit(bookToAdd);

    setAddedBook({
      id: '',
      title: '',
      description: '',
      isbn: '',
      author: { id: '', name: '', email: '' },
      category: { id: '', name: '' },
      publishedDate: new Date(),
      publisher: '',
      cover: '',
      copies: []
    });
  };


  return (
    <div className="addBookForm">
      <div className="updateFormWrapper">
        <h2>Add Book</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title of the book</label>
          <input
            type="text"
            id="title"
            name="title"
            value={addedBook.title}
            onChange={handleChange}
            required
          />
          <label htmlFor="isbn">Isbn</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={addedBook.isbn}
            onChange={handleChange}
            required
          />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={addedBook.description}
            onChange={handleChange}
            required
          />
          <label htmlFor="publisher">Publisher</label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            value={addedBook.publisher}
            onChange={handleChange}
            required
          />
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={addedBook.category.id}
            onChange={handleChange}
            required>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <label htmlFor="author">Authors</label>
          <select
            id="author"
            name="author"
            value={addedBook.author.id}
            onChange={handleChange}
            required>
            {authors.map((author) => (
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
            value={new Date(addedBook.publishedDate).toISOString().split('T')[0]}
            onChange={handleChange}
            required
          />
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="cover"
            value={addedBook.cover}
            onChange={handleChange}
            required
          />

          <div className="updateFormButtons">
            <button type="submit" className="submit">
              Add Book
            </button>
            <button className="cancel" onClick={() => setIsAdd(false)}>
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBookForm