import React, { useState } from 'react';
import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';

import CategoryFilter from '../common/category-filter';
import SubCategoryFilter from '../common/sub-category-filter';

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(8).required('Password is required'),
  passwordRepeat: yup.string().min(8).oneOf([yup.ref('password'), null], 'Passwords must match'),
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  category: yup.number().required("Category is required"),
  subCategory: yup.number().required("Sub Category is required")
});

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
  error: {
    color: 'red'
  }
});
const User = () => {
  const { handleSubmit, control, errors } = useForm({
    validationSchema,
  });
  const [category, setCategory] = useState(0);
  const [subCategory, setSubCategory] = useState(0);

  const classes = useStyles();
  const creating = true;

  const handleChangeCategory = category => {
    setCategory(category);
  };

  const handleSubCategoryChange = subCategory => {
    setSubCategory(subCategory);
  }
  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h1" gutterBottom className={classes.title}>
          {creating ? "Create New User" : "Edit User"}
        </Typography>
      <form onSubmit={handleSubmit(() => {})}>
        <Paper style={{padding: '20px', width: '500px'}} className={classes.paper}>
            <Grid spacing={4} container >
              <Grid item xs={6}>
                <Controller
                  name="firstName"
                  control={control}
                  as={
                    <TextField
                      error={errors.firstName}
                      type="text"
                      label="First Name"
                      fullWidth
                    />}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="lastName"
                  control={control}
                  as={
                    <TextField
                      error={errors.lastName}
                      type="text"
                      label="Last Name"
                      fullWidth
                    />}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  as={
                    <TextField
                      error={errors.email}
                      type="email"
                      label="Email"
                      fullWidth
                    />}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="password"
                  control={control}
                  as={
                    <TextField
                      error={errors.password}
                      type="password"
                      label="Password"
                      fullWidth
                    />}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="passwordRepeat"
                  control={control}
                  as={
                    <TextField
                      error={errors.passwordRepeat}
                      type="password"
                      label="Password Repeat"
                      fullWidth
                    />}
                />
              </Grid>
              <Grid item xs={6}>
                <CategoryFilter
                  variant="" 
                  defaultValue={category}
                  onChangeHanlder={handleChangeCategory}
                />
              </Grid>
              <Grid item xs={6}>
                <SubCategoryFilter
                  variant=""
                  defaultValue={subCategory}
                  category={category}
                  onChangeHanlder={handleSubCategoryChange}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="country"
                  control={control}
                  as={
                    <TextField
                      error={errors.name}
                      type="country"
                      label="Country"
                      fullWidth
                    />}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="city"
                  control={control}
                  as={
                    <TextField
                      error={errors.name}
                      type="city"
                      label="City"
                      fullWidth
                    />}
                />
              </Grid>

            <Grid item xs={4}>
              <Button type="submit" fullWidth variant="contained" color="primary">Submit</Button>
            </Grid>
            <Grid item xs={4}>
              <Button type="button" fullWidth variant="contained" color="secondary">Reset</Button>
            </Grid>
            <Grid item xs={4}>
              <Button>
                <Link color="primary" to="/users/">Back to Users</Link>
              </Button>
            </Grid>
            </Grid>
            {/* {user.user_level === roles.SUPER_ADMIN ? null : <Grid container style={{marginTop: '20px'}}>
            </Grid>} */}
          </Paper>
          </form>
    </div>
  )
};

export default User;