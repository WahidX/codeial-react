import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, IconButton } from '@material-ui/core';
import SendTwoToneIcon from '@material-ui/icons/SendTwoTone';
import io from 'socket.io-client';

const ENDPOINT = 'localhost:5000';
let socket;

function ChatContainer(props) {
  const [name, setName] = useInput('');
  const [channel, setChannel] = useInput('');
  const [msg, setMsg] = useInput('');

  useEffect(() => {
    socket = io(ENDPOINT);
    console.log('msg: ', msg);
    console.log('socket: ', socket);

    socket.emit('init', { status: 'online' });
    return () => {
      console.log('discon');
      socket.close();
    };
  }, [ENDPOINT]);

  function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    function handleChange(e) {
      setValue(e.target.value);
    }
    return [value, handleChange];
  }

  let handleEnter = () => {
    console.log(`${name} Entered ${channel}`);
  };

  let handleSend = () => {
    if (msg.trim().length === 0) return;
    console.log(`MSG: ${msg.trim()}`);
  };

  return (
    <div>
      <Container fixed>
        <h1>User Name</h1>
        <Button onClick={handleEnter} variant="contained" color="primary">
          Enter
        </Button>
        <ul>
          <li>msgs1</li>
          <li>msgs2</li>
          <li>msgs3</li>
          <li>msgs4</li>
        </ul>
        <div>
          <TextField onChange={setMsg} value={msg} />
          <IconButton onClick={handleSend}>
            <SendTwoToneIcon />
          </IconButton>
        </div>
      </Container>
    </div>
  );
}

export default ChatContainer;
