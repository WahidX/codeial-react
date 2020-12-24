import {
  UPDATE_POSTS,
  START_POSTING,
  POSTING_FAILED,
  POSTING_SUCCESS,
  START_DELETE_POST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILED,
} from '../actions/actionTypes';

const initialPost = {
  posts: [],
  posting: false,
  postInProgress: false,
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
    case START_DELETE_POST:
      return {
        ...state,
        postInProgress: true,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => {
          return post._id !== action.postId;
        }),
        postInProgress: false,
      };
    case DELETE_POST_FAILED:
      return {
        ...state,
        postInProgress: false,
        error: action.error,
      };
    default:
      return state;
  }
}
