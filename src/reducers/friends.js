import {
  START_GET_FRIEND,
  GET_FRIEND_SUCCESS,
  GET_FRIEND_FAILED,
} from '../actions/actionTypes';

const initialFriends = {
  friends: [],
  loading: false,
  error: null,
};

export default function friends(state = initialFriends, action) {
  switch (action.type) {
    case START_GET_FRIEND:
      return {
        ...state,
        loading: true,
      };
    case GET_FRIEND_SUCCESS:
      return {
        ...state,
        loading: false,
        friends: action.friends,
      };
    case GET_FRIEND_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
