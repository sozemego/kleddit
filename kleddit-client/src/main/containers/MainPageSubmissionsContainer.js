import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as mainPageActions from '../actions';

import { MainPageSubmissions } from '../components/Submissions/MainPageSubmissions';
import { getSubmissions, } from '../../submissions/selectors';

class MainPageSubmissionsContainer extends Component {

  componentWillMount = () => {
    window.addEventListener('scroll', this.onScroll);
  };

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.onScroll);
  };

  onScroll = (event) => {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      this.props.onScrollBottom();
    }
  };

  render() {
    const {
      submissions,
    } = this.props;

    return (
      <MainPageSubmissions submissions={submissions}/>
    );
  }

}

MainPageSubmissionsContainer.propTypes = {
  submissions: PropTypes.array.isRequired,
};

MainPageSubmissionsContainer.defaultProps = {};

const mapStateToProps = (state) => {
  return {
    submissions: getSubmissions(state),
  };
};

export default connect(mapStateToProps, { ...mainPageActions })(MainPageSubmissionsContainer);