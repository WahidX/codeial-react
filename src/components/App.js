import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { fetchUser } from '../actions/user';
import { fetchPosts } from '../actions/posts';

import {
  ButtonAppBar,
  Home,
  Signup,
  Login,
  Profile,
  Page404,
  Footer,
} from './';

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
      <Router>
        <ButtonAppBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute
            exact
            path="/profile"
            component={Profile}
            isLoggedin={isLoggedin}
          />
          <Route component={Page404} />
        </Switch>
        <Footer />
      </Router>
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
