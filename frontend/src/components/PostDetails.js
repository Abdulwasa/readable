import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap'
import { commentsAPI } from '../actions/comment';
import { postAPI } from '../actions/post';
import Post from './Post';
import Comments from './Comments';
import CommentForm from './CommentForm';


class PostDetails extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.postId);
    this.props.getComments(this.props.match.params.postId);
  }

  handleDelete = () => {
    this.props.history.push('/');
  };

  render() {
    const { post, comments } = this.props;
    const postCheck = post ? post : 0;
    console.log(postCheck)
		return (
				<div>
          {
          <Grid>
            <Row>
                <Col sm={6} md={6} lg={12} xs={12}>
              		<Post key={postCheck.id} post={post}  onDelete={this.handleDelete} />
              					<div>
              					  <div >
              						<h2>Comments</h2>
              						{comments.map(comment => (
              						  <div key={comment.id}>
              							<Comments comment={comment} />
              						  </div>
              						))}
              					  </div>
              					  <div>
              						<CommentForm parentId={this.props.match.params.postId} />
              					  </div>
              					</div>

                      </Col>
                  </Row>
              </Grid>
               }

				</div>
			  );

  };

}

PostDetails.propTypes = {
  post: PropTypes.object,
  getPost: PropTypes.func,
  getComments: PropTypes.func,
  match: PropTypes.object,
  history: PropTypes.object,
  comments: PropTypes.array
};

PostDetails.defaultProps = {
  comments: []
};

const mapStateToProps = ({ post, comment }) => {
  let props = {};
  if (post.posts) {
    props.post = post.posts[Object.keys(post.posts)[0]];
  }
  if (comment.comments) {
    props.comments = Object.keys(comment.comments)
      .map(commentId => comment.comments[commentId])
      .filter(comment => comment);
  }
  return props;
};

export default connect(mapStateToProps, {
  getPost: postAPI,
  getComments: commentsAPI
})(PostDetails);
