import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Chip, Avatar } from '@material-ui/core';
import { getSocket } from '../helpers/socket';
import { addToChats, switchRecipent, fetchMessages } from '../actions/chats';
import { setSnackBar } from '../actions/snackbar';

let socket;

function ResultChips(props) {
  useEffect(() => {
    socket = getSocket(props.user.user._id);
  }, []);

  let handleSelect = (id) => {
    socket.socket.emit('enter-room', props.user.user._id, id, (response) => {
      // if we already have
      if (!response) {
        props.dispatch(setSnackBar('error', 'Server Error!', 3000));
      }
      props.dispatch(fetchMessages(response.newChat._id));
      let recipent =
        response.newChat.users[0]._id === props.user.user._id
          ? response.newChat.users[1]
          : response.newChat.users[0];
      props.dispatch(switchRecipent(recipent, response.newChat._id));

      // check if esisting chat or not
      let all_chats = props.chats.chats;
      if (all_chats) {
        for (let i = 0; i < all_chats.length; i++) {
          if (all_chats[i]._id === response.newChat._id) return;
        }
      }
      props.dispatch(addToChats(response.newChat));
    });
  };

  let results = props.search.userResults || [];
  // removing user him/her-self
  results = results.filter((result) => result._id !== props.user.user._id);

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
