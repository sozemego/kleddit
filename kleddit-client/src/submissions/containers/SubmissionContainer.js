import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import * as submissionActions from '../actions';
import { getCurrentSubmission, getCurrentSubmissionReplies } from '../selectors';
import { Submission } from '../components/submission/Submission';
import { SubmissionNotFound } from '../components/submission/SubmissionNotFound';

export class SubmissionContainer extends Component {

  componentWillMount() {
    const { submissionId } = this.props.match.params;
    this.props.fetchCurrentSubmission(submissionId);
  }

  render() {
    const { submission, replies, onReplySubmit } = this.props;

    if(!submission) {
      return <SubmissionNotFound />;
    }

    return (
      <Submission submission={submission} replies={replies} onReplySubmit={onReplySubmit}/>
    );
  }

}

SubmissionContainer.propTypes = {
  fetchCurrentSubmission: PropTypes.func.isRequired,
  submission: PropTypes.shape({
    submissionId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    replyCount: PropTypes.number.isRequired,
  }),
  replies: PropTypes.arrayOf(
    PropTypes.shape({
      replyId: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      createdAt: PropTypes.number.isRequired,
    })
  ).isRequired,
};

SubmissionContainer.defaultProps = {

};

const mapStateToProps = (state) => {
  return {
    submission: getCurrentSubmission(state),
    replies: getCurrentSubmissionReplies(state),
  }
};

export default connect(mapStateToProps, submissionActions)(SubmissionContainer);

