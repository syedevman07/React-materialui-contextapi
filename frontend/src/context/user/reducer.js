import {
  GET_USERS,
} from './actions';

import { initialState } from './context';

export default (
  state = initialState,
  action = { type: undefined, payload: undefined }
) => {
  const { type, payload } = action;
  switch(type) {
      case GET_USERS:
          return {
              ...state,
              ...payload,
          };
      default:
          return state;
  }
}