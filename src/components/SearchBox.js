import React, { useState } from 'react';
import { connect } from 'react-redux';
import { InputBase, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fetchResults } from '../actions/search';

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
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

  let { loading } = props.search;

  return (
    <React.Fragment>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        value={searchKey}
        onChange={handleOnChange}
      />
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
