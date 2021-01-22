import React, { useState } from 'react';
import { connect } from 'react-redux';
import { IconButton, InputBase, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { clearSearchResults, fetchResults } from '../actions/search';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: 'inherit',
  },
}));

function SearchBox(props) {
  const classes = useStyles();
  const [searchKey, setSearchKey] = useState('');

  let filter = props.filter || 'any'; // user, posts or all

  function handleOnChange(e) {
    setSearchKey(e.target.value);
    console.log(e.target.value);
    if (e.target.value.length > 1) {
      props.dispatch(fetchResults(e.target.value, filter)); // hitting search api
    }
  }

  function clearSearch() {
    setSearchKey('');
    props.dispatch(clearSearchResults());
  }

  let { loading } = props.search;

  return (
    <React.Fragment>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          minWidth: '100px',
          width: '80%',
          paddingLeft: '50px',
        }}
      >
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            // input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          value={searchKey}
          onChange={handleOnChange}
        />
        {searchKey && (
          <IconButton onClick={clearSearch}>
            <CloseIcon />
          </IconButton>
        )}
      </div>
      {loading && <LinearProgress />}
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    search: state.search,
  };
}

export default connect(mapStateToProps)(SearchBox);
