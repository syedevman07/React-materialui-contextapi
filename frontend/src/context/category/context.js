import { createContext } from 'react';

export const initialState = {
  categories: [],
  subCategories: [],
  categoryLoading: true,
  subCategoryLoading: true,
};

const context = createContext();

export default context;
