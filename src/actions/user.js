import axios from 'axios';
import qs from 'qs';

import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  UPDATE_START,
  UPDATE_SUCCESS,
  UPDATE_FAILED,
  LOGOUT,
  AUTHENTICATE_USER,
  CHANGE_PASSWORD_START,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
} from './actionTypes';
import { APIurls } from '../helpers/urls';
import { fetchFriends, clearFriends } from './friends';
import { setSnackBar } from './snackbar';

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAILED,
    error: errorMessage,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function createSession(email, password) {
  return (dispatch) => {
    dispatch(startLogin());

    var data = qs.stringify({
      email: email,
      password: password,
    });

    var config = {
      method: 'post',
      url: APIurls.createSession(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        localStorage.setItem('token', response.data.data.token);
        dispatch(loginSuccess(response.data.data.user));
        dispatch(fetchFriends());
        dispatch(setSnackBar('success', 'Logged in successfully', 3000));
      })
      .catch(function (error) {
        console.log(error.message);
        dispatch(loginFailed(error.message));
        dispatch(setSnackBar('error', 'Logging in Failed', 3000));
      });
  };
}

export function startSignup() {
  return {
    type: SIGNUP_START,
  };
}

export function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
}

export function signupFailed(error) {
  return {
    type: SIGNUP_FAILED,
    error,
  };
}

export function createUser(name, email, password, confirm_password) {
  return (dispatch) => {
    dispatch(startLogin());

    var data = qs.stringify({
      email: email,
      password: password,
      name: name,
      confirm_password: confirm_password,
    });

    var config = {
      method: 'post',
      url: APIurls.createUser(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        localStorage.setItem('token', response.data.data.token);
        dispatch(signupSuccess(response.data));
        dispatch(setSnackBar('success', 'User created successfully', 3000));
      })
      .catch(function (error) {
        console.log(error.message);
        dispatch(signupFailed(error.message));
      });
  };
}

// This one restores browser session
export function fetchUser() {
  return (dispatch) => {
    var config = {
      method: 'post',
      url: APIurls.fetchUser(),
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    axios(config)
      .then(function (response) {
        console.log('reponse: ', response.data);
        dispatch(authenticateUser(response.data.data.user));
        dispatch(fetchFriends());
        dispatch(setSnackBar('success', 'User session restored', 3000));
      })
      .catch(function (error) {
        dispatch(loginFailed(error.message));
        dispatch(setSnackBar('error', 'Please Log in', 3000));
      });
  };
}

export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}

export function logoutUser() {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch(clearFriends());
    dispatch(logout());
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function updateUser(name, email, bio, avatar, password) {
  return (dispatch) => {
    dispatch(startUpdate());

    let data = qs.stringify({
      email: email,
      name: name,
      bio: bio,
      avatar: avatar,
      password: password,
    });

    var config = {
      method: 'patch',
      url: APIurls.updateUser(),
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    axios(config)
      .then(function (response) {
        console.log('reponse: ', response.data);
        dispatch(updateSuccess(response.data.user));
        dispatch(setSnackBar('success', 'User updated successfully', 3000));
      })
      .catch(function (error) {
        dispatch(updateFailed(error.message));
        dispatch(setSnackBar('error', 'Updation failed', 3000));
      });
  };
}

export function startUpdate() {
  return {
    type: UPDATE_START,
  };
}

export function updateSuccess(user) {
  return {
    type: UPDATE_SUCCESS,
    user,
  };
}

export function updateFailed(error) {
  return {
    type: UPDATE_FAILED,
    error,
  };
}

// Password Change actions
export function changePassword(oldPassword, newPassword, confirmPassword) {
  return (dispatch) => {
    dispatch(startPasswordChange());

    var data = qs.stringify({
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    });

    var config = {
      method: 'patch',
      url: APIurls.changePassword(),
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    axios(config)
      .then(function (response) {
        console.log('reponse: ', response.data);
        dispatch(passwordChangeSuccess(response.data.user));
        dispatch(
          setSnackBar('success', 'Password changed Successfully!', 3000)
        );
      })
      .catch(function (error) {
        dispatch(passwordChangeFailed(error.message));
        dispatch(setSnackBar('error', error.message, 3000));
      });
  };
}

export function startPasswordChange() {
  return {
    type: CHANGE_PASSWORD_START,
  };
}

export function passwordChangeSuccess() {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
  };
}

export function passwordChangeFailed(error) {
  return {
    type: CHANGE_PASSWORD_FAILED,
    error,
  };
}
