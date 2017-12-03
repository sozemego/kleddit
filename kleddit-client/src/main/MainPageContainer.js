import React, {Component} from 'react';
import {connect} from 'react-redux';

import './main-page.css';
import SubkledditListContainer from './SubkledditListContainer';
import * as mainPageActions from './state/actions';
import SubmissionFormContainer from '../subkleddit/submission/SubmissionFormContainer';
import SubmissionsContainer from '../subkleddit/submission/SubmissionsContainer';

class MainPageContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.init();
  }

  render() {
    return (
      <div className="main-page-container">
        <div className="main-page-subkleddit-list-container">
          <SubkledditListContainer />
        </div>
        <div className="main-page-content-container">
          <div className="main-page-submission-form-container">
            <SubmissionFormContainer />
          </div>
          <div className="main-page-submissions-container">
            <SubmissionsContainer />
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps, mainPageActions)(MainPageContainer);