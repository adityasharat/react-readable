import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createComment } from '../../actions/CommentActions';
import { guid } from '../../utils/Utils';

class NewComment extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    const postId = this.props.match.params.postId;
    const commentBody = e.target.body.value.trim();
    const author = e.target.author.value.trim();

    if (commentBody === "" || author === "") {
      alert("Both fields are mandatory");
    } else {
      const submitComment = {
        id: guid(),
        parentId: postId,
        timestamp: Date.now(),
        body: commentBody,
        author: author
      };
      this.props.createComment(submitComment, postId, () => this.props.history.push(`/post/${postId}`));
    }
  }

  render() {
    return (
      <form className="form create-comment" onSubmit={ this.handleSubmit }>
        <h4>Create a new post</h4>
        <div className="form-group">
          <label htmlFor="author">Name</label>
          <input type="text" className="form-control" name="author" id="author" placeholder="Enter author's name" required/>
        </div>
        <div className="form-group">
          <label htmlFor="body">Content</label>
          <textarea type="text" className="form-control" name="body" id="body" placeholder="Enter comment" rows="10" required/>
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    );
  }
}

function mapStateToProps({ posts, categories }) {
  console.log("state", this.state)
  return {
    posts: posts,
  };
}

export default connect(mapStateToProps, { createComment })(NewComment);
