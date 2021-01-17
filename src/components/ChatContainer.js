import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  TextField,
  IconButton,
  Typography,
  makeStyles,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import SendTwoToneIcon from '@material-ui/icons/SendTwoTone';
import MinimizeIcon from '@material-ui/icons/Minimize';
import Socket from '../helpers/socket';

let socket;

const useStyles = makeStyles((theme) => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  msgLeft: {
    float: 'left',
  },
  msgRight: {
    textAlign: 'right',
    // float: 'right',
  },
}));

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

function ChatContainer(props) {
  const classes = useStyles();
  const [msg, setMsg] = useInput('');

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
    const classes = useStyles();
    const [value, setValue] = useState(initialValue);
    function handleChange(e) {
      setValue(e.target.value);
    }
    return [value, handleChange];
  }

  let handleSend = () => {
    if (msg.trim().length === 0) return;
    console.log(`MSG: ${msg.trim()}`);
    socket.socket.emit('send-message', { msg });
    document.getElementById('textfield-chat').value = '';
  };

  return (
    <div>
      <div className="chat-window">
        <div className="title">
          <Typography color="primary">User Name</Typography>
          <IconButton>
            <MinimizeIcon />
          </IconButton>
        </div>

        <div>
          <div dense={true} className="msg-list">
            {messages.map((msg) => (
              <p className="msg msg-right">{msg}</p>
            ))}
          </div>
        </div>

        <div>
          <TextField id="textfield-chat" onChange={setMsg} value={msg} />
          <IconButton onClick={handleSend}>
            <SendTwoToneIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(ChatContainer);
