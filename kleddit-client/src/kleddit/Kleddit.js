import React, {Component} from 'react';
import HeaderContainer from '../header/HeaderContainer';
import {Route} from 'react-router-dom';
import {HashRouter as Router} from 'react-router-dom';

import ErrorDisplay from '../main/ErrorDisplay';
import {isFetching} from '../main/state/selectors';
import {connect} from 'react-redux';
import RegisterUserContainer from '../user/register/RegisterUserContainer';
import ProfileContainer from '../user/profile/ProfileContainer';
import LoginFormContainer from '../user/login/LoginFormContainer';
import MainPageContainer from '../main/MainPageContainer';

import './kleddit.css';

class Kleddit extends Component {

  /**
   * Test for adding an invisible overlay over
   * the app when fetching, so that users cannot do too many things at once.
   * Turned off right now.
   * @returns {*}
   */
  getOverlay = () => {
    return null;
    const { isFetching } = this.props;
    if (!isFetching) return null;
    return <div className="overlay"/>;
  };

  render() {
    const {getOverlay} = this;
    return (
      <Router>
        <div>
          <HeaderContainer/>
          <div className="app-container">
            <Route exact path="/register" component={RegisterUserContainer}/>
            <Route exact path="/profile" component={ProfileContainer}/>
            <Route exact path="/login" component={LoginFormContainer}/>
            <Route exact path="/" component={MainPageContainer}/>
            <ErrorDisplay/>
            {getOverlay()}
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