import React from 'react';
import { connect } from 'react-redux';
import { Chip, Avatar } from '@material-ui/core';

function ResultChips(props) {
  let handleSelect = () => {
    console.log('selected');
  };

  let results = props.search.userResults;
  console.log('results::: ', results);

  return (
    <div className="chip-list">
      {results.map((user) => (
        <Chip
          label={user.name}
          onClick={handleSelect}
          avatar={<Avatar src={user.avatar} />}
        />
      ))}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
    search: state.search,
  };
}

export default connect(mapStateToProps)(ResultChips);
