import React from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { useUser } from '../../context/user';

const tableHeaders = [
  'No',
  'First Name',
  'Last Name',
  'Country',
  'City',
  'Category',
  'Sub Category',
]

const UserTableHeader = () => {
  const { methods: { isAdmin } } = useUser();
  return (
    <TableHead>
      <TableRow>
        {tableHeaders.map(header =>
        <TableCell key={header}>
          {header}
        </TableCell>)}
        {isAdmin() ? <TableCell key="actions">
          Actions
        </TableCell> : null}
      </TableRow>
    </TableHead>
  )
}
export default UserTableHeader;