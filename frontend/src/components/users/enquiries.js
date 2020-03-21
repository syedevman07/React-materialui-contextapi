import React, { useState, useEffect } from 'react';
import {
  Button,
  Paper,
  Typography,
} from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import PostEnquiry from './post-enquiry';

const useStyles = makeStyles({
  paper: {
    marginTop: 10,
    padding: 10
  },
  root: {
    marginTop: 30,
    width: 500,
    margin: 'auto',

  },
  title: {
    textAlign: 'center'
  },
  label: {
    fontWeight: 600,
  },
  enquiry: {
    textAlign: 'left',
    fontSize: 15,
  },
});

const Enquiries = ({ enquiries, user }) => {
  const classes = useStyles();
  if(!enquiries.length) {
    return (<div className={classes.root}>
      <Typography variant="h5" component="h1" gutterBottom className={classes.title}>
          No Enquiries Found
        </Typography>
    </div>)
  }
  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h1" gutterBottom className={classes.title}>
          Enquiries
        </Typography>
        {enquiries.map(enquiry => (
          <Paper key={enquiry.id} className={classes.paper}>
            <Typography variant="h5" component="h1" color="primary" gutterBottom className={classes.enquiry}>
            {enquiry.content}
            </Typography>
          </Paper>
        )) 
        }
        <PostEnquiry userId={user.id}/>
    </div>
  )
};

export default Enquiries;