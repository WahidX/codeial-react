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

function ChatList(props) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} id="allchats">
        <Typography>All Chats</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button>
            <ListItemIcon>
              <Avatar />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Avatar />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItem>
        </List>
      </AccordionDetails>
    </Accordion>
  );
}

export default ChatList;
