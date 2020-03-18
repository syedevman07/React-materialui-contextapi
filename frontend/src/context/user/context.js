import { createContext } from 'react';

export const initialState = {
    users: [],
    page: 0,
    category: null,
    role: null,
    subCategory: null,
    search: "",
    loading: true,
  };

const context = createContext();

export default context;
