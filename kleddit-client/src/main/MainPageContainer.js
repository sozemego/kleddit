import React, {Component} from 'react';
import {connect} from 'react-redux';

import './main-page.css';
import SubkledditListContainer from './LeftMainPageSidebar';
import * as mainPageActions from './state/actions';
import SubmissionFormContainer from './MainPageSubmissionFormContainer';
import SubmissionsContainer from './MainPageSubmissionsContainer';
import {Col, Grid, Row} from 'react-flexbox-grid';
import {isLeftSidebarShown} from './state/selectors';

class MainPageContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.init();
  }

  render() {
    const {
      isLeftSidebarShown
    } = this.props;

    return (
      <Grid className="main-page-container">
        <Row>
          <Col lg={2}>
            <SubkledditListContainer />
          </Col>
          <Col lg={10} className={isLeftSidebarShown ? 'main-page-content-container' : 'main-page-content-container-full'}>
            <Grid>
              <Col lg={12}>
                <SubmissionFormContainer />
                <SubmissionsContainer />
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
    isLeftSidebarShown: isLeftSidebarShown(state)
  };
};

export default connect(mapStateToProps, mainPageActions)(MainPageContainer);