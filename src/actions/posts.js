import { APIurls } from '../helpers/urls';
import qs from 'qs';
import axios from 'axios';
import {
  UPDATE_POSTS,
  START_POSTING,
  POSTING_FAILED,
  POSTING_SUCCESS,
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
