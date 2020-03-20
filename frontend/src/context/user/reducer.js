import {
  GET_USERS_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  RESET_STORE,
} from './actions';

import { initialState } from './context';

export default (
  state = initialState,
  action = { type: undefined, payload: undefined }
) => {
  const { type, payload } = action;
  const newState = { ...state, updatedAt: new Date().getMilliseconds() }
  switch(type) {
      case GET_USERS_SUCCESS:
        const { data: { count, results}, params } = payload;
        return {
          ...newState,
          users: results,
          count,
          params: { ...newState.params, ...params},
          loading: false,
        };
      case LOGIN_REQUEST:
        return {
          ...newState,
          loginLoading: true,
        }
      case LOGIN_SUCCESS:
        return {
          ...newState,
          currentUser: {
            ...payload,
          },
          loginLoading: false,
        }
      case LOGIN_FAILURE: 
        return {
          ...newState,
          loginLoading: false,
        }
      case RESET_STORE:
        return {
          ...payload,
          updatedAt: new Date().getMilliseconds(),
        }
      default:
          return state;
  }
}