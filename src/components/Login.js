import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';

import { createSession, googleAuth } from '../actions/user';
import { setSnackBar } from '../actions/snackbar';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // google login
  const responseGoogleSuccess = (response) => {
    props.dispatch(googleAuth(response.profileObj));
    console.log(response.profileObj);
  };

  const responseGoogleFailed = (response) => {
    console.log('User not found. Err: ', response);
    props.dispatch(setSnackBar('error', "Couldn't get a response", 3000));
  };

  let onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  let onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  function onSubmit(e) {
    e.preventDefault();
    let emailContent = email.trim();

    if (emailContent.length !== 0 && password.length !== 0) {
      console.log(emailContent, password);
      props.dispatch(createSession(emailContent, password));
      setPassword('');
    }
  }

  let { inProgress, isLoggedin } = props.user;
  if (isLoggedin) {
    return <Redirect to="/" />;
  }

  return (
    <form className="form-container">
      <p className="form-title">Login</p>
      <TextField
        id="email"
        label="email"
        value={email}
        variant="outlined"
        onChange={onChangeEmail}
      />
      <br />
      <TextField
        id="password"
        type="password"
        label="password"
        value={password}
        variant="outlined"
        onChange={onChangePassword}
      />
      <Button
        type="submit"
        className="submit-btn"
        disabled={inProgress}
        onClick={onSubmit}
        variant="contained"
        color="primary"
      >
        Login
      </Button>

      <GoogleLogin
        clientId="546518601365-uepi6qqjurrb92141rskcuemhjk4vlkd.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogleSuccess}
        onFailure={responseGoogleFailed}
        cookiePolicy={'single_host_origin'}
      />
    </form>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Login);
