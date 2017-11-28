import React, {Component} from 'react';
import {connect} from 'react-redux';
import './register.css';

import {RegisterFormComponent} from './RegisterFormComponent';
import {
  getPasswordRegistrationError,
  getUsernameRegistrationError,
  userRoot
} from '../state/selectors';

import * as userActions from '../state/actions';
import {bindActionCreators} from 'redux';

export class RegisterUserContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      onRegister,
      onRegisterUsernameChange,
      onRegisterPasswordChange,
    } = this.props.actions;

    const {
      usernameRegistrationError,
      passwordRegistrationError
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
  const user = userRoot(state);
  return {
    usernameRegistrationError: getUsernameRegistrationError(user),
    passwordRegistrationError: getPasswordRegistrationError(user)
  };
};

const dispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
};

export default connect(mapStateToProps, dispatchToProps)(RegisterUserContainer);