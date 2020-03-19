import React, { useEffect } from 'react';
import { useCategory } from '../../context/category'
import { 
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%'
  },
}));

const CategoryFilter = ({ defaultValue = 0, error, variant="outlined", onChangeHanlder = () => {}}) => {
  const classes = useStyles();
  const [category, setCategory] = React.useState(defaultValue);
  const { data: { categories }, methods: { getCategories } } = useCategory();
  useEffect(() => {
    if(!categories.length) {
      getCategories();
    }
  }, []);
  const handleChange = event => {
    setCategory(event.target.value);
    onChangeHanlder(event.target.value);
  };

  return (
    <FormControl variant={variant} className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
      <Select
        value={category || 0}
        onChange={handleChange}
        label="Category"
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        error={error}
      >
        <MenuItem value={0}>
          All Categories
        </MenuItem>
        {categories.map(category => <MenuItem key={category.id} value={category.id}>
          {category.name}
        </MenuItem>)}
      </Select>
    </FormControl>
  )
}

export default CategoryFilter;