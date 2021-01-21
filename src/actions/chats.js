import { APIurls } from '../helpers/urls';
import axios from 'axios';
import {
  START_GET_CHATS,
  GET_CHATS_SUCCESS,
  GET_CHATS_FAILED,
  START_GET_MESSAGES,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAILED,
  ADD_TO_CHATS,
  SWITCH_RECIPENT,
} from './actionTypes';

import { setSnackBar } from './snackbar';

export function fetchChats() {
  return (dispatch) => {
    dispatch(startGetChats());
    var config = {
      method: 'get',
      url: APIurls.getChats(),
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    axios(config)
      .then(function (response) {
        dispatch(getChatsSuccess(response.data.chats));
      })
      .catch(function (error) {
        console.log(error.message);
        dispatch(getChatsFailed(error.message));
        dispatch(setSnackBar('error', 'Logging in Failed', 3000));
      });
  };
}

export function startGetChats() {
  return {
    type: START_GET_CHATS,
  };
}

export function getChatsFailed(error) {
  return {
    type: GET_CHATS_FAILED,
    error,
  };
}

export function getChatsSuccess(chats) {
  return {
    type: GET_CHATS_SUCCESS,
    chats,
  };
}

export function fetchMessages(id) {
  return (dispatch) => {
    dispatch(startGetMessages());
    var config = {
      method: 'get',
      url: APIurls.getMessages(id),
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        dispatch(getMessagesSuccess(response.data.messages));
      })
      .catch(function (error) {
        console.log(error.message);
        dispatch(getMessagesFailed(error.message));
        dispatch(setSnackBar('error', 'Logging in Failed', 3000));
      });
  };
}

export function startGetMessages() {
  return {
    type: START_GET_MESSAGES,
  };
}

export function getMessagesFailed(error) {
  return {
    type: GET_MESSAGES_FAILED,
    error,
  };
}

export function getMessagesSuccess(messages) {
  return {
    type: GET_MESSAGES_SUCCESS,
    messages,
  };
}

export function addToChats(chat) {
  return {
    type: ADD_TO_CHATS,
    chat,
  };
}

export function switchRecipent(recipent, roomID) {
  return {
    type: SWITCH_RECIPENT,
    recipent,
    roomID,
  };
}
