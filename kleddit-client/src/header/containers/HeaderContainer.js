import React, { Component } from 'react';
import { connect } from 'react-redux';

import { isLoggedIn } from '../../user/state/selectors';
import * as userActions from '../../user/state/actions';
import * as headerActions from '../actions';
import { RaisedButton } from 'material-ui';

import '../../index.css';
import { Header } from '../components/Header';
import { isFetching } from '../../app/selectors';
import { getCurrentSubmission } from '../../submissions/selectors';

class HeaderContainer extends Component {

  getButtons = () => {
    const {
      navigateToProfile,
      isLoggedIn,
      navigateToRegister,
      headerLogout,
      navigateToLogin,
    } = this.props;

    const buttonClasses = ['header-button'].join(' ');

    const buttons = [];

    buttons.push(
      <RaisedButton onClick={navigateToProfile}
                    key={1}
                    primary={true}
                    className={buttonClasses}
                    label="Profile"
      />,
    );

    buttons.push(
      <RaisedButton onClick={navigateToRegister}
                    key={2}
                    primary={true}
                    className={buttonClasses}
                    label="Register"
      />,
    );

    if (isLoggedIn) {
      buttons.push(
        <RaisedButton onClick={headerLogout}
                      key={3}
                      primary={true}
                      className={buttonClasses}
                      label="Logout"
        />,
      );
    } else {
      buttons.push(
        <RaisedButton onClick={navigateToLogin}
                      key={3}
                      primary={true}
                      className={buttonClasses}
                      label="Login"
        />,
      );
    }

    return buttons;
  };

  getLeftButtons = () => {

    const buttons = [];

    const {
      submission,
      navigateToMain
    } = this.props;

    if(submission) {
      buttons.push(
        <RaisedButton onClick={navigateToMain}
                      key={1}
                      primary={true}
                      style={{fontSize: "0.8em"}}
                      label="Back to main page"
        />
      )
    }

    return buttons;
  };

  render() {
    const {
      navigateToMain,
      isFetching,
    } = this.props;

    const {
      getButtons,
      getLeftButtons,
    } = this;

    return (
      <Header buttons={getButtons()}
              leftButtons={getLeftButtons()}
              isFetching={isFetching}
              navigateToMain={navigateToMain}
      />
    );
  }

}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: isLoggedIn(state),
    isFetching: isFetching(state),
    submission: getCurrentSubmission(state),
  };
};

export default connect(mapStateToProps, { ...headerActions, ...userActions })(HeaderContainer);