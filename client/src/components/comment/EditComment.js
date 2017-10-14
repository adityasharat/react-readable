import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as commentActions from '../../actions/CommentActions';

class EditComment extends Component {

  componentDidMount() {
    this.props.fetchCommentForPost(this.props.match.params.postId);
  }

  updateComment = (e) => {
    e.preventDefault();
    const commentId = this.props.comment.id;
    const postId = this.props.comment.parentId;
    const timestamp = Date.now();
    const body = e.target.body.value.trim();

    if (body === "") {
      alert('Comment cannot be empty');
    } else {
      this.props.updateComment(commentId, postId, timestamp, body,() => this.props.history.push(`/post/${postId}`));
    }
  }

  render() {

    if (!this.props.comment) {
      return (<h3 className="error">404 Comment Not Found</h3>);
    }

    return (
      <form className="form create-comment" onSubmit={ this.updateComment }>
        <h4>Edit comment by { this.props.comment.author }</h4>
        <div className="form-group">
          <label htmlFor="body">Content</label>
          <textarea defaultValue={this.props.comment.body} type="text" className="form-control" name="body" id="body" placeholder="Enter comment" rows="10" required/>
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
        <Link className="btn btn-secondary" to={ `/post/${this.props.comment.parentId}` }>Cancel</Link>
      </form>
    );
  }
}

function mapStateToProps({ posts, comments }, { match }) {
  return {
    comment: _.find(comments[match.params.postId], { id: match.params.commentId })
  };
}

export default connect(mapStateToProps, commentActions)(EditComment);
