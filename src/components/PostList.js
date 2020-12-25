import React from 'react';
import { connect } from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

import { PostItem, PostForm } from './';

const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: 'auto',
    marginTop: 100,
  },
});

// Main Component Function
function PostList(props) {
  let posts = props.posts;
  let inProgress = props.user.inProgress;
  const classes = useStyles();

  // TODO: should be handled via fetchingInprogress
  return (
    <div className="posts-container">
      <PostForm />

      {posts.length === 0 && !inProgress && (
        <div className={classes.root + ' postlist-container'}>
          There's no post
        </div>
      )}

      {posts.length === 0 && (
        <div className={classes.root + ' postlist-container'}>
          <Skeleton />
          <Skeleton animation={false} />
          <Skeleton animation="wave" />
        </div>
      )}
      <div className="postlist-container">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    posts: state.posts.posts,
    user: state.user,
  };
}

export default connect(mapStateToProps)(PostList);
