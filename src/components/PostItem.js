import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import ExpandLessTwoToneIcon from '@material-ui/icons/ExpandLessTwoTone';
import ArrowUpwardTwoToneIcon from '@material-ui/icons/ArrowUpwardTwoTone';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
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
  title: {
    fontSize: 14,
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
  // will come from store
  const [like, setLike] = useState(false);
  const authorized = props.user.user._id === props.post.user._id;

  let { isloading } = props.post_store.postInProgress;

  const classes = useStyles();
  let post = props.post;

  function handleLikeToggle() {
    likeToggle(props.post._id);
    setLike(!like);
  }

  function handleDelete() {
    props.dispatch(deletePost(props.post._id));
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          {post.user.name}
        </Typography>
        <Typography className={classes.content} color="textPrimary">
          {post.content}
        </Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        {!like && (
          <IconButton disabled={isloading}>
            <ExpandLessTwoToneIcon onClick={handleLikeToggle} color="primary" />
          </IconButton>
        )}
        {like && (
          <IconButton disabled={isloading}>
            <ArrowUpwardTwoToneIcon
              onClick={handleLikeToggle}
              color="secondary"
            />
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
