import React from 'react';
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
import { ChatList, ChatBox, SearchBox, ResultChips } from './';

function ChatContainer(props) {
  return (
    <div>
      <ChatList />
      <SearchBox />
      <ResultChips />
      <ChatBox />
    </div>
  );
}

export default ChatContainer;
