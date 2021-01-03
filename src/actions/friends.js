import { APIurls } from '../helpers/urls';
import axios from 'axios';
import {
  START_GET_FRIEND,
  GET_FRIEND_SUCCESS,
  GET_FRIEND_FAILED,
  CLEAR_FRIENDS,
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
        dispatch(GetFriendSuccess(response.data.friends));
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

export function GetFriendSuccess(friends) {
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
