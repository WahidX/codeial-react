import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';

import { ChatList, ChatBox, SearchBox, ResultChips } from './';
import { getSocket } from '../helpers/socket';

function ChatContainer(props) {
  useEffect(() => {
    let socket = getSocket();
    let ok = 'testing biro';
    // socket.socket.emit('send-message', { ok });
  }, []);

  if (!props.isLoggedin) {
    return null;
  }

  return (
    <div id="chat-container">
      <ChatList />
      <Paper style={{ padding: '10px' }}>
        <div>
          <SearchBox filter="user" />
        </div>
        <ResultChips />
      </Paper>
      <ChatBox />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isLoggedin: state.user.isLoggedin,
  };
}

export default connect(mapStateToProps)(ChatContainer);
