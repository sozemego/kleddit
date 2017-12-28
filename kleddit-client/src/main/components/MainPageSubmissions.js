import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {MainPageSubmission} from './MainPageSubmission';

export class MainPageSubmissions extends Component {

  render() {
    const {
      submissions,
      deleteSubmission,
      toggleShowReplies,
      showingRepliesSubmissions,
      replies,
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
          return <MainPageSubmission key={submission.submissionId}
                                     submission={submission}
                                     onDelete={deleteSubmission}
                                     toggleShowReplies={toggleShowReplies}
                                     isShowingReplies={showingRepliesSubmissions[submission.submissionId] || false}
                                     replies={replies[submission.submissionId] || []}
          />;
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
};

MainPageSubmissions.defaultProps = {

};