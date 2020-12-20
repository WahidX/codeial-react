import React from 'react';
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

export default function ButtonAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);

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

          <Link to="/profile">
            <Button color="inherit">Profile</Button>
          </Link>
          <Link to="Login">
            <Button color="inherit">Login</Button>
          </Link>
          <Link to="Signup">
            <Button color="inherit">Signup</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
