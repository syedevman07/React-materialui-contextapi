import React from 'react';
import {
  Button,
  Paper,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';

import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import { useUser } from '../../context/user';

const validationSchema = yup.object().shape({
  oldPassword: yup.string().required().min(8),
  newPassword: yup.string().required().min(8)
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
    marginBottom: 30,
  },
  error: {
    color: 'red'
  }
});

const PasswordChange = () => {
  const { methods: { changePassword } } = useUser();
  const { handleSubmit, control, errors } = useForm({
    validationSchema
  });
  const submit = (values) => {
    changePassword(values);

  }
  const classes = useStyles();
  return <div className={classes.root}>
    <Paper className={classes.paper}>
      <Typography className={classes.title}>Change Your Password</Typography>
      <form onSubmit={handleSubmit(submit)}>
        <Grid spacing={4} container >
          <Grid item xs={12}>
            <Controller
              name="oldPassword"
              control={control}
              as={
                <TextField
                  error={errors.oldPassword}
                  type="password"
                  label="Current Password"
                  fullWidth
                />}
            />
            </Grid>
          <Grid item xs={12}>
            <Controller
              name="newPassword"
              control={control}
              as={
                <TextField
                  error={errors.newPassword}
                  type="password"
                  label="New Password"
                  fullWidth
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

export default PasswordChange;