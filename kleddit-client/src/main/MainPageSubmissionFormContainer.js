import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {MainPageSubmissionFormComponent} from './MainPageSubmissionFormComponent';
import * as subkledditActions from '../subkleddit/state/actions';
import * as subkledditSelectors from '../subkleddit/state/selectors';
import {getSubscribedToSubkleddits} from '../user/state/selectors';

class MainPageSubmissionFormContainer extends Component {

  render() {
    const {
      submit,
      subscribedToSubkleddits,
      validateSubmission,
      submissionErrors
    } = this.props;

    return (
      <MainPageSubmissionFormComponent onSubmit={submit}
                                       subkleddits={subscribedToSubkleddits}
                                       onChange={validateSubmission}
                                       submissionErrors={submissionErrors}
      />
    );
  }

}

MainPageSubmissionFormContainer.propTypes = {
  submit: PropTypes.func.isRequired,
  subscribedToSubkleddits: PropTypes.array.isRequired,
  validateSubmission: PropTypes.func.isRequired,
  submissionErrors: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string
  })
};

const mapStateToProps = (state) => {
  return {
    subscribedToSubkleddits: getSubscribedToSubkleddits(state),
    submissionErrors: subkledditSelectors.getSubmissionErrors(state)
  }
};


export default connect(mapStateToProps, subkledditActions)(MainPageSubmissionFormContainer);
