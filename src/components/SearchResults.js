import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PostItem from './PostItem';
import { clearSearchResults } from '../actions/search';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  userContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  userItem: {
    backgroundColor: theme.palette.background.paper,
    width: '300px',
    margin: '5px',
    height: '120px',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px 0px cornflowerblue',
  },
}));

function SearchResults(props) {
  const classes = useStyles();

  let { userResults, postResults } = props.search;

  function UserCard() {
    if (userResults.length === 0) {
      return null;
    }

    return (
      <Grid item xs={12} md={12}>
        <Typography className={classes.title}>User Results</Typography>
        <div className={classes.demo}>
          <List className={classes.userContainer}>
            {userResults.map((user) => (
              <Link to={`/profile/${user._id}`}>
                <ListItem className={classes.userItem}>
                  <ListItemAvatar>
                    <Avatar>
                      <AccountCircle />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.name}
                    secondary={
                      user.bio.length > 75
                        ? user.bio.substring(0, 75) + '...'
                        : user.bio
                    }
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </div>
      </Grid>
    );
  }

  function PostCard(props) {
    let postResults = props.postResults;

    if (postResults.length === 0) {
      return null;
    }
    return (
      <div id="srch-results-container">
        <Typography className={classes.title}>Post Results</Typography>
        {postResults.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    );
  }

  // useEffect(() => {
  //   return () => {
  //     props.dispatch(clearSearchResults());
  //   };
  // }, []);

  return (
    <div id="srch-results-container">
      <UserCard />

      <PostCard postResults={postResults} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    search: state.search,
  };
}

export default connect(mapStateToProps)(SearchResults);
