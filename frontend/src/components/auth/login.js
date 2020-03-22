import React, { useState } from 'react';
import {
  Button,
  Paper,
  Grid,
  InputAdornment,
  TextField,
  Typography
} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import { useUser } from '../../context/user';

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8)
});

const useStyles = makeStyles({
  paper: {
    maxWidth: 400,
    margin: 'auto',
    padding: 30,
  },
  root: {
    marginTop: 30
  },
  title: {
    textAlign: 'center',
    fontWeight: 600,
    fontSize: 25,
  },
  error: {
    color: 'red'
  }
});

const Login = () => {
  const { methods: { login } } = useUser();
  const { handleSubmit, control, errors } = useForm({
    validationSchema
  });
  const submit = (values) => {
    login(values);

  }
  const classes = useStyles();
  return <div className={classes.root}>
    <Paper className={classes.paper}>
      <Typography className={classes.title}>Login</Typography>
      <form onSubmit={handleSubmit(submit)}>
        <Grid spacing={4} container >
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />}
            />
            </Grid>
          <Grid item xs={12}>
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
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />}
            />
          </Grid>
          <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" color="primary">Submit</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  </div>
}

export default Login;