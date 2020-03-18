import * as API from './api';

export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';

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
