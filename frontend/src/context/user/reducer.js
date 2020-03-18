import {
  GET_USERS_SUCCESS,
} from './actions';

import { initialState } from './context';

export default (
  state = initialState,
  action = { type: undefined, payload: undefined }
) => {
  const { type, payload } = action;
  switch(type) {
      case GET_USERS_SUCCESS:
          const { data: { count, results}, params } = payload;
          return {
              ...state,
              users: results,
              count,
              params: { ...state.params, ...params},
              loading: false,
          };
      default:
          return state;
  }
}