import * as API from './api';

export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_SUB_CATEGORIES_SUCCESS = 'GET_SUB_CATEGORIES_SUCCESS';

export const getCategories = dispatch => async () => {
  try {
    
    const { data } = await API.getCategories();
    dispatch({
      type: GET_CATEGORIES_SUCCESS,
      payload: { data },
    })
  } catch {

  }
}

export const getSubCategories = dispatch => async () => {
  try {
    
    const { data } = await API.getSubCategories();
    dispatch({
      type: GET_SUB_CATEGORIES_SUCCESS,
      payload: { data },
    })
  } catch {
    
  }
}

