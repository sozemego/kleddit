import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {HashRouter as Router} from 'react-router-dom';
import {connect} from 'react-redux';

import HeaderContainer from '../header/containers/HeaderContainer';
import ErrorDisplay from '../main/containers/ErrorDisplay';
import {isFetching} from '../main/selectors';
import RegisterUserContainer from '../user/register/RegisterUserContainer';
import ProfileContainer from '../user/profile/ProfileContainer';
import LoginFormContainer from '../user/login/LoginFormContainer';
import MainPageContainer from '../main/containers/MainPageContainer';

import styles from './kleddit.css';

class Kleddit extends Component {

  render() {
    return (
      <Router>
        <div>
          <HeaderContainer/>
          <div className={styles['app-container']}>
            <Route exact path="/register" component={RegisterUserContainer}/>
            <Route exact path="/profile" component={ProfileContainer}/>
            <Route exact path="/login" component={LoginFormContainer}/>
            <Route exact path="/" component={MainPageContainer}/>
            <ErrorDisplay/>
          </div>
        </div>
      </Router>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    isFetching: isFetching(state)
  };
};

export default connect(mapStateToProps, null)(Kleddit);