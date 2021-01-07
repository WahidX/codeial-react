import { APIurls } from '../helpers/urls';
import axios from 'axios';
import {
  START_GET_FRIEND,
  GET_FRIEND_SUCCESS,
  GET_FRIEND_FAILED,
  START_FOLLOW_TOGGLE,
  FOLLOW_SUCCESS,
  FOLLOW_FAILED,
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

    axios(config)
      .then(function (response) {
        console.log(response.data);
        dispatch(
          followSuccess(
            id,
            response.data.message,
            response.data.target_user_follower,
            response.data.req_user_following
          )
        );
        dispatch(setSnackBar('success', response.data.message, 3000));
      })
      .catch(function (error) {
        console.log(error);
        console.log('er');
        dispatch(followFailed(error));
        dispatch(setSnackBar('error', 'Follow/Unfollow failed', 3000));
      });
  };
}

export function startFollowToggle() {
  return {
    type: START_FOLLOW_TOGGLE,
  };
}

export function followSuccess(id, followType, follower, following) {
  return {
    type: FOLLOW_SUCCESS,
    id,
    followType,
    follower,
    following,
  };
}

export function followFailed(error) {
  return {
    type: FOLLOW_FAILED,
    error,
  };
}
