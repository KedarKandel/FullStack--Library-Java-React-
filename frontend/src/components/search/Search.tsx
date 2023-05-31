import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import './search.scss'

type Props = {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

const Search = ({ searchTerm, setSearchTerm }: Props) => {
  return (
    <Box
      className="search"
      component="form"
      sx={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '5px'
      }}
      noValidate
      autoComplete="off">
      <TextField
        id="outlined-basic"
        label="search books ..."
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Box>
  )
}

export default Search
