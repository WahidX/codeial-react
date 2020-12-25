import { APIurls } from '../helpers/urls';
import axios from 'axios';
import {
  START_GET_FRIEND,
  GET_FRIEND_SUCCESS,
  GET_FRIEND_FAILED,
} from './actionTypes';

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
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        dispatch(getFriendFailed(error));
        console.log(error);
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
