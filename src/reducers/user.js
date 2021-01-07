import {
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  AUTHENTICATE_USER,
  CLEAR_AUTH_STATE,
  LOGOUT,
  UPDATE_START,
  UPDATE_FAILED,
  UPDATE_SUCCESS,
  CHANGE_PASSWORD_START,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
  START_GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  START_GET_FRIEND,
  GET_FRIEND_SUCCESS,
  GET_FRIEND_FAILED,
  START_FOLLOW_TOGGLE,
  FOLLOW_SUCCESS,
  FOLLOW_FAILED,
} from '../actions/actionTypes';

const initialAuthState = {
  user: { friends: [] },
  error: null,
  isLoggedin: false,
  inProgress: false,
  otherUser: {},
  otherPosts: [],
};

export default function user(state = initialAuthState, action) {
  switch (action.type) {
    case CHANGE_PASSWORD_START:
    case UPDATE_START:
    case SIGNUP_START:
    case LOGIN_START:
    case START_GET_FRIEND:
    case START_GET_USER:
    case START_FOLLOW_TOGGLE:
      return {
        ...state,
        inProgress: true,
      };
    case CHANGE_PASSWORD_FAILED:
    case UPDATE_SUCCESS:
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        inProgress: false,
        isLoggedin: true,
        error: null,
      };
    case UPDATE_FAILED:
    case SIGNUP_FAILED:
    case LOGIN_FAILED:
    case GET_USER_FAILED:
    case GET_FRIEND_FAILED:
    case FOLLOW_FAILED:
      return {
        ...state,
        error: action.error,
        inProgress: false,
      };
    case AUTHENTICATE_USER:
      return {
        ...state,
        user: action.user,
        isLoggedin: true,
      };
    case LOGOUT:
      return {
        initialAuthState,
      };
    case CHANGE_PASSWORD_SUCCESS:
    case CLEAR_AUTH_STATE:
      return {
        ...state,
        inProgress: false,
        error: null,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        inProgress: false,
        otherUser: action.user,
        otherPosts: action.posts,
      };

    case GET_FRIEND_SUCCESS:
      let modifiedUser = state.user;
      modifiedUser.friends = action.friends;

      return {
        ...state,
        inProgress: false,
        user: modifiedUser,
      };

    case FOLLOW_SUCCESS:
      let adminUser = state.user;
      if (action.followType === 'Followed') {
        adminUser.friends.push(state.otherUser);
      } else {
        adminUser.friends = adminUser.friends.filter(
          (f) => f._id !== action.id
        );
      }

      adminUser.following = action.following;

      return {
        ...state,
        user: adminUser,
        otherUser: {
          ...state.otherUser,
          follower: action.follower,
        },
        inProgress: false,
      };

    default:
      return state;
  }
}
