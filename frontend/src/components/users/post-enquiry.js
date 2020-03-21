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
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    marginBottom: 30
  },
  addButton: {
    marginRight: 30
  }
});
export const CategoryCreate = ({ userId }) => {
  const classes = useStyles();
  const [content, setContent] = useState();
  const handleContentChange = (e) => setContent(e.target.value);

  return (
    <Paper className={classes.root}>
      <TextField className={classes.content} rows={8} multiline type="text" value={content} placeholder="Enter your enquiry."/>
      <Button color="primary" variant="contained" className={classes.addButton}>Send</Button>
      <Button color="secondary" variant="contained" onClick={() => setContent("")}>Clear</Button>
    </Paper>
  )
};

export default CategoryCreate;