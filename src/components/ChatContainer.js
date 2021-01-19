import React from 'react';
import { connect } from 'react-redux';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';

import { ChatList, ChatBox, SearchBox, ResultChips } from './';

function ChatContainer(props) {
  if (!props.isLoggedin) {
    return null;
  }

  return (
    <div id="chat-container">
      <ChatList />

      <Accordion>
        <AccordionSummary className="title">
          <SearchBox filter="user" />
        </AccordionSummary>
        <AccordionDetails className="flex-column">
          <ResultChips />
        </AccordionDetails>
      </Accordion>

      <ChatBox />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isLoggedin: state.user.isLoggedin,
  };
}

export default connect(mapStateToProps)(ChatContainer);
