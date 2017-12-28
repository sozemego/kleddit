import React, {Component} from 'react';
import {connect} from 'react-redux';

import {isLoggedIn} from '../../user/state/selectors';
import * as userActions from '../../user/state/actions';
import * as headerActions from '../actions';
import {RaisedButton} from 'material-ui';
import {isFetching} from '../../main/selectors';

import '../../index.css';
import {Header} from '../components/Header';

class HeaderContainer extends Component {

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
      <Header buttons={getButtons()}
              isFetching={isFetching}
              navigateToMain={navigateToMain}
      />
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