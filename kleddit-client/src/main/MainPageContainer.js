import React, {Component} from 'react';
import {connect} from 'react-redux';

import './main-page.css';
import SubkledditListContainer from './LeftMainPageSidebar';
import * as mainPageActions from './state/actions';
import SubmissionFormContainer from './MainPageSubmissionFormContainer';
import SubmissionsContainer from './MainPageSubmissionsContainer';
import {Col, Grid, Row} from 'react-flexbox-grid';

class MainPageContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.init();
  }

  render() {
    return (
      <Grid className="main-page-container">
        <Row>
          <Col lg={2}>
            <SubkledditListContainer />
          </Col>
          <Col lg={10}>
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

  };
};

export default connect(mapStateToProps, mainPageActions)(MainPageContainer);