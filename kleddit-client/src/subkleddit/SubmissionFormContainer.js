import React, {Component} from 'react';
import {connect} from 'react-redux';

class SubmissionFormContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return [
        <div>If you wish to submit a new post, please do it in the form below</div>,
    ];
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
