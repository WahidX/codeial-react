import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import ExpandLessTwoToneIcon from '@material-ui/icons/ExpandLessTwoTone';
import ArrowUpwardTwoToneIcon from '@material-ui/icons/ArrowUpwardTwoTone';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';

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
  const [deleted, setDeleted] = useState(false);
  let isloading = false;

  const classes = useStyles();
  let post = props.post;

  function handleLikeToggle() {
    setLike(!like);
  }

  function handleDelete() {
    setDeleted(true);
  }

  if (deleted) {
    return null;
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
          <IconButton aria-label="delete post" disabled={isloading}>
            <DeleteIcon onClick={handleDelete} color="secondary" />
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
}

export default PostItem;
