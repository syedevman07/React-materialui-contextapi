import * as API from './api';

export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const CREATE_USER = 'CREATE_USER';

export const getUsers = dispatch => async (params) => {
  try {
    
    const { data } = await API.getUsers(params);
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: { data, params },
    })
  } catch {

  }
}

export const createUser = dispatch => async (params) => 
  API.createUser(params);
