import React, {Component} from 'react';
import {connect} from 'react-redux';

import './login.css';
import {LoginFormComponent} from './LoginFormComponent';
import {
  getLoginError,
  userRoot
} from '../state/selectors';
import {
  onLogin,
  onLoginPasswordChange,
  onLoginUsernameChange
} from '../state/actions';

class LoginFormContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      onLogin,
      loginError,
      onLoginUsernameChange,
      onLoginPasswordChange
    } = this.props;

    return (
      <div className='login-page-container'>
        <LoginFormComponent onSubmit={onLogin}
                            loginError={loginError}
                            onUsernameChange={onLoginUsernameChange}
                            onPasswordChange={onLoginPasswordChange}
        />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  const user = userRoot(state);
  return {
    loginError: getLoginError(user)
  };
};

const dispatchToProps = (dispatch) => {
  return {
    onLogin: (username, password) => {
      dispatch(onLogin(username, password));
    },
    onLoginUsernameChange: (username) => {
      dispatch(onLoginUsernameChange(username));
    },
    onLoginPasswordChange: (password) => {
      dispatch(onLoginPasswordChange(password));
    }
  };
};

export default connect(mapStateToProps, dispatchToProps)(LoginFormContainer);