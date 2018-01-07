import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LoginFormComponent } from './LoginFormComponent';
import { getLoginError, } from '../state/selectors';
import * as userActions from '../state/actions';


class LoginFormContainer extends Component {

  render() {
    const {
      onLogin,
      onLoginUsernameChange,
      onLoginPasswordChange,
    } = this.props;

    const {
      loginError,
    } = this.props;

    return (
      <LoginFormComponent onSubmit={onLogin}
                          loginError={loginError}
                          onUsernameChange={onLoginUsernameChange}
                          onPasswordChange={onLoginPasswordChange}
      />
    );
  }

}

const mapStateToProps = (state) => {
  return {
    loginError: getLoginError(state),
  };
};

export default connect(mapStateToProps, userActions)(LoginFormContainer);