var axios = require('axios');

import { UPDATE_POSTS } from './actionTypes';
import { APIurls } from '../helpers/urls';

export function fetchPosts() {
  return (dispatch) => {
    var config = {
      method: 'get',
      url: APIurls.fetchPosts(),
    };
    console.log(config.url);
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        dispatch(updatePosts(response.data.posts));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts,
  };
}
