import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, TextField, Button, IconButton } from '@material-ui/core';
import SendTwoToneIcon from '@material-ui/icons/SendTwoTone';
// import io from 'socket.io-client';
import Socket from '../helpers/socket';

function ChatContainer(props) {
  const [msg, setMsg] = useInput('');
  let socket;
  useEffect(() => {
    socket = new Socket(props.user.user._id); //uid

    socket.socket.on('online', (uid) => {
      console.log('uid came online: ', uid);
    });

    socket.socket.on('offline', (uid) => {
      console.log('uid went offline: ', uid);
    });

    return () => {
      socket.closeSocket(props.user.user._id);
    };
  }, []);

  function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    function handleChange(e) {
      setValue(e.target.value);
    }
    return [value, handleChange];
  }

  let handleSend = () => {
    if (msg.trim().length === 0) return;
    console.log(`MSG: ${msg.trim()}`);
    socket.emit('send-message', { msg });
    document.getElementById('textfield-chat').value = '';
  };

  return (
    <div>
      <Container fixed>
        <h1>User Name</h1>
        <Button variant="contained" color="primary">
          Dummy
        </Button>
        <ul>
          <li>msgs1</li>
          <li>msgs2</li>
          <li>msgs3</li>
          <li id="display">msgs4</li>
        </ul>
        <div>
          <TextField id="textfield-chat" onChange={setMsg} value={msg} />
          <IconButton onClick={handleSend}>
            <SendTwoToneIcon />
          </IconButton>
        </div>
      </Container>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(ChatContainer);
