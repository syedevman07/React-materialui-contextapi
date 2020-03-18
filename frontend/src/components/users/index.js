import React, { useEffect } from 'react';
import {
  Button,
  Grid,
  Input,
  InputAdornment,
  IconButton,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TablePagination,
  Typography,
  TableContainer,
  Tab,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MainLayout from '../Layout';
import { useUser } from '../../context/user';

import UserTableHeader from './table-header';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});
const Users = () => {
  const classes = useStyles();
  const { data: { users, loading, count, params: { page, search, category, subCategory } }, methods: { getUsers } } = useUser();

  useEffect(() => {
    getUsers({ page, search, category, subCategory});
  }, []);
  console.log("----------users", users)
  return (
    <MainLayout>
      <Paper className={classes.root}>
        <TableContainer>
          <Table>
            <UserTableHeader/>
            <TableBody>
              {users.map((user, i) => (
                <TableRow key={i} hover>
                  <TableCell>
                    {user.email}
                  </TableCell>
                  <TableCell>
                    {user.first_name}
                  </TableCell>
                  <TableCell>
                    {user.last_name}
                  </TableCell>
                  <TableCell>
                    {user.country}
                  </TableCell>
                  <TableCell>
                    {user.city}
                  </TableCell>
                  <TableCell>
                    {user.category && user.category.name || ""}
                  </TableCell>
                  <TableCell>
                    {user.sub_category && user.sub_category.name || ""}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={count}
          rowsPerPage={10}
          page={page}
          onChangePage={() => {}}
        />
      </Paper>
    </MainLayout>
  )
}

export default Users;