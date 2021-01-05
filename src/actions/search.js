import { APIurls } from '../helpers/urls';
import axios from 'axios';
import {
  START_SEARCH,
  SEARCH_SUCCESS,
  SEARCH_FAILED,
  SEARCH_CLEAR,
} from './actionTypes';
import { setSnackBar } from './snackbar';

export function fetchResults(key, type) {
  return (dispatch) => {
    dispatch(startSearch());

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
          searchSuccess(response.data.results_user, response.data.results_post)
        );
      })
      .catch(function (error) {
        dispatch(searchFailed(error));
        dispatch(setSnackBar('error', 'Search Failed', 3000));
        console.log(error);
      });
  };
}

export function startSearch() {
  return {
    type: START_SEARCH,
  };
}

export function searchSuccess(userResults, postResults) {
  return {
    type: SEARCH_SUCCESS,
    userResults,
    postResults,
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
