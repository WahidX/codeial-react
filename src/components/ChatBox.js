import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  TextField,
  IconButton,
  Typography,
  Accordion,
  AccordionSummary,
  Avatar,
} from '@material-ui/core';
import SendTwoToneIcon from '@material-ui/icons/SendTwoTone';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getSocket } from '../helpers/socket';

let socket;

// const messages = [
//   'hello',
//   'msg',
//   'Hellowww',
//   'Noice',
//   'hello',
//   'msg',
//   'Hellowww',
//   'Noice',
// ];

function ChatBox(props) {
  let id = props.user.user._id;
  useEffect(
    (props) => {
      socket = getSocket(id);

      socket.socket.on('online', (uid) => {
        console.log('uid came online: ', uid);
      });

      socket.socket.on('offline', (uid) => {
        console.log('uid went offline: ', uid);
      });

      return () => {
        socket.closeSocket();
      };
    },
    [props.user.isLoggedin]
  );

  const [msg, setMsg] = useInput('');
  let { messages, roomID, recipent } = props.chats;

  if (messages === null) messages = [];

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
    socket.socket.emit('send-message', msg, id, roomID, (response) => {
      console.log('Status: ', response.status);
    });

    document.getElementById('textfield-chat').value = '';
  };

  return (
    <Accordion className="chat-window">
      <AccordionSummary className="title" expandIcon={<ExpandMoreIcon />}>
        {recipent && recipent.avatar ? (
          <img
            src={recipent.avatar}
            style={{ width: '30px', borderRadius: '50%' }}
            alt="avatar"
          />
        ) : (
          <Avatar />
        )}
        <Typography color="primary">
          &nbsp;&nbsp;&nbsp;{recipent ? recipent.name : ' '}
        </Typography>
      </AccordionSummary>
      <div className="flex-row">
        <div>
          <div dense={true} className="msg-list">
            {messages.map((msg) => (
              <p className="msg msg-right" id={msg._id}>
                {msg.content}
              </p>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <TextField
            id="textfield-chat"
            onChange={setMsg}
            value={msg}
            disabled={!recipent}
          />
          <IconButton onClick={handleSend} disabled={!recipent}>
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
    chats: state.chats,
  };
}

export default connect(mapStateToProps)(ChatBox);
