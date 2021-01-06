import { APIurls } from '../helpers/urls';
import axios from 'axios';
import {
  START_GET_FRIEND,
  GET_FRIEND_SUCCESS,
  GET_FRIEND_FAILED,
  CLEAR_FRIENDS,
  START_FOLLOW_TOGGLE,
  UNFOLLOW_SUCCESS,
  FOLLOW_SUCCESS,
  FOLLOW_TOGGLE_FAILED,
} from './actionTypes';

import { setSnackBar } from './snackbar';

export function fetchFriends() {
  return (dispatch) => {
    dispatch(startGetFriend());
    var config = {
      method: 'get',
      url: APIurls.fetchFriends(),
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    axios(config)
      .then(function (response) {
        dispatch(getFriendSuccess(response.data.friends));
      })
      .catch(function (error) {
        dispatch(getFriendFailed(error));
        dispatch(setSnackBar('error', "Couldn't retrieve friends", 3000));
      });
  };
}

export function startGetFriend() {
  return {
    type: START_GET_FRIEND,
  };
}

export function getFriendSuccess(friends) {
  return {
    type: GET_FRIEND_SUCCESS,
    friends,
  };
}

export function getFriendFailed(error) {
  return {
    type: GET_FRIEND_FAILED,
    error,
  };
}

export function clearFriends() {
  return {
    type: CLEAR_FRIENDS,
  };
}

export function followToggle(id) {
  return (dispatch) => {
    dispatch(startFollowToggle());
    var config = {
      method: 'post',
      url: APIurls.followToggle(id),
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    console.log('sent');
    axios(config)
      .then(function (response) {
        console.log('done');
        console.log(response.data);
        dispatch(fetchFriends());
        if (response.data.message === 'Added successfully') {
          dispatch(setSnackBar('success', 'Followed', 3000));
        } else {
          dispatch(setSnackBar('success', 'Unfollowed', 3000));
        }
      })
      .catch(function (error) {
        console.log(error);
        console.log('er');
        // dispatch(followToggleFailed(error));
        dispatch(setSnackBar('error', 'Follow/Unfollow failed', 3000));
      });
  };
}

export function startFollowToggle() {
  return {
    type: START_FOLLOW_TOGGLE,
  };
}

// export function unfollowSuccess(id) {
//   return {
//     type: UNFOLLOW_SUCCESS,
//     id,
//   };
// }

// export function followSuccess(id) {
//   return {
//     type: FOLLOW_SUCCESS,
//     id,
//   };
// }

// export function followToggleFailed(error) {
//   return {
//     type: FOLLOW_TOGGLE_FAILED,
//     error,
//   };
// }
