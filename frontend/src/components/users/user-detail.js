import React, { useState, useEffect } from 'react';
import {
  Button,
  Grid,
  FormControl,
  InputLabel,
  InputAdornment,
  Select,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import GroupIcon from '@material-ui/icons/Group';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';

import CategoryFilter from '../common/category-filter';
import SubCategoryFilter from '../common/sub-category-filter';
import { useUser } from '../../context/user';


const useStyles = makeStyles({
  paper: {
    maxWidth: '500',
    margin: 'auto',
  },
  root: {
    marginTop: 30
  },
  title: {
    textAlign: 'center'
  },
  label: {
    fontWeight: 600,
  }
});

const User = () => {
  const classes = useStyles();
  const { data: { user }, methods: { getUser } } = useUser();
  const params = useParams();
  useEffect(() => {
    getUser(params.id);
  }, []);
  console.log("user", user.sub_category)
  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h1" gutterBottom className={classes.title}>
          User Detail
        </Typography>
        <Paper style={{padding: '20px', width: '500px'}} className={classes.paper}>
            <Grid spacing={4} container >
              <Grid item xs={4} className={classes.label}>
                First Name
              </Grid>
              <Grid item xs={8}>
                {user.first_name}
              </Grid>
              <Grid item xs={4} className={classes.label}>
                Last Name
              </Grid>
              <Grid item xs={8}>
                {user.last_name}
              </Grid>
              <Grid item xs={4} className={classes.label}>
                Country
              </Grid>
              <Grid item xs={8}>
                {user.coutry}
              </Grid>
              <Grid item xs={4} className={classes.label}>
                City
              </Grid>
              <Grid item xs={8}>
                {user.city}
              </Grid>
              <Grid item xs={4} className={classes.label}>
                Category
              </Grid>
              <Grid item xs={8}>
                {user.category && user.category.name || ""}
              </Grid>
              <Grid item xs={4} className={classes.label}>
                Sub Category
              </Grid>
              <Grid item xs={8}>
                {user.sub_category && user.sub_category.name || ""}
              </Grid>
            </Grid>
          </Paper>
    </div>
  )
};

export default User;