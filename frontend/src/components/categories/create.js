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
    marginRight: 30
  }
});
export const CategoryCreate = ({ open, handleClose}) => {
  const classes = useStyles();
  const [name, setName] = useState();
  const { methods: { createCategory } } = useCategory();
  const handleNameChange = (e) => setName(e.target.value);
  const handleCreateCategory = () => {
    createCategory(name);
  }
  if(!open) {
    return null;
  }
  return (
    <Paper className={classes.root}>
      <TextField className={classes.name} type="text" value={name} onChange={handleNameChange} placeholder="Category Name"/>
      <Button color="primary" variant="contained" className={classes.addButton} onClick={handleCreateCategory}>Create</Button>
      <Button color="secondary" variant="contained" onClick={handleClose}>Cancel</Button>
    </Paper>
  )
};

export default CategoryCreate;