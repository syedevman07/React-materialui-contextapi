import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchControl from './search-control';

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: '30px',
    marginBottom: '15px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  link: {
    color: '#fff',
    textDecoration : 'none'
  }
});
const UserControl = () => {
  const classes = useStyles();

  return <div className={classes.root}>
    <Button color="primary" variant="contained"><Link to='/users/new' className={classes.link}>Add New User</Link></Button>
    <SearchControl />
  </div>
}

export default UserControl;