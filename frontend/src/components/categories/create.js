import React, { useState } from 'react';
import { Paper, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useCategory } from '../../context/category';

const useStyles = makeStyles({
  root: {
    width: 500,
    marginTop: 40,
    marginBottom: 40,
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
  },
  name: {
    marginRight: 30
  },
  addButton: {
    color: 'red',
  }
});
export const CategoryCreate = () => {
  const classes = useStyles();
  const [name, setName] = useState();
  const { methods: { createCategory } } = useCategory();
  const handleNameChange = (e) => setName(e.target.value);
  const handleCreateCategory = () => {
    createCategory(name);
  }
  return (
    <Paper className={classes.root}>
      <TextField className={classes.name} type="text" value={name} onChange={handleNameChange} placeholder="Category Name"/>
      <Button color="primary" variant="contained" onClick={handleCreateCategory}>Add New Category</Button>
    </Paper>
  )
};

export default CategoryCreate;