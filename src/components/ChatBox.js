import React, { useState, useEffect, useRef } from 'react';
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
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import { getSocket } from '../helpers/socket';
import { addToMessages } from '../actions/chats';

let socket;

function ChatBox(props) {
  let id = props.user.user._id;
  let { messages, roomID, recipent } = props.chats;
  if (messages === null) messages = [];

  useEffect(() => {
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
  }, [props.user.isLoggedin]);

  useEffect(() => {
    // incoming messages:
    socket.socket.on('incoming-msg', (message) => {
      console.log('MESSAGE: ', message);
      props.dispatch(addToMessages(message));
    });
  }, []);

  const [msg, setMsg] = useState('');

  let handleSend = () => {
    if (msg.trim().length === 0) return;
    console.log(`MSG: ${msg.trim()}`);
    socket.socket.emit('send-message', msg.trim(), id, roomID, (response) => {
      // console.log('Status: ', response.status);
    });
    setMsg('');
  };

  // For scroll to bottom
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [messages]);

  return (
    <Accordion className="chat-window">
      <AccordionSummary className="title" expandIcon={<ExpandLessIcon />}>
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
              <p
                className={msg.from === id ? 'msg msg-right' : 'msg msg-left'}
                id={msg._id}
              >
                {msg.content}
              </p>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <TextField
            id="textfield-chat"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
            disabled={!recipent}
            style={{ width: '90%' }}
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
