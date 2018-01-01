import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import * as submissionActions from '../actions';
import { getCurrentSubmission } from '../selectors';

export class SubmissionContainer extends Component {

  componentWillMount() {
    const { submissionId } = this.props.match;
    this.props.setCurrentSubmissionId(submissionId);
  }

  render() {
    const { submission } = this.props;

    if(!submission) {
      //TODO display not found page
      return "SUBMISSION NOT FOUND";
    }

    return (
      <div>{submission.submissionId}</div>
    );
  }

}

SubmissionContainer.propTypes = {
  setCurrentSubmissionId: PropTypes.func.isRequired,
  submission: PropTypes.shape({
    submissionId: PropTypes.string.isRequired,
  }),
};

SubmissionContainer.defaultProps = {};

const mapStateToProps = (state) => {
  return {
    submission: getCurrentSubmission(state)
  }
};

export default connect(mapStateToProps, submissionActions)(SubmissionContainer);

