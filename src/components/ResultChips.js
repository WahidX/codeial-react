import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Chip, Avatar } from '@material-ui/core';
import { getSocket } from '../helpers/socket';
import { addToChats } from '../actions/chats';

let socket;

function ResultChips(props) {
  useEffect(() => {
    socket = getSocket(props.user.user._id);
  }, []);

  let handleSelect = (id) => {
    socket.socket.emit('enter-room', props.user.user._id, id, (response) => {
      props.dispatch(addToChats(response.newChat));
    });

    // socket.socket.emit('enter-room', {
    //   uid: props.user.user._id,
    //   targetUid: id,
    // });
    // props.dispatch(fetchChats());
  };

  let results = props.search.userResults || [];

  return (
    <div className="chip-list">
      {results.map((user) => (
        <Chip
          label={user.name}
          value={user._id}
          onClick={() => handleSelect(user._id)}
          avatar={<Avatar src={user.avatar} />}
        />
      ))}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
    search: state.search,
    chats: state.chats,
  };
}

export default connect(mapStateToProps)(ResultChips);
