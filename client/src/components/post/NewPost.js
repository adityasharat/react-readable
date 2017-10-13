import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../actions/PostActions';
import { guid } from '../../utils/Utils';

class NewPost extends Component {

  createPost = (e) => {
    e.preventDefault();
    const post = {
      id: guid(),
      timestamp: Date.now(),
      title: e.target.title.value,
      body: e.target.body.value,
      author: e.target.author.value,
      category: e.target.category.value,
    };
    this.props.createPost(post, () => this.props.history.push('/'));
  };

  render() {
    return (
      <form className="form create-post" onSubmit={ this.createPost }>
        <h4>Create a new post</h4>
        <div className="form-group">
          <label htmlFor="author">Name</label>
          <input type="text" className="form-control" name="author" id="author" placeholder="Enter author's name" required/>
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" name="title" id="title" placeholder="Enter title for the post" required/>
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select name="category" id="category" aria-labelledby="Pick a category for the post" className="form-control" required>
            {
              this.props.categories && this.props.categories.map((category) => (
                  <option key={category.name} value={category.name}>{category.name}</option>
                )
              )
            }
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="body">Content</label>
          <input type="text" className="form-control" name="body" id="body" placeholder="Enter contents for the post" required/>
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    );
  }
}

function mapStateToProps({ posts, categories }) {
  return {
    posts: posts,
    categories: categories
  };
}

export default connect(mapStateToProps, { createPost })(NewPost);
