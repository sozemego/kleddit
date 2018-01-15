import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';

import {history} from '../navigation/NavigationService';

import HeaderContainer from '../header/containers/HeaderContainer';
import ErrorDisplay from '../app/containers/ErrorDisplay';
import RegisterUserContainer from '../user/register/RegisterUserContainer';
import ProfileContainer from '../user/profile/ProfileContainer';
import LoginFormContainer from '../user/login/LoginFormContainer';
import MainPageContainer from '../main/containers/MainPageContainer';
import SubmissionContainer from '../submissions/containers/SubmissionContainer';

export class Kleddit extends Component {

  render() {
    return (
      <Router history={history}>
        <div>
          <HeaderContainer/>
          <div>
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