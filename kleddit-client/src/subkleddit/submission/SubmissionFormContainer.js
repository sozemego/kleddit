import React, {Component} from 'react';
import {connect} from 'react-redux';

import {SubmissionFormComponent} from './SubmissionFormComponent';
import {getDefaultSubkledditNames, getDefaultSubkleddits} from '../../main/state/selectors';

class SubmissionFormContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      onSubmit,
      subkleddits
    } = this.props;

    return (
      <SubmissionFormComponent onSubmit={onSubmit} subkleddits={subkleddits}/>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    subkleddits: getDefaultSubkledditNames(state),
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: () => {}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionFormContainer);
