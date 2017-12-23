import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {getShowReplies, getSubmissions} from '../selectors';
import * as mainPageActions from '../actions';
import * as submissionsActions from '../../submissions/actions';

import {MainPageSubmission} from '../components/MainPageSubmission';

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
      showReplies,
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
        {submissions.map((submission, index) => {
          return <MainPageSubmission key={submission.submissionId}
                                     submission={submission}
                                     onDelete={deleteSubmission}
                                     toggleShowReplies={toggleShowReplies}
                                     isShowingReplies={showReplies[submission.submissionId] || false}
          />;
        })}
      </ReactCSSTransitionGroup>
    );
  }

}

MainPageSubmissionsContainer.propTypes = {
  submissions: PropTypes.array.isRequired,
  deleteSubmission: PropTypes.func.isRequired,
  onScrollBottom: PropTypes.func.isRequired,
  toggleShowReplies: PropTypes.func.isRequired,
};

MainPageSubmissionsContainer.defaultProps = {
  submission: [],
};

const mapStateToProps = (state) => {
  return {
    submissions: getSubmissions(state),
    showReplies: getShowReplies(state)
  };
};

export default connect(mapStateToProps, {...mainPageActions, ...submissionsActions})(MainPageSubmissionsContainer);