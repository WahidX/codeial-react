import React, { Component } from 'react';

import { PostItem } from './';

class PostList extends Component {
  render() {
    return (
      <div>
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
      </div>
    );
  }
}

export default PostList;
