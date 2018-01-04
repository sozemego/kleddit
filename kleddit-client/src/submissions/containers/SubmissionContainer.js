import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import * as submissionActions from '../actions';
import { getCurrentSubmission } from '../selectors';
import { Submission } from '../components/submission/Submission';
import { SubmissionNotFound } from '../components/submission/SubmissionNotFound';

export class SubmissionContainer extends Component {

  componentWillMount() {
    const { submissionId } = this.props.match.params;
    this.props.fetchCurrentSubmission(submissionId);
  }

  render() {
    const { submission } = this.props;

    if(!submission) {
      return <SubmissionNotFound />;
    }

    return (
      <Submission />
    );
  }

}

SubmissionContainer.propTypes = {
  fetchCurrentSubmission: PropTypes.func.isRequired,
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

