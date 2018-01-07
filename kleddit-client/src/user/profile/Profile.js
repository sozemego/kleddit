import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ProfileDeleteSection } from './ProfileDeleteSection';

const styles = {
  profileContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    paddingTop: '10px',
  },
  profileWelcome: {
    display: 'flex',
    justifyContent: 'center',
  },
  profileDeleteSection: {
    display: 'flex',
  },
  profileDeleteConfirmationActionsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '6px 0px',
  },
  profileDeleteDialogTitle: {
    fontSize: '1.5rem',
    backgroundColor: 'black',
    display: 'flex',
    padding: '3px 6px',
    justifyContent: 'center',
  },
  profileDeleteDialogContent: {
    padding: '12px',
  },
  profileDeleteDialogDivider: {
    width: '100%',
  },
  profileDeleteDialogButton: {
    margin: '0px 6px',
  },
};

export class Profile extends Component {

  render() {
    const {
      username,
      deleteUser,
    } = this.props;

    return (
      <div style={styles.profileContainer}>
        <div style={styles.profileWelcome}>Welcome, {username ? username : 'Anonymous'}.</div>
        <ProfileDeleteSection deleteUser={deleteUser}/>
      </div>
    );
  }

}

Profile.propTypes = {
  username: PropTypes.string.isRequired,
  deleteUser: PropTypes.func.isRequired,
};

Profile.defaultProps = {};