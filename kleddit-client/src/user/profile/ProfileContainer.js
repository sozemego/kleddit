import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';

import './profile.css';
import { getUsername, isLoggedIn } from '../state/selectors';
import * as userActions from '../state/actions';
import { RaisedButton } from 'material-ui';


class ProfileContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      deleteConfirmationOpen: false,
    };
  }

  getDeleteComponents = () => {
    const {
      isLoggedIn,
    } = this.props;

    if (!isLoggedIn) {
      return null;
    }

    const {
      onDeleteClicked,
      onDeleteConfirmationClose,
      getDeleteDialogChildren,
      getDeleteConfirmationDialogActions,
    } = this;

    const {
      deleteConfirmationOpen,
    } = this.state;

    return <div className="profile-delete-section">
      <RaisedButton onClick={onDeleteClicked}
                    label="Delete account"
      />
      <Dialog open={deleteConfirmationOpen}
              title="Confirm account deletion"
              onRequestClose={onDeleteConfirmationClose}
              children={getDeleteDialogChildren()}
              actions={getDeleteConfirmationDialogActions()}
      />
    </div>;
  };

  onDeleteClicked = () => {
    this.setState({ deleteConfirmationOpen: true });
  };

  onDeleteConfirmationClose = () => {
    this.setState({ deleteConfirmationOpen: false });
  };

  getDeleteConfirmationDialogActions = () => {
    const {
      onDeleteConfirmationClose,
    } = this;

    const {
      deleteUser,
    } = this.props;


    return [
      <RaisedButton key="A"
                    onClick={onDeleteConfirmationClose}
                    primary={true}
                    className="profile-delete-dialog-button"
                    label="Cancel"
      />,
      <RaisedButton key="B"
                    onClick={() => {
                      deleteUser();
                      onDeleteConfirmationClose();
                    }}
                    primary={false}
                    className="profile-delete-dialog-button"
                    label="Confirm"
      />,
    ];
  };

  getDeleteDialogChildren = () => {
    return this.getDeleteConfirmationContent();
  };

  getDeleteConfirmationContent = () => {
    return <div className="profile-delete-dialog-content">
      This action will delete your account. Deleting your account is not reversible.
    </div>;
  };

  render() {
    const {
      username,
    } = this.props;

    const {
      getDeleteComponents,
    } = this;

    return (
      <div className="profile-container">
        <div className="profile-welcome">Welcome, {username ? username : 'Anonymous'}.</div>
        {getDeleteComponents()}
      </div>
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

