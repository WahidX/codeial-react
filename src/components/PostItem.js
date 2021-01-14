import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import ExpandLessTwoToneIcon from '@material-ui/icons/ExpandLessTwoTone';
import ArrowUpwardTwoToneIcon from '@material-ui/icons/ArrowUpwardTwoTone';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { likeToggle, deletePost } from '../actions/posts';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: '5px 20px',
    borderRadius: '5px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  header: {
    display: 'flex',
    marginBottom: '10px',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    marginLeft: '10px',
  },
  pos: {
    marginBottom: 12,
  },
  cardActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

function PostItem(props) {
  const classes = useStyles();

  // will come from store
  const authorized = props.user.isLoggedin
    ? props.user.user._id === props.post.user._id
    : false;

  let like;
  if (props.user.isLoggedin && props.post.likes) {
    like = props.post.likes.indexOf(props.user.user._id) !== -1;
  }
  let likeCount = props.post.likes ? props.post.likes.length : 0;

  let { isloading } = props.post_store.postInProgress;

  let post = props.post;

  function handleLikeToggle() {
    if (props.user.isLoggedin) {
      props.dispatch(likeToggle(props.post._id, props.user.user._id));
    } else {
      console.log('Pls Log in');
    }
  }

  function handleDelete() {
    props.dispatch(deletePost(props.post._id));
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Link to={'/profile/' + post.user._id} className={classes.header}>
          {post.user.avatar ? (
            <img
              src={post.user.avatar}
              alt="P"
              style={{
                width: '35px',
                borderRadius: '50%',
              }}
            />
          ) : (
            <AccountCircle />
          )}
          <Typography className={classes.title} color="textSecondary">
            {post.user.name}
          </Typography>
        </Link>
        <Typography className={classes.content} color="textPrimary">
          {post.content}
        </Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        {!like && (
          <IconButton disabled={isloading}>
            <ExpandLessTwoToneIcon onClick={handleLikeToggle} color="primary" />
            <p>{likeCount}</p>
          </IconButton>
        )}
        {like && (
          <IconButton disabled={isloading}>
            <ArrowUpwardTwoToneIcon
              onClick={handleLikeToggle}
              color="secondary"
            />{' '}
            <p>{likeCount}</p>
          </IconButton>
        )}

        <div className={classes.rightBtns}>
          <IconButton aria-label="share post" disabled={isloading}>
            <ShareIcon />
          </IconButton>
          {authorized && (
            <IconButton aria-label="delete post" disabled={isloading}>
              <DeleteIcon onClick={handleDelete} color="secondary" />
            </IconButton>
          )}
        </div>
      </CardActions>
    </Card>
  );
}

function mapStateToProps(state) {
  return {
    post_store: state.posts,
    user: state.user,
  };
}

export default connect(mapStateToProps)(PostItem);
