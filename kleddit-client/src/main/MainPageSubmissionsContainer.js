import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getSubmissions} from '../subkleddit/state/selectors';
import * as subkledditActions from '../subkleddit/state/actions';
import {MainPageSubmission} from './MainPageSubmission';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class MainPageSubmissionsContainer extends Component {

  render() {
    const {
      submissions,
      deleteSubmission
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
          return <MainPageSubmission key={submission.submissionId} submission={submission}
                                     onDelete={deleteSubmission}/>;
        })}
      </ReactCSSTransitionGroup>
    );
  }

}

MainPageSubmissionsContainer.propTypes = {
  submissions: PropTypes.array.isRequired,
  deleteSubmission: PropTypes.func.isRequired
};

MainPageSubmissionsContainer.defaultProps = {
  submission: []
};

const mapStateToProps = (state) => {
  return {
    submissions: getSubmissions(state)
  };
};

export default connect(mapStateToProps, subkledditActions)(MainPageSubmissionsContainer);