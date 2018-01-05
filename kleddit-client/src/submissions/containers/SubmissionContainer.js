import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as submissionActions from '../actions';
import { getCurrentSubmission, getCurrentSubmissionReplies, isFetchingNextReplyPage } from '../selectors';
import { Submission } from '../components/submission/Submission';
import { SubmissionNotFound } from '../components/submission/SubmissionNotFound';
import { MainPageLoadingIndicator } from '../../main/components/MainPageLoadingIndicator';

export class SubmissionContainer extends Component {

  componentWillMount() {
    const { submissionId } = this.props.match.params;
    this.props.fetchCurrentSubmission(submissionId);
    window.addEventListener('scroll', this.onScroll);
  }

  onScroll = (event) => {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      this.props.onScrollBottom();
    }
  };

  render() {
    const { submission, replies, onReplySubmit, isFetchingNextPage } = this.props;

    if (!submission) {
      return <SubmissionNotFound/>;
    }

    return [
      <Submission key={1} submission={submission} replies={replies} onReplySubmit={onReplySubmit}/>,
      <MainPageLoadingIndicator isFetchingNextPage={isFetchingNextPage}/>
    ];
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
    }),
  ).isRequired,
  onScrollBottom: PropTypes.func.isRequired,
  isFetchingNextPage: PropTypes.bool.isRequired,
};

SubmissionContainer.defaultProps = {};

const mapStateToProps = (state) => {
  return {
    submission: getCurrentSubmission(state),
    replies: getCurrentSubmissionReplies(state),
    isFetchingNextPage: isFetchingNextReplyPage(state),
  };
};

export default connect(mapStateToProps, submissionActions)(SubmissionContainer);

