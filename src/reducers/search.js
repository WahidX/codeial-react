import {
  START_SEARCH,
  SEARCH_SUCCESS,
  SEARCH_FAILED,
  SEARCH_CLEAR,
} from '../actions/actionTypes';

const initialSearch = {
  postResults: [],
  userResults: [],
  loading: false,
  error: null,
};

export default function search(state = initialSearch, action) {
  switch (action.type) {
    case START_SEARCH:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        postResults: action.postResults,
        userResults: action.userResults,
      };
    case SEARCH_FAILED:
      return {
        loading: false,
        error: action.error,
      };
    case SEARCH_CLEAR:
      return {
        initialSearch,
      };
    default:
      return state;
  }
}
