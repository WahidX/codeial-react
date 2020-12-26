import { APIurls } from '../helpers/urls';
import axios from 'axios';
import {
  START_SEARCH,
  SEARCH_SUCCESS,
  SEARCH_FAILED,
  SEARCH_CLEAR,
} from './actionTypes';

export function fetchResults(key, type) {
  return (dispatch) => {
    var config = {
      method: 'post',
      url: APIurls.fetchSearchResults(key, type),
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    axios(config)
      .then(function (response) {
        dispatch(
          searchSuccess(response.data.user_results, response.data.post_results)
        );
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        dispatch(searchFailed(error));
        console.log(error);
      });
  };
}

export function startSearch() {
  return {
    type: START_SEARCH,
  };
}

export function searchSuccess(user_results, post_results) {
  return {
    type: SEARCH_SUCCESS,
    user_results,
    post_results,
  };
}

export function searchFailed(error) {
  return {
    type: SEARCH_FAILED,
    error,
  };
}

export function clearSearchResults() {
  return {
    type: SEARCH_CLEAR,
  };
}
