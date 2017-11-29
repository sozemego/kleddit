import React, {Component} from 'react';
import {connect} from 'react-redux';

import './main-page.css';
import SubkledditListContainer from './SubkledditListContainer';
import * as mainPageActions from './state/actions';
import SubmissionFormContainer from '../subkleddit/submission/SubmissionFormContainer';

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

export default connect(mapStateToProps, mainPageActions)(MainPageContainer);