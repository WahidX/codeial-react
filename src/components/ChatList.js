import React from 'react';
import { connect } from 'react-redux';
import {
  Accordion,
  AccordionSummary,
  List,
  ListItem,
  Typography,
  AccordionDetails,
  Avatar,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getSocket } from '../helpers/socket';
import { setSnackBar } from '../actions/snackbar';
import { fetchMessages, switchRecipent } from '../actions/chats';

function ChatList(props) {
  let all_chats = props.chats.chats;
  let socket = getSocket(props.user.user._id);

  let handleSelect = (id) => {
    socket.socket.emit('enter-room', props.user.user._id, id, (response) => {
      // if we already have
      if (!response) {
        props.dispatch(setSnackBar('error', 'Server Error!', 3000));
      }
      let recipent =
        response.newChat.users[0]._id === props.user.user._id
          ? response.newChat.users[1]
          : response.newChat.users[0];
      props.dispatch(fetchMessages(response.newChat._id));
      props.dispatch(switchRecipent(recipent, response.newChat._id));
    });
  };

  function ChatItem(props) {
    // bringing the recipent
    if (!props.chat) return null;
    let recipent =
      props.chat.users[0]._id === props.user._id
        ? props.chat.users[1]
        : props.chat.users[0];

    return (
      <ListItem
        button
        id={props.chat._id}
        onClick={() => handleSelect(recipent._id)}
      >
        <ListItemIcon>
          {recipent.avatar ? (
            <img
              src={recipent.avatar}
              style={{ width: '40px', borderRadius: '50%' }}
              alt="avatar"
            />
          ) : (
            <Avatar />
          )}
        </ListItemIcon>
        <ListItemText primary={recipent.name} />
      </ListItem>
    );
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} id="allchats">
        <Typography>All Chats</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List component="nav" dense={true}>
          {all_chats.map((chat) => (
            <ChatItem chat={chat} user={props.user.user} key={chat._id} />
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}

function mapStateToProps(state) {
  return {
    chats: state.chats,
    user: state.user,
  };
}

export default connect(mapStateToProps)(ChatList);
