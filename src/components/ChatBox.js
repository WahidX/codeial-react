import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  TextField,
  IconButton,
  Typography,
  Accordion,
  AccordionSummary,
} from '@material-ui/core';
import SendTwoToneIcon from '@material-ui/icons/SendTwoTone';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getSocket } from '../helpers/socket';

let socket;

const messages = [
  'hello',
  'msg',
  'Hellowww',
  'Noice',
  'hello',
  'msg',
  'Hellowww',
  'Noice',
];

function ChatBox(props) {
  const [msg, setMsg] = useInput('');

  useEffect(() => {
    // socket = new Socket(props.user.user._id); //uid
    socket = getSocket(props.user.user._id);

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
    socket.socket.emit('send-message', { msg: msg, uid: props.user.user._id }); //room id needed
    document.getElementById('textfield-chat').value = '';
  };

  return (
    <Accordion className="chat-window">
      <AccordionSummary className="title" expandIcon={<ExpandMoreIcon />}>
        <Typography color="primary">User Name</Typography>
      </AccordionSummary>
      <div className="flex-row">
        <div>
          <div dense={true} className="msg-list">
            {messages.map((msg) => (
              <p className="msg msg-right">{msg}</p>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <TextField id="textfield-chat" onChange={setMsg} value={msg} />
          <IconButton onClick={handleSend}>
            <SendTwoToneIcon />
          </IconButton>
        </div>
      </div>
    </Accordion>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(ChatBox);
