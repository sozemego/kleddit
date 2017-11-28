import React, {Component} from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import {bindActionCreators} from 'redux';

import './profile.css';
import {getUsername, isLoggedIn, userRoot} from '../state/selectors';
import * as userActions from '../state/actions';


class ProfileContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      deleteConfirmationOpen: false
    };
  }

  getDeleteComponents = () => {
    const {
      isLoggedIn
    } = this.props;

    if (!isLoggedIn) {
      return null;
    }

    const {
      onDeleteClicked,
      onDeleteConfirmationClose,
      getDeleteDialogChildren
    } = this;

    const {
      deleteConfirmationOpen
    } = this.state;

    return <div className="profile-delete-section">
      <Button onClick={onDeleteClicked}
              raised={true}>
        Delete account
      </Button>
      <Dialog open={deleteConfirmationOpen}
              title="Confirm account deletion"
              onRequestClose={onDeleteConfirmationClose}
              children={getDeleteDialogChildren()}
      />
    </div>;
  };

  onDeleteClicked = () => {
    this.setState({deleteConfirmationOpen: true});
  };

  onDeleteConfirmationClose = () => {
    this.setState({deleteConfirmationOpen: false});
  };

  getDeleteDialogTitle = () => {
    return [
      <div key="A">Delete account</div>,
      <Divider key="B" light={true}/>
    ];
  };

  getDeleteConfirmationDialogActions = () => {
    const {
      onDeleteConfirmationClose
    } = this;

    const {
      deleteUser
    } = this.props.actions;

    return [
      <Button key="A"
              onClick={onDeleteConfirmationClose}
              raised={true}
              color="primary"
              className="profile-delete-dialog-button"
      >
        Cancel
      </Button>,
      <Button key="B"
              onClick={() => {
                deleteUser();
                onDeleteConfirmationClose();
              }}
              raised={true}
              color="accent"
              className="profile-delete-dialog-button"
      >
        Confirm
      </Button>
    ];
  };

  getDeleteDialogChildren = () => {
    const {
      getDeleteDialogTitle,
      getDeleteConfirmationContent,
      getDeleteConfirmationDialogActions
    } = this;

    return <div>
      <div className="profile-delete-dialog-title">{getDeleteDialogTitle()}</div>
      <Divider className="profile-delete-dialog-divider"/>
      {getDeleteConfirmationContent()}
      <div className="profile-delete-confirmation-actions-container">
        {getDeleteConfirmationDialogActions()}
      </div>
    </div>;
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
      getDeleteComponents
    } = this;

    return (
      <div className="profile-container">
        <div className="profile-welcome">Welcome, {username ? username : "Anonymous"}.</div>
        {getDeleteComponents()}
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  const user = userRoot(state);
  return {
    username: getUsername(user),
    isLoggedIn: isLoggedIn(user)
  };
};

const dispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
};

export default connect(mapStateToProps, dispatchToProps)(ProfileContainer);

