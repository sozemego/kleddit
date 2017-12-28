import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CircularProgress} from 'material-ui';

import SubkledditListContainer from './LeftMainPageSidebarContainer';
import * as mainPageActions from '../actions';
import SubmissionFormContainer from './MainPageSubmissionFormContainer';
import SubmissionsContainer from './MainPageSubmissionsContainer';
import {Col, Grid, Row} from 'react-flexbox-grid';
import {isFetchingNextPage, isLeftSidebarShown} from '../selectors';

import './main-page.css';

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
      <Grid className="main-page-container">
        <Row>
          <Col lg={2}>
            <SubkledditListContainer/>
          </Col>
          <Col lg={10}
               className={isLeftSidebarShown ? 'main-page-content-container' : 'main-page-content-container-full'}>
            <Grid>
              <Col lg={12}>
                <SubmissionFormContainer/>
                <SubmissionsContainer/>
                <div style={{minHeight: '64px', display: 'flex', justifyContent: 'center'}}>
                  {isFetchingNextPage ? <CircularProgress style={{minHeight: '60px'}} size={48} thickness={5}/> : null}
                </div>
              </Col>
            </Grid>
          </Col>
        </Row>
      </Grid>
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