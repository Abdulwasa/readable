import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap'




class Home extends Component{
  render() {
    const { categories } = this.props;
    return (
      <div>
			{
			<Grid>
			  <Row>
  				    <Col sm={6} md={6} lg={12} xs={12}>
						<div className="ca">
    						<Link to="/">
    								<span className="all">all</span>
    							</Link>

    							{categories.map((e) => (
    								<span key={`${e.name}`} className="categories">
    									<Link to={`/category/${e.path}`}> {e.name} </Link>
    								</span>
    							))}
							</div>
						</Col>
					</Row>
				</Grid>
				}
      </div>
    );
  }
}

Home.propTypes = {
  categories: PropTypes.array
};

Home.defaultProps = {
  categories: []
};

const mapStateToProps = ({ category }) => ({
  ...category
});


export default connect(mapStateToProps)(Home);
