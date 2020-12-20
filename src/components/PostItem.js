import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
});

function PostItem(props) {
  const classes = useStyles();
  let post = props.post;

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
      <CardActions>
        <Button size="small">Like</Button>
      </CardActions>
    </Card>
  );
}

export default PostItem;
