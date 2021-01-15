import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { FriendList, PostList } from '.';
import { getUser } from '../actions/user';
import { followToggle } from '../actions/friends';

function Profile(props) {
  let id = props.match.params.id;
  let userPosts = props.userPosts;
  let { inProgress } = props.user;
  let admin = false;
  let user;

  if (props.user.user._id === id) {
    user = props.user.user;
    admin = true;
  } else {
    user = props.user.otherUser;
  }

  let {
    _id,
    name,
    email,
    avatar,
    bio,
    emailAuthenticated,
    following,
    follower,
  } = user;

  let isFollowing = false;
  for (let index = 0; index < props.friends.length; index++) {
    if (props.friends[index]._id === _id) {
      isFollowing = true;
      break;
    }
  }

  let handleFollowClick = () => {
    props.dispatch(followToggle(_id));
  };

  useEffect(() => {
    props.dispatch(getUser(id, 'full'));
  }, [id]);

  return (
    <React.Fragment>
      <div
        id="profile-page-container"
        style={{ boxShadow: '0px 0px 10px 0px cornflowerblue' }}
      >
        <div className="profile-update-container">
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              {avatar ? (
                <img
                  style={{
                    borderRadius: '50%',
                  }}
                  src={avatar}
                  alt="user"
                />
              ) : (
                <AccountCircleIcon />
              )}
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
              {admin && (
                <small>{!emailAuthenticated && 'email not confirmed'} </small>
              )}
            </Grid>
          </Grid>

          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>{bio}</Grid>
          </Grid>

          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>{follower} Followers</Grid>
          </Grid>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>{following} Following</Grid>
          </Grid>

          {!admin && (
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleFollowClick}
                  disabled={inProgress}
                >
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </Button>
              </Grid>
            </Grid>
          )}
        </div>
      </div>

      <div className="home-container">
        <PostList pageFor="profile" posts={userPosts} />
        {/* <FriendList /> */}
      </div>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
    userPosts: state.user.otherPosts,
    friends: state.user.user.friends,
  };
}

export default connect(mapStateToProps)(Profile);
