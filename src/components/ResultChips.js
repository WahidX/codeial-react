import React from 'react';
import { Chip, Avatar } from '@material-ui/core';

function ResultChips(props) {
  let handleSelect = () => {
    console.log('selected');
  };

  //   let results = [];

  return (
    <div className="chip-list">
      <Chip
        label="User Name"
        onClick={handleSelect}
        avatar={<Avatar src="/static/images/avatar/1.jpg" />}
      />
      <Chip
        label="User Name"
        onClick={handleSelect}
        avatar={<Avatar src="/static/images/avatar/1.jpg" />}
      />
      <Chip
        label="User Name"
        onClick={handleSelect}
        avatar={<Avatar src="/static/images/avatar/1.jpg" />}
      />
    </div>
  );
}

export default ResultChips;
