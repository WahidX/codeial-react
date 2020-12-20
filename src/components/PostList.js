import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PostItem } from './';

// Main Component Function
function PostList(props) {
  let posts = props.posts;

  return (
    <React.Fragment>
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    posts: state.posts.posts,
  };
}

export default connect(mapStateToProps)(PostList);
