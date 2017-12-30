import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getShowingRepliesSubmissions } from '../selectors';
import * as mainPageActions from '../actions';
import * as submissionsActions from '../../submissions/actions';

import { MainPageSubmissions } from '../components/MainPageSubmissions';
import {
  getInputReplies, getInputReplyErrors, getLoadingReplies, getReplies,
  getSubmissions,
} from '../../submissions/selectors';

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
      deleteSubmission,
      toggleShowReplies,
      showingRepliesSubmissions,
      replies,
      loadingReplies,
      onReplyContentChanged,
      onReplySubmit,
      inputReplies,
      inputReplyErrors,
    } = this.props;

    return (
      <MainPageSubmissions submissions={submissions}
                           deleteSubmission={deleteSubmission}
                           toggleShowReplies={toggleShowReplies}
                           showingRepliesSubmissions={showingRepliesSubmissions}
                           replies={replies}
                           loadingReplies={loadingReplies}
                           onReplyContentChanged={onReplyContentChanged}
                           onReplySubmit={onReplySubmit}
                           inputReplies={inputReplies}
                           inputReplyErrors={inputReplyErrors}
      />
    );
  }

}

MainPageSubmissionsContainer.propTypes = {
  submissions: PropTypes.array.isRequired,
  deleteSubmission: PropTypes.func.isRequired,
  onScrollBottom: PropTypes.func.isRequired,
  toggleShowReplies: PropTypes.func.isRequired,
  replies: PropTypes.object.isRequired,
  loadingReplies: PropTypes.object.isRequired,
  inputReplies: PropTypes.object.isRequired,
  inputReplyErrors: PropTypes.object.isRequired,
};

MainPageSubmissionsContainer.defaultProps = {};

const mapStateToProps = (state) => {
  return {
    submissions: getSubmissions(state),
    showingRepliesSubmissions: getShowingRepliesSubmissions(state),
    replies: getReplies(state),
    loadingReplies: getLoadingReplies(state),
    inputReplies: getInputReplies(state),
    inputReplyErrors: getInputReplyErrors(state),
  };
};

export default connect(mapStateToProps, { ...mainPageActions, ...submissionsActions })(MainPageSubmissionsContainer);