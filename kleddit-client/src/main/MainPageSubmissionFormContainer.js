import React, {Component} from 'react';
import {connect} from 'react-redux';

import {MainPageSubmissionFormComponent} from './MainPageSubmissionFormComponent';
import {getDefaultSubkledditNames} from '../subkleddit/state/selectors';
import * as subkledditActions from '../subkleddit/state/actions';
import {getSubscribedToSubkleddits} from '../user/state/selectors';

class MainPageSubmissionFormContainer extends Component {

  constructor(props) {
    super(props);
  }

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
