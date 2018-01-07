import React, { Component } from 'react';
import { connect } from 'react-redux';

import LeftMainPageSidebarContainer from './LeftMainPageSidebarContainer';
import * as mainPageActions from '../actions';
import SubmissionFormContainer from './MainPageSubmissionFormContainer';
import MainPageSubmissionsContainer from './MainPageSubmissionsContainer';
import { isFetchingNextPage } from '../selectors';
import { MainPageLoadingIndicator } from '../components/MainPageLoadingIndicator';

class MainPageContainer extends Component {

  componentWillMount() {
    this.props.init();
  }

  render() {
    const {
      isFetchingNextPage,
    } = this.props;

    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div>
          <LeftMainPageSidebarContainer/>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '84%' }}>
          <SubmissionFormContainer/>
          <MainPageSubmissionsContainer/>
          <MainPageLoadingIndicator isFetchingNextPage={isFetchingNextPage}/>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    isFetchingNextPage: isFetchingNextPage(state),
  };
};

export default connect(mapStateToProps, mainPageActions)(MainPageContainer);