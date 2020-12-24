import { APIurls } from '../helpers/urls';
import qs from 'qs';
import axios from 'axios';
import {
  UPDATE_POSTS,
  START_POSTING,
  POSTING_FAILED,
  POSTING_SUCCESS,
  START_LIKE,
  LIKE_FAILED,
  LIKE_SUCCESS,
  START_DELETE_POST,
  DELETE_POST_SUCCESS,
} from './actionTypes';

export function fetchPosts() {
  return (dispatch) => {
    let config = {
      method: 'get',
      url: APIurls.fetchPosts(),
    };
    console.log(config.url);
    axios(config)
      .then(function (response) {
        dispatch(updatePosts(response.data.posts));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export function addPost(content) {
  return (dispatch) => {
    dispatch(startPosting());
    let config = {
      method: 'post',
      url: APIurls.addPost(),
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        content: content,
      }),
    };

    axios(config)
      .then(function (response) {
        dispatch(postingSuccess(response.data.data.post));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(postingFailed(error));
      });
  };
}

export function startPosting() {
  return {
    type: START_POSTING,
  };
}

export function postingSuccess(newPost) {
  return {
    type: POSTING_SUCCESS,
    newPost,
  };
}

export function postingFailed(error) {
  return {
    type: POSTING_FAILED.replace,
    error,
  };
}

export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts,
  };
}

// Like Post

export function likeToggle(postId, userId) {
  return (dispatch) => {
    dispatch(likeStart(postId));
    var config = {
      method: 'post',
      url: APIurls.likeToggle(postId),
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    axios(config)
      .then(function (response) {
        dispatch(likeSuccess(postId, userId));
        console.log(response.data);
      })
      .catch(function (error) {
        dispatch(likeFailed(postId));
        console.error(error);
      });
  };
}

export function likeStart() {
  return {
    type: START_LIKE,
  };
}

export function likeSuccess(postId, userId) {
  return {
    type: LIKE_SUCCESS,
    postId,
    userId,
  };
}

export function likeFailed() {
  return {
    type: LIKE_FAILED,
  };
}

// Delete
export function deletePost(postId) {
  return (dispatch) => {
    dispatch(startDelete());
    var config = {
      method: 'delete',
      url: APIurls.deletePost(postId),
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    axios(config)
      .then(function (response) {
        dispatch(deleteSuccess(postId));
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        dispatch(deleteFailed(error));
        console.log(error);
      });
  };
}

export function startDelete() {
  return {
    type: START_DELETE_POST,
  };
}

export function deleteSuccess(postId) {
  return {
    type: DELETE_POST_SUCCESS,
    postId,
  };
}

export function deleteFailed(error) {
  return {
    type: DELETE_POST_SUCCESS,
    error,
  };
}
