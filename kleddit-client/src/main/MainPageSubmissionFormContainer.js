import React, {Component} from 'react';
import {connect} from 'react-redux';

import {MainPageSubmissionFormComponent} from './MainPageSubmissionFormComponent';
import * as subkledditActions from '../subkleddit/state/actions';
import {getSubscribedToSubkleddits} from '../user/state/selectors';

class MainPageSubmissionFormContainer extends Component {

  render() {
    const {
      submit,
      subscribedToSubkleddits
    } = this.props;

    return (
      <MainPageSubmissionFormComponent onSubmit={submit} subkleddits={subscribedToSubkleddits}/>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    subscribedToSubkleddits: getSubscribedToSubkleddits(state)
  }
};


export default connect(mapStateToProps, subkledditActions)(MainPageSubmissionFormContainer);
