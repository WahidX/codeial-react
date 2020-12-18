import React from 'react';
import { connect } from 'react-redux';

import { fetchPosts } from '../actions/posts';
import { ButtonAppBar, PostList, PostForm } from './';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    const { posts } = this.props;
    return (
      <React.Fragment>
        <ButtonAppBar />
        <PostForm />
        <PostList />
        <div className="posts-list">posts on loop</div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

export default connect(mapStateToProps)(App);
