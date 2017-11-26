import React, {Component} from 'react';
import {connect} from 'react-redux';
import {navigateToLogin, navigateToMain, navigateToProfile, navigateToRegister} from './actions';
import Button from 'material-ui/Button';

import '../index.css';
import './header.css';
import {isLoggedIn, userRoot} from '../user/state/selectors';
import {logout} from '../user/state/actions';

class HeaderContainer extends Component {

  constructor(props) {
    super(props);
  }

  getButtonClasses = () => {
    return {
      root: 'header-button'
    };
  };

  getButtons = () => {
    const {
      onProfileClicked,
      isLoggedIn,
      onRegisterClicked,
      onLogoutClicked,
      onLoginClicked
    } = this.props;

    const {
      getButtonClasses
    } = this;

    const buttons = [];

    buttons.push(
      <Button onClick={onProfileClicked}
              key={1}
              color="primary"
              raised={true}
              classes={getButtonClasses()}
      >
        Profile
      </Button>
    );

    buttons.push(
      <Button onClick={onRegisterClicked}
              key={2}
              color="primary"
              raised={true}
              classes={getButtonClasses()}
      >
        Register
      </Button>
    );

    if (isLoggedIn) {
      buttons.push(
        <Button onClick={onLogoutClicked}
                key={3}
                color="primary"
                raised={true}
                classes={getButtonClasses()}
        >
          Logout
        </Button>
      );
    } else {
      buttons.push(
        <Button onClick={onLoginClicked}
                key={3}
                color="primary"
                raised={true}
                classes={getButtonClasses()}
        >
          Login
        </Button>
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