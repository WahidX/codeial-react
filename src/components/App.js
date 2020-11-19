import React from 'react';
import { connect } from 'react-redux';

import './App.css';
import { fetchPosts } from '../actions/posts';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    const { posts } = this.props;
    return (
      <div>
        <div className="posts-list">posts on loop</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

export default connect(mapStateToProps)(App);
