import * as API from './api';
import ROLE from '../../utils/constants/role';

export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const CREATE_USER = 'CREATE_USER';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const RESET_STORE = 'RESET_STORE';
export const SIGN_OUT = 'SIGN_OUT';

export const signOut = dispatch => async => {
  localStorage.removeItem('token');
  dispatch({
    type: SIGN_OUT,
  });
}
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

export const createUser = dispatch => async (data) => 
  API.createUser(data);

export const login = dispatch => async (data) => {
  dispatch({
    type: LOGIN_REQUEST
  });
  try {
    let result = await API.login(data);
    const { access } = result.data;
    localStorage.setItem("token", access);
    result = await API.getProfile();
    dispatch({
      type: LOGIN_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    localStorage.removeItem("token");
    dispatch({
      type: LOGIN_FAILURE,
    })
  }
}

export const resetStore = dispatch => async (data) => {
  dispatch({
    type: RESET_STORE,
    payload: data,
  });
}

export const isLoggedIn = state => () => {
  const isLoggedIn = !!state.currentUser.id;
  return isLoggedIn;
}

export const isAdmin = state => () =>  state.currentUser && state.currentUser.role === ROLE.Admin;