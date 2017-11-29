import React, {Component} from 'react';
import {connect} from 'react-redux';
import {navigateToLogin, navigateToMain, navigateToProfile, navigateToRegister} from './actions';

import '../index.css';
import './header.css';
import {isLoggedIn, userRoot} from '../user/state/selectors';
import {logout} from '../user/state/actions';
import {RaisedButton} from 'material-ui';

class HeaderContainer extends Component {

  constructor(props) {
    super(props);
  }

  getButtons = () => {
    const {
      onProfileClicked,
      isLoggedIn,
      onRegisterClicked,
      onLogoutClicked,
      onLoginClicked
    } = this.props;


    const buttonClasses = ['header-button'].join(' ');

    const buttons = [];

    buttons.push(
      <RaisedButton onClick={onProfileClicked}
                    key={1}
                    primary={true}
                    className={buttonClasses}
                    label="Profile"
      />
    );

    buttons.push(
      <RaisedButton onClick={onRegisterClicked}
                    key={2}
                    primary={true}
                    className={buttonClasses}
                    label="Register"
      />
    );

    if (isLoggedIn) {
      buttons.push(
        <RaisedButton onClick={onLogoutClicked}
                      key={3}
                      primary={true}
                      className={buttonClasses}
                      label="Logout"
        />
      );
    } else {
      buttons.push(
        <RaisedButton onClick={onLoginClicked}
                      key={3}
                      primary={true}
                      className={buttonClasses}
                      label="Login"
        />
      );
    }

    return buttons;
  };

  render() {
    const {
      onLogoClicked
    } = this.props;

    const {
      getButtons
    } = this;

    return (
      <div className="header-container">
        <div className="header-section header-invisible">
          A
        </div>
        <div className="header-section header-app-name">
          <div className="link" onClick={onLogoClicked}>KLEDDIT</div>
        </div>
        <div className="header-section header-buttons-container">{getButtons()}</div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  const user = userRoot(state);
  return {
    isLoggedIn: isLoggedIn(user)
  };
};

const dispatchToProps = (dispatch) => {
  return {
    onRegisterClicked: () => {
      dispatch(navigateToRegister());
    },
    onProfileClicked: () => {
      dispatch(navigateToProfile());
    },
    onLogoutClicked: () => {
      dispatch(logout());
    },
    onLoginClicked: () => {
      dispatch(navigateToLogin());
    },
    onLogoClicked: () => {
      dispatch(navigateToMain());
    }
  };
};

export default connect(mapStateToProps, dispatchToProps)(HeaderContainer);