import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap'
import Modal from './Modal';
import PostForm from './PostForm';
import timeago from 'timeago.js';

import * as actions from '../actions/post';

class Post extends Component {
  state = {
    edit: false,
    delete: false
  };

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    });
  };

  toggleDelete = () => {
    this.setState({
      delete: !this.state.delete
    });
  };

  handleDelete = () => {
    this.props.deletePostAPI(this.props.post.id);
    if (this.props.onDelete) {
      this.props.onDelete();
    }
  };

  handleVote = vote => {
    this.props.votePostAPI(this.props.post.id, vote);
  };

  render() {
    const { post } = this.props;
    const postCheck = post ? post : {};
    const date = timeago().format(postCheck.timestamp);
    // Button style
    const button = {
      backgroundColor: '#333848',
      color: 'white',
      margin: '20px 0 10px 0',
      height: '30px',
      minWidth: '100%',
      width: '100%',
      border: 'none'
    };

    return (
      <div className="postDetai">
		   {
        <Grid>
			     <Row>
  				    <Col sm={6} md={6} lg={12} xs={12}>
        						<div>
        							<i className="fa fa-pencil" aria-hidden="true" onClick={this.toggleEdit} />
        							<i className="fa fa-trash" aria-hidden="true" onClick={this.toggleDelete} />
        						  </div>

        						  <Link to={`/category/${postCheck.category}/${postCheck.id}`}>
        							<p>{postCheck.title}</p>
        						  </Link>
        						  <Modal show={this.state.edit} toggle={this.toggleEdit} onClose={this.toggleEdit}>
        							<PostForm edit post={this.props.post} onClose={this.toggleEdit} />
        						  </Modal>

        						  <Modal show={this.state.delete} toggle={this.toggleDelete} onClose={this.toggleDelete}>
        							<strong>Are you Sure?</strong> you want realy delete the Post .<br />
        							<button style={button} onClick={this.handleDelete}>
        							  Delete a post
        							</button>
        						  </Modal>
        						  <h2>
        							{date} by {postCheck.author} in <Link to={`/category/${postCheck.category}`}>{postCheck.category}</Link>
        						  </h2>
        						  <span>{postCheck.body}</span>
        						  <div className="post-bottom">
        							<div className="btn-like">
        							  <div>
        								<i className="fa fa-thumbs-up" aria-hidden="true" onClick={() => this.handleVote('upVote')} />
        								<i className="fa fa-thumbs-down" aria-hidden="true" onClick={() => this.handleVote('downVote')} />
        								<div className="counter">{postCheck.voteScore}</div>
        							  </div>
        							</div>
        							<div className="comment-counter">{postCheck.commentCount} comments</div>

        						</div>
					     </Col>
				  	</Row>
				</Grid>
				}
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  votePostAPI: PropTypes.func,
  deletePostAPI: PropTypes.func,
  onDelete: PropTypes.func
};
const mapStateToProps = ({ post }) => ({
  ...post,
});
export default connect(mapStateToProps, actions)(Post);
