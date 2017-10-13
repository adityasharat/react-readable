import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchAllPosts, updatePost } from '../../actions/PostActions';
import { fetchCommentForPost } from '../../actions/CommentActions';

class EditPost extends Component {
  componentDidMount() {
    this.props.fetchAllPosts();
    this.props.fetchCommentForPost(this.props.match.params.postId);
  }

  editPost = (e) => {
    e.preventDefault();
    const postId = this.props.post.id;
    const title = e.target.title.value;
    const body = e.target.body.value;

    if (body === "" || title === "") {
      alert("Both fields are mandatory");
    } else {
      this.props.updatePost(postId, title, body ,() => this.props.history.push('/'));
    }
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return (<h3 className="error">404 Post Not Found</h3>);
    }

    return (
      <form className="form create-post" onSubmit={ this.editPost }>
        <h4>Edit post by {post.author}</h4>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input defaultValue={ post.title } type="text" className="form-control" name="title" id="title" placeholder="Enter title for the post" required/>
        </div>
        <div className="form-group">
          <label htmlFor="body">Content</label>
          <textarea defaultValue={ post.body } type="text" className="form-control" name="body" id="body" placeholder="Enter contents for the post" rows="10" required/>
        </div>
        <div className="btn-group">
          <button type="submit" className="btn btn-primary">Update</button>
          <Link className="btn btn-secondary" role="button" to={`/post/${post.id}`}>Cancel</Link>
        </div>
      </form>
    );
  }
}

function mapStateToProps({ posts, comments }, { match }) {
  return {
    post: _.find(posts, { id: match.params.postId }),
    comments: comments[match.params.postId]
  };
}

export default connect(mapStateToProps, { fetchAllPosts, updatePost, fetchCommentForPost })(EditPost);
