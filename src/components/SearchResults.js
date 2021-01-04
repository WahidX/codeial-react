import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { SearchBox } from './';

function SearchResults(props) {
  function UserCard(user) {
    return <h1>User3</h1>;
  }

  function PostCard(user) {
    return <h1>Post1</h1>;
  }

  return (
    <React.Fragment>
      <SearchBox />
      User Results
      <UserCard />
      <UserCard />
      <UserCard />
      Post Results
      <PostCard />
      <PostCard />
      <PostCard />
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(SearchResults);
