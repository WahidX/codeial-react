import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';

import { createSession } from '../actions/user';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // google login
  const responseGoogle = (response) => {
    console.log(response.profileObj);
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
      >
        Login
      </Button>

      <GoogleLogin
        clientId="546518601365-uepi6qqjurrb92141rskcuemhjk4vlkd.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />

      <a href="#">
        <img
          alt="sign up with google"
          src="https://www.flaticon.com/svg/static/icons/svg/281/281764.svg"
        />
      </a>
    </form>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Login);
