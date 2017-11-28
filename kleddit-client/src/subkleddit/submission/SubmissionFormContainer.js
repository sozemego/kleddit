import React, {Component} from 'react';
import {connect} from 'react-redux';

import {SubmissionFormComponent} from './SubmissionFormComponent';

class SubmissionFormContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SubmissionFormComponent />
    );
  }

}

const mapStateToProps = (state) => {
  return {

  }
};


const mapDispatchToProps = (dispatch) => {
  return {

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionFormContainer);
