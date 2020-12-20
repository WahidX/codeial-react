import {
  UPDATE_POSTS,
  START_POSTING,
  POSTING_FAILED,
  POSTING_SUCCESS,
} from '../actions/actionTypes';

const initialPost = {
  posts: [],
  posting: false,
  error: null,
};

export default function posts(state = initialPost, action) {
  switch (action.type) {
    case UPDATE_POSTS:
      return {
        ...state,
        posts: action.posts,
      };
    case START_POSTING:
      return {
        ...state,
        posting: true,
      };
    case POSTING_SUCCESS:
      return {
        ...state,
        posts: [action.newPost, ...state.posts],
        posting: false,
      };
    case POSTING_FAILED:
      return {
        ...state,
        posting: false,
        error: action.error,
      };
    default:
      return state;
  }
}
