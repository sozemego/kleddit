import React, { Component } from 'react';
import { connect } from 'react-redux';
import './register.css';

import { RegisterFormComponent } from './RegisterFormComponent';
import { getPasswordRegistrationError, getUsernameRegistrationError, } from '../state/selectors';

import * as userActions from '../state/actions';

export class RegisterUserContainer extends Component {

  render() {
    const {
      onRegister,
      onRegisterUsernameChange,
      onRegisterPasswordChange,
    } = this.props;

    const {
      usernameRegistrationError,
      passwordRegistrationError,
    } = this.props;

    return (
      <div className="register-page-container">
        <RegisterFormComponent onSubmit={onRegister}
                               onUsernameChange={onRegisterUsernameChange}
                               onPasswordChange={onRegisterPasswordChange}
                               usernameRegistrationError={usernameRegistrationError}
                               passwordRegistrationError={passwordRegistrationError}
        />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    usernameRegistrationError: getUsernameRegistrationError(state),
    passwordRegistrationError: getPasswordRegistrationError(state),
  };
};

export default connect(mapStateToProps, userActions)(RegisterUserContainer);