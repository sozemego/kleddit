import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getSubmissions} from '../state/selectors';
import {MainPageSubmission} from './MainPageSubmission';

class SubmissionsContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      submissions
    } = this.props;

    return submissions.map((submission, index) => {
      return <MainPageSubmission key={index} submission={submission}/>;
    });
  }

}

SubmissionsContainer.propTypes = {
  submissions: PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    submissions: getSubmissions(state)
  };
};

export default connect(mapStateToProps)(SubmissionsContainer);