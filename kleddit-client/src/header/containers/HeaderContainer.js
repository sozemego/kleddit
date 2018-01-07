import React, { Component } from 'react';
import { connect } from 'react-redux';

import { isLoggedIn } from '../../user/state/selectors';
import * as userActions from '../../user/state/actions';
import * as headerActions from '../actions';
import { RaisedButton } from 'material-ui';

import { Header } from '../components/Header';
import { isFetching } from '../../app/selectors';
import { getCurrentSubmission } from '../../submissions/selectors';
import { HeaderButton } from '../components/HeaderButton';
import { Route } from 'react-router-dom';

class HeaderContainer extends Component {

  getButtons = () => {
    const {
      navigateToProfile,
      isLoggedIn,
      navigateToRegister,
      headerLogout,
      navigateToLogin,
    } = this.props;

    const buttons = [];

    buttons.push(
      <HeaderButton onClick={navigateToProfile}
                    key={1}
                    label="Profile"
      />,
    );

    buttons.push(
      <HeaderButton onClick={navigateToRegister}
                    key={2}
                    label="Register"
      />,
    );

    if (isLoggedIn) {
      buttons.push(
        <HeaderButton onClick={headerLogout}
                      key={3}
                      label="Logout"
        />,
      );
    } else {
      buttons.push(
        <HeaderButton onClick={navigateToLogin}
                      key={3}
                      label="Login"
        />,
      );
    }

    return buttons;
  };

  getLeftButtons = () => {
    const {
      navigateToMain
    } = this.props;

    return <Route path="/submission/:submissionId" component={() => {
      return <HeaderButton onClick={navigateToMain}
                    key={1}
                    label="Back to main page"/>;
    }}/>;
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