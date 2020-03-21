import { toast } from 'react-toastify';

import * as API from './api';

export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_SUB_CATEGORIES_SUCCESS = 'GET_SUB_CATEGORIES_SUCCESS';
export const CATEGORY_UPDATE_SUCCESS = 'CATEGORY_UPDATE_SUCCESS';
export const CATEGORY_DELETE_SUCCESS = 'CATEGORY_DELETE_SUCCESS';

export const getCategories = dispatch => async () => {
  try {
    
    const { data } = await API.getCategories();
    dispatch({
      type: GET_CATEGORIES_SUCCESS,
      payload: data.results,
    })
  } catch {

  }
}

export const updateCategory = dispatch => async (id, name) => {
  try {
    const { data } = await API.updateCategory(id, name);
    toast.success("Update Success !");
    dispatch({
      type: CATEGORY_UPDATE_SUCCESS,
      payload: data,
    })
  } catch(e){
    toast.error("Update Failed !");
    console.error("Category Update error ", e);
  }
}

export const getSubCategories = dispatch => async () => {
  try {
    
    const { data } = await API.getSubCategories();
    dispatch({
      type: GET_SUB_CATEGORIES_SUCCESS,
      payload: data.results,
    })
  } catch {
    
  }
}

export const deleteCategory = dispatch => async (id) => {
  try {
    await API.deleteCategory(id);
    dispatch({
      type: CATEGORY_DELETE_SUCCESS,
      payload: id,
    });
    toast.success("Delete Success!");
  } catch (e) {
    console.log("Category Delete Error:", e)
  }
}
