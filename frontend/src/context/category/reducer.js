import {
  GET_CATEGORIES_SUCCESS,
  GET_SUB_CATEGORIES_SUCCESS,
} from './actions';

import { initialState } from './context';

export default (
  state = initialState,
  action = { type: undefined, payload: undefined }
) => {
  const { type, payload } = action;
  switch(type) {
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload.data.results,
        categoryLoading: false,
      };
    case GET_SUB_CATEGORIES_SUCCESS:
      return {
        ...state,
        subCategories: payload.data.results,
        subCategoryLoading: false,
      };
    default:
      return state;
  }
}