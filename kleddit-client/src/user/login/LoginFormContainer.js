import React, {Component} from 'react';
import {connect} from 'react-redux';

import './login.css';
import {LoginFormComponent} from './LoginFormComponent';
import {
  getLoginError,
  userRoot
} from '../state/selectors';
import * as userActions from '../state/actions';
import {bindActionCreators} from 'redux';

class LoginFormContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      onLogin,
      onLoginUsernameChange,
      onLoginPasswordChange
    } = this.props.actions;

    const {
      loginError
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
    actions: bindActionCreators(userActions, dispatch)
  };
};

export default connect(mapStateToProps, dispatchToProps)(LoginFormContainer);