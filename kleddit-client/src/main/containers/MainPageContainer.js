import React, {Component} from 'react';
import {connect} from 'react-redux';

import SubkledditListContainer from './LeftMainPageSidebarContainer';
import * as mainPageActions from '../actions';
import SubmissionFormContainer from './MainPageSubmissionFormContainer';
import SubmissionsContainer from './MainPageSubmissionsContainer';
import {Col, Grid, Row} from 'react-flexbox-grid';
import {isFetchingNextPage, isLeftSidebarShown} from '../selectors';

import '../components/main-page.css'; //TODO MOVE THIS
import {MainPageGrid} from '../components/MainPageGrid';
import {MainPageContentColumn} from '../components/MainPageContentColumn';
import {MainPageLoadingIndicator} from '../components/MainPageLoadingIndicator';

class MainPageContainer extends Component {

  componentWillMount() {
    this.props.init();
  }

  render() {
    const {
      isLeftSidebarShown,
      isFetchingNextPage,
    } = this.props;

    return (
      <MainPageGrid>
        <Row>
          <Col lg={2}>
            <SubkledditListContainer/>
          </Col>
          <MainPageContentColumn isLeftSidebarShown={isLeftSidebarShown} >
            <Grid>
              <Col lg={12}>
                <SubmissionFormContainer/>
                <SubmissionsContainer/>
                <MainPageLoadingIndicator isFetchingNextPage={isFetchingNextPage}/>
              </Col>
            </Grid>
          </MainPageContentColumn>
        </Row>
      </MainPageGrid>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    isLeftSidebarShown: isLeftSidebarShown(state),
    isFetchingNextPage: isFetchingNextPage(state),
  };
};

export default connect(mapStateToProps, mainPageActions)(MainPageContainer);