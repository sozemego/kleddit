import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../index.css';
import './header.css';
import {isLoggedIn} from '../user/state/selectors';
import * as userActions from '../user/state/actions';
import * as headerActions from './actions';
import {LinearProgress, RaisedButton} from 'material-ui';
import {isFetching} from '../main/state/selectors';

class HeaderContainer extends Component {

  constructor(props) {
    super(props);
  }

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
      />
    );

    buttons.push(
      <RaisedButton onClick={navigateToRegister}
                    key={2}
                    primary={true}
                    className={buttonClasses}
                    label="Register"
      />
    );

    if (isLoggedIn) {
      buttons.push(
        <RaisedButton onClick={headerLogout}
                      key={3}
                      primary={true}
                      className={buttonClasses}
                      label="Logout"
        />
      );
    } else {
      buttons.push(
        <RaisedButton onClick={navigateToLogin}
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
      navigateToMain,
      isFetching
    } = this.props;

    const {
      getButtons
    } = this;

    return (
      <div style={{display: "flex", flexDirection: "column", borderBottom: "1px solid white"}}>
        <div className="header-container">
          <div className="header-section header-invisible">
            A
          </div>
          <div className="header-section header-app-name">
            <div className="link" onClick={navigateToMain}>KLEDDIT</div>
          </div>
          <div className="header-section header-buttons-container">{getButtons()}</div>
        </div>
        <LinearProgress mode="indeterminate" style={isFetching ? {}: {visibility: "hidden"}}/>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: isLoggedIn(state),
    isFetching: isFetching(state)
  };
};

export default connect(mapStateToProps, {...headerActions, ...userActions})(HeaderContainer);