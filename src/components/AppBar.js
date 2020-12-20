import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { AccountCircle } from '@material-ui/icons';
import { logoutUser } from '../actions/user';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ButtonAppBar(props) {
  const classes = useStyles();
  let isLoggedin = props.user.isLoggedin;

  let logoutHandle = () => {
    props.dispatch(logoutUser());
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ backgroundColor: 'cornflowerblue', color: 'black' }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            <Link to="/">CodeialX</Link>
          </Typography>

          {isLoggedin && (
            <Link to="/profile">
              <Button color="inherit">
                <AccountCircle />
              </Button>
            </Link>
          )}
          {isLoggedin && (
            <Button color="inherit" onClick={logoutHandle}>
              Logout
            </Button>
          )}

          {!isLoggedin && (
            <Link to="Login">
              <Button color="inherit">Login</Button>
            </Link>
          )}
          {!isLoggedin && (
            <Link to="Signup">
              <Button color="inherit">Signup</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(ButtonAppBar);
