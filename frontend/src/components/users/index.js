import React, { useEffect } from 'react';
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TableContainer,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useUser } from '../../context/user';

import UserTableHeader from './table-header';
import UserControl from './control';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  loader: {
    margin: 'auto',
    height: '300px'
  },
  delete: {
    color: 'red',
  }
});
const Users = () => {
  const { methods: { isAdmin } } = useUser();
  const classes = useStyles();
  const { data: { users, loading, count, params, params: { page } }, methods: { getUsers } } = useUser();

  useEffect(() => {
    getUsers(params);
  }, []);
  const handleChangePage = (e, pageNumber) => {
    getUsers({...params, page: pageNumber });
  }
  return (
    <div>
      <UserControl/>
      <Paper className={classes.root}>
        <TableContainer>
          <Table>
            <UserTableHeader/>
            {!loading ? <TableBody>
              {users.map((user, i) => (
                <TableRow key={i} hover>
                  <TableCell>
                    <Link to={`/users/${user.id}`}>{i + 1}</Link>
                  </TableCell>
                  <TableCell>
                    <Link to={`/users/${user.id}`}>{user.first_name}</Link>
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
                  {isAdmin() ? <TableCell>
                    <IconButton>
                      <DeleteIcon className={classes.delete} />
                    </IconButton>
                    <IconButton>
                    <Link to={`/users/${user.id}`}><EditIcon color="primary"/></Link>
                    </IconButton>
                  </TableCell> : null}
                </TableRow> 
              ))}
            </TableBody> :
            <div className={classes.loader}>
              <CircularProgress/>
            </div> }
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={count}
          rowsPerPage={10}
          page={page}
          onChangePage={handleChangePage}
        />
      </Paper>
    </div>
  )
}

export default Users;