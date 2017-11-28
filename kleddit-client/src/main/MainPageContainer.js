import React, {Component} from 'react';
import {connect} from 'react-redux';

import './main-page.css';
import SubkledditListContainer from './SubkledditListContainer';
import * as mainPageActions from './state/actions';
import SubmissionFormContainer from '../subkleddit/submission/SubmissionFormContainer';
import {bindActionCreators} from 'redux';

class MainPageContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.actions.init();
  }

  render() {
    return (
      <div className="main-page-container">
        <SubkledditListContainer />
        <div className="main-page-submission-form-container">
          <SubmissionFormContainer />
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(mainPageActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPageContainer);