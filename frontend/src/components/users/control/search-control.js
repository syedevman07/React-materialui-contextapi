import React, { useState } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import { useUser } from '../../../context/user';

const UserControl = () => {
  const { methods: { getUsers }, data: { params } } = useUser();
  const [search, setSearch] = useState(params.search || "");
  const handleKeyDown = e => {
    const { keyCode } = e;
    if (keyCode === 13) {
      getUsers({...params, search })
    }
  };
  const handleChange = (e) => setSearch(e.target.value);
  return (
    <TextField
        id="input-with-icon-textfield"
        label="Search Users"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={search}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
    />
  )
}

export default UserControl;