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
import PostEnquiry from './post-enquiry';
import CategoryFilter from '../common/category-filter';
import SubCategoryFilter from '../common/sub-category-filter';
import { useUser } from '../../context/user';

const editValidationShape = {
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(8).required('Password is required'),
  passwordRepeat: yup.string().min(8).oneOf([yup.ref('password')], 'Passwords must match'),
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  role: yup.number().required("Role is required"),
  category: yup.number().test('Categpru-test', 'Category is required when role is no a admin', 
    function(value) {
      console.log("valeu, role", value, this.parent.role)
      return this.parent.role === 1 || ((value && value > 0) && this.parent.role == 2);
    }),
  sub_category: yup.number().test('SubCategory-test', 'SubCategory is required when role is not a admin', 
    function(value) {
      return this.parent.role === 1 || ((value && value > 0) && this.parent.role == 2);
    }),
}

const createValidationShape = {
  ...editValidationShape,
  password: yup.string().min(8).required('Password is required'),
  passwordRepeat: yup.string().required().min(8).oneOf([yup.ref('password')], 'Passwords must match'),
}

// const validationSchema = yup.object().shape();

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
  const { id } = useParams();
  const creating = id === 'new';
  console.log(createValidationShape)
  const validationShape = creating ? createValidationShape : editValidationShape;
  const [category, setCategory] = useState(0);
  const [sub_category, setSubCategory] = useState(0);
  const { methods:  { createUser, getUser }, data, data: { user = {} } } = useUser();
  const classes = useStyles();
  useEffect(() => {
    if(!creating) {
      getUser(id)
    }
  }, [id]);

  const { handleSubmit, control, errors, setValue, register } = useForm({
    validationSchema: yup.object().shape(validationShape),
    defaultValues: creating ? {} : {
      ...user,
      category: user.category && user.category.id || 0,
      sub_category: user.sub_category && user.sub_category.id || 0,
    }
  });
  useEffect(() => {
    register({ name: 'category' });
    register({ name: 'sub_category' });
  }, [register]);
  const handleChangeCategory = category => {
    setCategory(category);
    setValue('category', category);
  };

  const handleSubCategoryChange = sub_category => {
    setSubCategory(sub_category);
    setValue('sub_category', sub_category);
  }

  const submit = (values) => {
    createUser(values);
  }

  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h1" gutterBottom className={classes.title}>
          {creating ? "Create User" : "Edit User"}
        </Typography>
      <form onSubmit={handleSubmit(submit)}>
        <Paper style={{padding: '20px', width: '500px'}} className={classes.paper}>
            <Grid spacing={4} container >
              <Grid item xs={6}>
                <Controller
                  name="first_name"
                  control={control}
                  as={
                    <TextField
                      error={errors.first_name}
                      type="text"
                      label="First Name"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircleIcon />
                          </InputAdornment>
                        ),
                      }}
                    />}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="last_name"
                  control={control}
                  as={
                    <TextField
                      error={errors.last_name}
                      type="text"
                      label="Last Name"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircleIcon />
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                    />}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="email"
                  control={control}
                  as={
                    <TextField
                      error={errors.email}
                      type="email"
                      label="Email"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon />
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                    />}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Controller
                    name="role"
                    control={control}
                    as={
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          fullWidth
                          IconComponent={GroupIcon}
                          error={errors.role}
                        >
                          <MenuItem value={1}>Admin</MenuItem>
                          <MenuItem value={2}>Regular User</MenuItem>
                        </Select>
                    }
                  />
                </FormControl>
              </Grid>
              {creating ? <>
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
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <VpnKeyIcon />
                            </InputAdornment>
                          ),
                        }}
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
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <VpnKeyIcon />
                              </InputAdornment>
                            ),
                          }}
                        />}
                    />
                  </Grid>
                  </> : null}
                <Grid item xs={6}>
                  <CategoryFilter
                    variant="" 
                    defaultValue={category}
                    error={errors.category}
                    onChangeHanlder={handleChangeCategory}
                  />
                </Grid>
                <Grid item xs={6}>
                  <SubCategoryFilter
                    variant=""
                    defaultValue={sub_category}
                    category={category}
                    error={errors.sub_category}
                    onChangeHanlder={handleSubCategoryChange}
                  />
                </Grid>
              <Grid item xs={6}>
                <Controller
                  name="country"
                  control={control}
                  as={
                    <TextField
                      error={errors.country}
                      type="country"
                      label="Country"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOnIcon />
                          </InputAdornment>
                        ),
                      }}
                    />}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="city"
                  control={control}
                  as={
                    <TextField
                      error={errors.city}
                      type="city"
                      label="City"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOnIcon />
                          </InputAdornment>
                        ),
                      }}
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
          </Paper>
        </form>
        {!creating ? <PostEnquiry userId={user.id}/> : null}
    </div>
  )
};

export default User;