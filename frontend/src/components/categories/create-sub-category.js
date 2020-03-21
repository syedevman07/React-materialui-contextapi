import React, { useState } from 'react';
import { Paper, Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useCategory } from '../../context/category';

const useStyles = makeStyles({
  root: {
    width: 500,
    marginTop: 40,
    marginBottom: 40,
    margin: 'auto',
    justifyContent: 'center',
    padding: 20,
  },
  body: {
    display: 'flex',
    justifyContent: 'center',
  },
  name: {
    marginRight: 30
  },
  addButton: {
    marginRight: 30
  },
  label: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20
  },
  category: {
    fontWeight: "bold",
  }

});
export const SubCategoryCreate = ({ open, handleClose, category}) => {
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
      <Typography className={classes.label}>
        Create new sub category under the category <span className={classes.category}>{category && category.name || ""}</span>
      </Typography>
      <div className={classes.body}>
        <TextField className={classes.name} type="text" value={name} onChange={handleNameChange} placeholder="Sub Category Name"/>
        <Button color="primary" variant="contained" className={classes.addButton} onClick={handleCreateCategory}>Create</Button>
        <Button color="secondary" variant="contained" onClick={handleClose}>Cancel</Button>
      </div>
    </Paper>
  )
};

export default SubCategoryCreate;