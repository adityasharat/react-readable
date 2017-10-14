import React, { Component } from 'react';
import { Link, Route, withRouter, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../css/font-awesome-4.7.0/css/font-awesome.min.css';
import '../css/index.css';

import { sortPost } from '../actions/PostActions';
import { fetchCategories } from '../actions/CategoryActions';
import HomePage from './home/HomePage';
import PostDetail from './post/PostDetail';
import NewPost from './post/NewPost';
import EditPost from './post/EditPost';
import NewComment from './comment/NewComment';
import EditComment from './comment/EditComment';

class Application extends Component {
  static propTypes = {
    posts: PropTypes.array,
    categories: PropTypes.array
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    const { categories, sortPost } = this.props

    return (
      <div>
        {/* Naviation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/" aria-labelledby="Readable Home Page" title="Readable Home Page">
              <i className="fa fa-book"/>
          </Link>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                  aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" id="categoryDropDown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Choose Category
                </a>
                <div className="dropdown-menu" aria-labelledby="categoryDropDown">
                  {
                    categories && categories.map(category => (
                        <Link className="dropdown-item" key={category.name} to={`/${category.path}`}>{category.name}</Link>
                      )
                    )
                  }
                </div>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" id="filterDropDown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Sort By
                </a>
                <div className="dropdown-menu" aria-labelledby="filterDropDown">
                  <button className="dropdown-item"  onClick={() => sortPost("timestamp")}>Time</button>
                  <button className="dropdown-item"  onClick={() => sortPost("voteScore")}>Vote Score</button>
                </div>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/new" role="button" aria-labelledby="Create new post">
                  <i className="fa fa-plus" />
                </Link>
              </li>

            </ul>
          </div>
        </nav>
        {/* Routes */}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/new" component={NewPost} />
          <Route exact path="/:category" component={HomePage} />
          <Route exact path="/:category/:postId" component={PostDetail} />
          <Route path="/:category/:postId/edit" component={EditPost} />
          <Route path="/:category/:postId/comment" component={NewComment} />
          <Route path="/:category/:postId/:commentId/edit" component={EditComment} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories: categories
  };
}

export default withRouter(connect(mapStateToProps, {
  sortPost,
  fetchCategories
})(Application));
