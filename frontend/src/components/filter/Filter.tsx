import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Stack } from '@mui/material'

type Props = {
  category: string
  setCategory: React.Dispatch<React.SetStateAction<string>>
}

const Filter = ({ category, setCategory }: Props) => {
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value)
  }

  return (
    <Stack
      sx={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '5px'
      }}>
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="category__filter">Categories</InputLabel>
        <Select
          labelId="category__filter"
          id="category__filter"
          value={category}
          onChange={handleChange}
          autoWidth
          label="Category">
          <MenuItem value={'all'}>All</MenuItem>
          <MenuItem value={'drama'}>Drama</MenuItem>
          <MenuItem value={'fiction'}>Fiction</MenuItem>
          <MenuItem value={'history'}>History</MenuItem>
          <MenuItem value={'science'}>Science</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  )
}

export default Filter
