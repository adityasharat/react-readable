import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { formatTimestamp } from '../../utils/Utils';
import * as CommentActions from '../../actions/CommentActions';

class PostComment extends Component {

  onCommentDelete = (comment) => {
    let parentId = comment.parentId;
    this.props.deleteComment(comment.id, () => {
      this.props.history.push(`/post/${parentId}`);
      this.props.fetchCommentForPost(comment.parentId);
    });
  }

  render() {
    return (
      <div className="small-margin">
        {
          this.props.comments.map(comment => (
              <div className="comment card" key={comment.id}>
                <div className="card-body">
                  <p className="card-text">{comment.body}</p>
                  <p className="card-text text-muted"> by <em>{ comment.author }</em> at { formatTimestamp(comment.timestamp) }</p>
                </div>

                <div className="card-footer text-muted">
                  <div className="post-controls">
                    <i className="controls fa fa-thumbs-o-up" onClick={
                        () => {
                          this.props.voteComment(comment.id, comment.parentId, "upVote");
                        }
                      }/>
                    <i className="controls fa fa-thumbs-o-down" onClick={
                        () => {
                          this.props.voteComment(comment.id, comment.parentId, "downVote");
                        }
                    }/>
                  </div>
                  <div className="post-likes-comments">
                    <label className="post-footer-label"> { comment.voteScore } votes </label>
                  </div>
                  <div className="btn-group comment-controls float-right">
                    <Link className="btn btn-warning" to={ `/${this.props.category}/${comment.parentId}/${comment.id}/edit` }>
                      <i className="fa fa-edit"/>
                    </Link>
                    <button className="btn btn-danger" onClick={ () => this.onCommentDelete(comment) }>
                      <i className="fa fa-trash"/>
                    </button>
                  </div>
                </div>
              </div>
            )
          )
        }
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return { posts };
}

export default connect(mapStateToProps, CommentActions)(PostComment);
