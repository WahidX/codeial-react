import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { Button, TextField } from '@material-ui/core';

import { createUser, googleAuth } from '../actions/user';
import { setSnackBar } from '../actions/snackbar';

function Signup(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // google login
  const responseGoogleSuccess = (response) => {
    props.dispatch(googleAuth(response.profileObj));
    console.log(response.profileObj);
  };

  const responseGoogleFailed = (response) => {
    console.log('User not found. Err: ', response);
    props.dispatch(setSnackBar('error', "Couldn't get a response", 3000));
  };

  let onChangeName = (e) => {
    setName(e.target.value);
  };

  let onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  let onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  let onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  function onSubmit(e) {
    e.preventDefault();
    let emailContent = email.trim();
    let nameContent = name.trim();

    if (password !== confirmPassword) {
      console.log('Passwords didnt match');
      return;
    }

    if (
      emailContent.length !== 0 &&
      password.length !== 0 &&
      nameContent.length !== 0
    ) {
      console.log(nameContent, emailContent, password);
      props.dispatch(
        createUser(nameContent, emailContent, password, confirmPassword)
      );
      setPassword('');
      setConfirmPassword('');
    }
  }

  let { inProgress, isLoggedin } = props.user;

  if (isLoggedin) {
    console.log('Redirect');
    return <Redirect to="/" />;
  }

  return (
    <form className="form-container">
      <p className="form-title">Signup</p>

      <TextField
        id="name"
        label="name"
        variant="outlined"
        value={name}
        onChange={onChangeName}
      />
      <TextField
        id="email"
        label="email"
        variant="outlined"
        value={email}
        onChange={onChangeEmail}
      />

      <TextField
        id="password"
        type="password"
        label="password"
        variant="outlined"
        value={password}
        onChange={onChangePassword}
      />
      <TextField
        id="confirm_password"
        type="password"
        label="confirm password"
        variant="outlined"
        value={confirmPassword}
        onChange={onChangeConfirmPassword}
      />

      <Button
        type="submit"
        className="submit-btn"
        disabled={inProgress}
        onClick={onSubmit}
        variant="contained"
        color="primary"
      >
        Signup
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

export default connect(mapStateToProps)(Signup);
