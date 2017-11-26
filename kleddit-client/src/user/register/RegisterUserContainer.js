import React, {Component} from 'react';
import {connect} from 'react-redux';
import './register.css';

import {RegisterFormComponent} from './RegisterFormComponent';
import {
  getPasswordRegistrationError,
  getUsernameRegistrationError,
  userRoot
} from '../state/selectors';
import {onRegisterPasswordChange, onRegister, onRegisterUsernameChange} from '../state/actions';

export class RegisterUserContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      onRegister,
      onUsernameChange,
      onPasswordChange,
      usernameRegistrationError,
      passwordRegistrationError
    } = this.props;

    return (
      <div className="register-page-container">
        <RegisterFormComponent onSubmit={onRegister}
                               onUsernameChange={onUsernameChange}
                               onPasswordChange={onPasswordChange}
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
    onRegister: (username, password) => {
      dispatch(onRegister(username, password));
    },
    onUsernameChange: (username) => {
      dispatch(onRegisterUsernameChange(username));
    },
    onPasswordChange: (password) => {
      dispatch(onRegisterPasswordChange(password));
    }
  };
};

export default connect(mapStateToProps, dispatchToProps)(RegisterUserContainer);