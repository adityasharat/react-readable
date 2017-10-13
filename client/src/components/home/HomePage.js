import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../actions/PostActions';
import SinglePost from '../post/SinglePost';

class HomePage extends Component {
  static propTypes = {
    posts: PropTypes.array
  }

  componentDidMount() {
    this.props.fetchAllPosts();
  }

  render() {
    const { posts } = this.props;
    return <div className="posts-container">
      { posts.map(post => (
            <SinglePost key={ post.id } post={ post } />
          )
        )
      }
    </div>
  }
}

function mapStateToProps({ posts }, { match }) {
  const category = match.params.category;
  return {
    posts: category ? posts.filter(post => post.category === category) : posts
  };
}

export default connect(mapStateToProps, actions)(HomePage);
