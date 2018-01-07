import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HeaderContainer from '../header/containers/HeaderContainer';
import ErrorDisplay from '../app/containers/ErrorDisplay';
import RegisterUserContainer from '../user/register/RegisterUserContainer';
import ProfileContainer from '../user/profile/ProfileContainer';
import LoginFormContainer from '../user/login/LoginFormContainer';
import MainPageContainer from '../main/containers/MainPageContainer';
import SubmissionContainer from '../submissions/containers/SubmissionContainer';

const styles = {
  appContainer: {
    height: "100%",
  },
};

export class Kleddit extends Component {

  render() {
    return (
      <Router>
        <div>
          <HeaderContainer/>
          <div style={styles.appContainer}>
            <Route exact path="/register" component={RegisterUserContainer}/>
            <Route exact path="/profile" component={ProfileContainer}/>
            <Route exact path="/login" component={LoginFormContainer}/>
            <Route exact path="/" component={MainPageContainer}/>
            <Route path="/submission/:submissionId" component={SubmissionContainer}/>
            <ErrorDisplay/>
          </div>
        </div>
      </Router>
    );
  }

}