import { createContext } from 'react';

export const initialState = {
    users: [],
    params: {
      page: 0,
      category: null,
      role: null,
      subCategory: null,
      search: "",
    },
    loading: true,
    count: 0,
  };

const context = createContext();

export default context;
