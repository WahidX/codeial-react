import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { fetchUser } from '../actions/user';
import { fetchPosts } from '../actions/posts';

import {
  ButtonAppBar,
  Home,
  Signup,
  Login,
  Profile,
  CustomizedSnackbars,
  Settings,
  SearchResults,
  ChatContainer,
  Page404,
  Footer,
} from './';

// Custom theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#202020',
    },
  },
});

const PrivateRoute = (privateRouteProps) => {
  const { isLoggedin, path, component: Component } = privateRouteProps;
  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedin ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    this.props.dispatch(fetchUser());
  }

  render() {
    const isLoggedin = this.props.user.isLoggedin;

    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <ButtonAppBar />
          <CustomizedSnackbars />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute
              path="/profile/:id"
              component={Profile}
              isLoggedin={isLoggedin}
            />
            <PrivateRoute
              exact
              path="/settings"
              component={Settings}
              isLoggedin={isLoggedin}
            />
            <PrivateRoute
              exact
              path="/search"
              component={SearchResults}
              isLoggedin={isLoggedin}
            />
            <Route component={Page404} />
          </Switch>
          {isLoggedin && <ChatContainer />}
          <Footer />
        </Router>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    user: state.user,
  };
}

export default connect(mapStateToProps)(App);
