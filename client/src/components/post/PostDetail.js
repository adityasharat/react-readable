import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCommentForPost } from '../../actions/CommentActions';
import { fetchAllPosts, deletePost } from '../../actions/PostActions';
import PostComment from '../comment/PostComment';
import SinglePost from '../post/SinglePost';

class PostDetail extends Component {

  componentDidMount() {
    this.props.fetchAllPosts();
    this.props.fetchCommentForPost(this.props.match.params.postId);
  }

  render() {
    const { post, comments } = this.props;

    if (!post) {
      return (<h3 className="error">404 Post Not Found</h3>);
    }

    return (
      <div className="post-container">
        <SinglePost post={ post } />
        <div className="small-margin btn-group">
          <Link className="btn btn-primary" to={ `/${post.category}/${post.id}/comment` }>comment</Link>
        </div>
        { comments && <PostComment category={ post.category } comments={ comments } history={ this.props.history } /> }
      </div>
    );
  }
}

function mapStateToProps({ posts, comments }, { match }) {
  const post = _.find(posts, { id: match.params.postId });
  return {
    post: post,
    comments: comments[match.params.postId]
  };
}

export default connect(mapStateToProps, { fetchAllPosts, deletePost, fetchCommentForPost })(PostDetail);
