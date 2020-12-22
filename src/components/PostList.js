import React from 'react';
import { connect } from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

import { PostItem, PostForm } from './';

const useStyles = makeStyles({
  root: {
    width: '70%',
    margin: 'auto',
    marginTop: 100,
  },
});

// Main Component Function
function PostList(props) {
  let posts = props.posts;
  const classes = useStyles();

  // TODO: should be handled via fetchingInprogress
  if (posts.length === 0) {
    return (
      <div className={classes.root}>
        <Skeleton />
        <Skeleton animation={false} />
        <Skeleton animation="wave" />
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <PostForm />
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </React.Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    posts: state.posts.posts,
  };
}

export default connect(mapStateToProps)(PostList);
