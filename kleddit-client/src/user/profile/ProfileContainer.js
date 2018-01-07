import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUsername, isLoggedIn } from '../state/selectors';
import * as userActions from '../state/actions';
import { Profile } from './Profile';

class ProfileContainer extends Component {

  render() {
    const {
      username,
      deleteUser,
    } = this.props;

    return (
      <Profile username={username} deleteUser={deleteUser}/>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    username: getUsername(state),
    isLoggedIn: isLoggedIn(state),
  };
};

export default connect(mapStateToProps, userActions)(ProfileContainer);

