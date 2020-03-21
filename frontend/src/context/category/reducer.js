import produce from 'immer';
import {
  GET_CATEGORIES_SUCCESS,
  GET_SUB_CATEGORIES_SUCCESS,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_DELETE_SUCCESS
} from './actions';
import { initialState } from './context';

export default (
  state = initialState,
  action = { type: undefined, payload: undefined }
) => {
  const { type, payload } = action;
  return produce(state, draft => {
    switch(type) {
      case GET_CATEGORIES_SUCCESS:
        draft.categories = payload;
        draft.categoryLoading = false;
        break;
      case GET_SUB_CATEGORIES_SUCCESS:
        draft.subCategories = payload;
        draft.subCategoryLoading = false;
      case CATEGORY_UPDATE_SUCCESS:
        draft.categories = draft.categories.map(category => category.id === payload.id ? payload : category);
        break;
      case CATEGORY_DELETE_SUCCESS:
        draft.categories = draft.categories.filter(category => category.id !== payload)
        break;
    }
  }) 
}

// export default (
//   state = initialState,
//   action = { type: undefined, payload: undefined }
// ) => {
//   const { type, payload } = action;
//   switch(type) {
//     case GET_CATEGORIES_SUCCESS:
//       return {
//         ...state,
//         categories: payload.data.results,
//         categoryLoading: false,
//       };
//     case GET_SUB_CATEGORIES_SUCCESS:
//       return {
//         ...state,
//         subCategories: payload.data.results,
//         subCategoryLoading: false,
//       };

//     default:
//       return state;
//   }
// }