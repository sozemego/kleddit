import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {MainPageSubmission} from './MainPageSubmission';
import { MainPageSubmissionReplies } from './MainPageSubmissionReplies';

export class MainPageSubmissions extends Component {

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
      inputReplyErrors
    } = this.props;

    return(
      <ReactCSSTransitionGroup
        transitionName="submission"
        transitionAppear={true}
        transitionAppearTimeout={250}
        transitionEnterTimeout={250}
        transitionLeaveTimeout={250}
        component="div"
        className="main-page-submissions-container"
      >
        {submissions.map((submission, index) => {
          const { submissionId } = submission;
          return <div key={submissionId}>
            <MainPageSubmission submission={submission}
                                onDelete={deleteSubmission}
                                toggleShowReplies={toggleShowReplies}
                                isShowingReplies={showingRepliesSubmissions[submissionId]}
            />
            <MainPageSubmissionReplies submissionId={submissionId}
                                       replies={replies[submissionId]}
                                       isLoadingReplies={loadingReplies[submissionId]}
                                       onReplyContentChanged={onReplyContentChanged}
                                       onReplySubmit={onReplySubmit}
                                       isShowingReplies={showingRepliesSubmissions[submissionId]}
                                       inputReply={inputReplies[submissionId]}
                                       inputReplyError={inputReplyErrors[submissionId]}
            />
          </div>;
        })}
      </ReactCSSTransitionGroup>
    );
  }

}

MainPageSubmissions.propTypes = {
  submissions: PropTypes.array.isRequired,
  deleteSubmission: PropTypes.func.isRequired,
  toggleShowReplies: PropTypes.func.isRequired,
  showingRepliesSubmissions: PropTypes.object.isRequired,
  replies: PropTypes.object.isRequired,
  loadingReplies: PropTypes.object.isRequired,
  onReplyContentChanged: PropTypes.func.isRequired,
  onReplySubmit: PropTypes.func.isRequired,
  inputReplies: PropTypes.object.isRequired,
  inputReplyErrors: PropTypes.object.isRequired,
};

MainPageSubmissions.defaultProps = {

};