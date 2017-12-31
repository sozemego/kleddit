import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {MainPageSubmission} from './MainPageSubmission';
import { MainPageSubmissionReplies } from './MainPageSubmissionReplies';
import MainPageSubmissionContainer from '../../containers/MainPageSubmissionContainer';
import MainPageSubmissionRepliesContainer from '../../containers/MainPageSubmissionRepliesContainer';

export class MainPageSubmissions extends Component {

  render() {
    const {
      submissions,
      showingRepliesSubmissions,
      replies,
      loadingReplies,
      onReplySubmit,
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
        {submissions.map(submission => {
          const { submissionId } = submission;
          return <div key={submissionId}>
            <MainPageSubmissionContainer submissionId={submissionId}/>
            <MainPageSubmissionRepliesContainer submissionId={submissionId}/>
          </div>;
        })}
      </ReactCSSTransitionGroup>
    );
  }

}

MainPageSubmissions.propTypes = {
  submissions: PropTypes.array.isRequired,
  toggleShowReplies: PropTypes.func.isRequired,
  showingRepliesSubmissions: PropTypes.object.isRequired,
  replies: PropTypes.object.isRequired,
  loadingReplies: PropTypes.object.isRequired,
  onReplySubmit: PropTypes.func.isRequired,
};

MainPageSubmissions.defaultProps = {

};