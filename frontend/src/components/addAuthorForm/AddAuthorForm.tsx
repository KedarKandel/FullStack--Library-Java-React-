import './authorForm.scss'

type Props = {}

const AddAuthorForm = (props: Props) => {
  return (
    <div className='addAuthorForm'>
      <h1>Add New Author</h1>
      <form>
        <input type="text" placeholder="name" />
        <input type="email" placeholder="email" />
        <button>Add</button>
      </form>
    </div>
  )
}

export default AddAuthorForm
