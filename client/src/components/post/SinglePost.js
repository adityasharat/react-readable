import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatTimestamp } from '../../utils/Utils';
import { Link } from 'react-router-dom';

import * as CommentActions from '../../actions/CommentActions';
import * as PostActions from '../../actions/PostActions';

class SinglePost extends Component {

  componentDidMount() {
    this.props.fetchCommentForPost(this.props.post.id);
  }

  onPostDelete = () => {
    const id = this.props.post.id;
    this.props.deletePost(id, () => {});
  }

  render() {
    const { post, comments, votePost, fetchAllPosts } = this.props;

    return (
      <div className="post card">
        <div className="card-body">
          <Link to={ `/${post.category}/${post.id}` }>
            <h4 className="card-title">{ post.title }</h4>
          </Link>
          <p className="card-text">{ post.body }</p>
        </div>
        <div className="card-footer text-muted">
          <div className="post-controls">
            <i className="controls fa fa-thumbs-o-up" onClick={
                () => {
                  votePost(post.id, "upVote");
                  fetchAllPosts();
                }
              }/>
            <i className="controls fa fa-thumbs-o-down" onClick={
                () => {
                    votePost(post.id, "downVote");
                    fetchAllPosts();
                  }
                }/>
            <Link className="link controls btn" to={ `/${post.category}/${post.id}/edit` }>
              <i className="fa fa-edit"/>
            </Link>
            <i className="controls fa fa-trash-o" onClick={ (e) => this.onPostDelete(e) }/>
          </div>
          <div className="post-likes-comments">
            <label className="post-footer-label"> { post.voteScore } votes </label>
            <label className="post-footer-label"> { comments ? comments.length : 0} comments</label>
          </div>
          <div className="post-meta float-right">
            <label className="post-footer-label"><b>Category:</b> { post.category }</label>
            <label className="post-footer-label"><b>Author:</b> { post.author }</label>
            <label className="post-footer-label"><b>Time:</b> { formatTimestamp(post.timestamp) }</label>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ comments }, { post }) {
  return {
    comments: comments[post.id]
  };
}

export default connect(mapStateToProps, { ...PostActions, ...CommentActions })(SinglePost);
