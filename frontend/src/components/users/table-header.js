import React from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core';

const tableHeaders = [
  'Email',
  'First Name',
  'Last Name',
  'Country',
  'City',
  'Category',
  'Sub Category',
]
const UserTableHeader = () => (
  <TableHead>
    <TableRow>
      {tableHeaders.map(header =>
      <TableCell>
        {header}
      </TableCell>)}
    </TableRow>
  </TableHead>
)

export default UserTableHeader;