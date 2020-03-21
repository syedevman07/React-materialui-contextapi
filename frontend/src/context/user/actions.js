import * as API from './api';
import ROLE from '../../utils/constants/role';
import { toast } from 'react-toastify';
import { history } from '../..';

export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const CREATE_USER = 'CREATE_USER';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const RESET_STORE = 'RESET_STORE';
export const SEND_ENQUIERY_SUCCESS = 'SEND_ENQUIERY_SUCCESS';
export const SIGN_OUT = 'SIGN_OUT';


export const signOut = dispatch => async => {
  localStorage.removeItem('token');
  dispatch({
    type: SIGN_OUT,
  });
  toast.success("Signout Success!");
  history.push("/");
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

export const createUser = dispatch => async (data) =>{
  try {
    await API.createUser(data);
    toast.success("User Create Success!");
  } catch (e) {
    if(e.email) {
      toast.error(e.email[0]);
    } else {
      toast.error("User Create Failed!");
    }
  }
}

export const login = dispatch => async (data) => {
  dispatch({
    type: LOGIN_REQUEST
  });
  try {
    let result = await API.login(data);
    const { access } = result.data;
    localStorage.setItem("token", access);
    result = await API.getProfile();
    toast.success("Login Success!");
    history.push("/");
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

export const getUser = dispatch => async (id) => {
  try {
    const { data } = await API.getUser(id);
    dispatch({
      type: GET_USER_SUCCESS,
      payload: data,
    })
  } catch {
    dispatch({
      type: GET_USER_SUCCESS,
      payload: null,
    })
    toast.error("Error in feteching user profile!");
  }
}

export const sendEnquiery = dispatch => async (userId, content) => {
  try {
    const { data } = await API.sendEnquiry(userId, content);
    dispatch({
      type: SEND_ENQUIERY_SUCCESS,
      payload: data,
    });
    toast.success("Your message was delivered successfully.");
  } catch {
    toast.error("Message deliver failure");
  }
}

export const isAdmin = state => () =>  state.currentUser && state.currentUser.role === ROLE.Admin;