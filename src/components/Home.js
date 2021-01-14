import React from 'react';
import { PostList, FriendList } from '.';

function Home(props) {
  return (
    <div className="home-container">
      <PostList pageFor="home" />
      <FriendList />
    </div>
  );
}

export default Home;
