import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import MainPageSubmissionContainer from '../../containers/MainPageSubmissionContainer';
import MainPageSubmissionRepliesContainer from '../../containers/MainPageSubmissionRepliesContainer';

import './submission.css';

export class MainPageSubmissions extends Component {

  render() {
    const {
      submissions,
    } = this.props;

    return (
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
};

MainPageSubmissions.defaultProps = {};