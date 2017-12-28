import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {getShowingRepliesSubmissions, getSubmissions} from '../selectors';
import * as mainPageActions from '../actions';
import * as submissionsActions from '../../submissions/actions';

import {MainPageSubmission} from '../components/MainPageSubmission';
import {MainPageSubmissions} from '../components/MainPageSubmissions';

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
    } = this.props;

    return (
      <MainPageSubmissions submissions={submissions}
                           deleteSubmission={deleteSubmission}
                           toggleShowReplies={toggleShowReplies}
                           showingRepliesSubmissions={showingRepliesSubmissions}
      />
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
    showingRepliesSubmissions: getShowingRepliesSubmissions(state)
  };
};

export default connect(mapStateToProps, {...mainPageActions, ...submissionsActions})(MainPageSubmissionsContainer);