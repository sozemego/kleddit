import React, {Component} from 'react';
import {connect} from 'react-redux';

import {SubmissionFormComponent} from './SubmissionFormComponent';
import {getDefaultSubkledditNames} from '../state/selectors';
import * as subkledditActions from '../state/actions';
import {getSubscribedToSubkleddits} from '../../user/state/selectors';

class SubmissionFormContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      submit,
      subscribedToSubkleddits
    } = this.props;

    return (
      <SubmissionFormComponent onSubmit={submit} subkleddits={subscribedToSubkleddits}/>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    subscribedToSubkleddits: getSubscribedToSubkleddits(state)
  }
};


export default connect(mapStateToProps, subkledditActions)(SubmissionFormContainer);
