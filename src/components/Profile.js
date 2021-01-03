import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { FriendList, PostList } from '.';

function Profile(props) {
  if (!props.user.isLoggedin) {
    return <Redirect to="/login" />;
  }

  let { name, email, bio, avatar, emailAuthenticated } = props.user.user;

  return (
    <React.Fragment>
      <div id="profile-page-container">
        <div id="cover-container">
          <img className="cover-img" />
        </div>

        <div className="profile-update-container">
          <img
            className="user-dp"
            src="https://cdn3.iconfinder.com/data/icons/users-6/100/2-256.png"
          />
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <AccountCircleIcon />
            </Grid>
            <Grid item>{name}</Grid>
          </Grid>

          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <AlternateEmailIcon />
            </Grid>
            <Grid item>
              {email}
              <br />
              <small>{!emailAuthenticated && 'email not confirmed'} </small>
            </Grid>
          </Grid>

          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>{bio}</Grid>
          </Grid>
        </div>
      </div>

      <div className="home-container">
        <PostList pageFor="" />
        <FriendList />
      </div>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Profile);
