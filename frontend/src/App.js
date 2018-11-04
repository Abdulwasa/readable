import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './components/Home';
import PostList from './components/PostList';
import { categoriesAPI } from './actions/category';
import { postsAPI } from './actions/post';
import PostForm from './components/PostForm';
import PostDetails from './components/PostDetails';


class App extends React.Component {
  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    return (
      <div className="App">
        <Home />
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route exact path="/" component={PostForm} />
          <Route exact path="/category/:category" component={PostList} />
          <Route path="/category/:category/:postId" component={PostDetails} />

        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  getCategories: PropTypes.func,
  getPosts: PropTypes.func
};

export default withRouter(
  connect(null, {
    getCategories: categoriesAPI,
    getPosts: postsAPI
  })(App)
);
