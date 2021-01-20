import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Chip, Avatar } from '@material-ui/core';
import { getSocket } from '../helpers/socket';

let socket;

function ResultChips(props) {
  useEffect(() => {
    socket = getSocket(props.user.user._id);
  }, []);

  let handleSelect = (id) => {
    console.log('selected: ', id);
    console.log('selected: ', props.user.user._id);
    socket.socket.emit('enter-room', {
      uid: props.user.user._id,
      targetUid: id,
    });
  };

  let results = props.search.userResults;

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
  };
}

export default connect(mapStateToProps)(ResultChips);
