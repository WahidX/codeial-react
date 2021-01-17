import React from 'react';
import { PostList, FriendList, ChatContainer } from '.';

function Home(props) {
  return (
    <div className="home-container">
      <PostList pageFor="home" />
      <div className="right-sidebar-container">
        <FriendList />
        <ChatContainer />
      </div>
    </div>
  );
}

export default Home;
