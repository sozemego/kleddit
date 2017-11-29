import React, {Component} from 'react';
import {connect} from 'react-redux';

import {SubmissionFormComponent} from './SubmissionFormComponent';
import {getDefaultSubkledditNames} from '../state/selectors';
import * as subkledditActions from '../state/actions';

class SubmissionFormContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      submit,
      subkleddits
    } = this.props;

    return (
      <SubmissionFormComponent onSubmit={submit} subkleddits={subkleddits}/>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    subkleddits: getDefaultSubkledditNames(state),
  }
};


export default connect(mapStateToProps, subkledditActions)(SubmissionFormContainer);
