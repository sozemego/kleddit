import React, { Component } from 'react';
import { Dialog, RaisedButton } from 'material-ui';
import PropTypes from 'prop-types';

const styles = {
  profileDeleteSection: {
    display: 'flex',
  },
  profileDeleteDialogContent: {
    padding: '12px',
  },
  profileDeleteDialogButton: {
    margin: '0px 6px',
  },
};

export class ProfileDeleteSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deleteConfirmationOpen: false,
    };
  }

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
                    style={styles.profileDeleteDialogButton}
                    label="Cancel"
      />,
      <RaisedButton key="B"
                    onClick={() => {
                      deleteUser();
                      onDeleteConfirmationClose();
                    }}
                    primary={false}
                    style={styles.profileDeleteDialogButton}
                    label="Confirm"
      />,
    ];
  };

  getDeleteDialogChildren = () => {
    return this.getDeleteConfirmationContent();
  };

  getDeleteConfirmationContent = () => {
    return <div style={styles.profileDeleteDialogContent}>
      This action will delete your account. Deleting your account is not reversible.
    </div>;
  };

  onDeleteClicked = () => {
    this.setState({ deleteConfirmationOpen: true });
  };

  onDeleteConfirmationClose = () => {
    this.setState({ deleteConfirmationOpen: false });
  };

  render() {
    const {
      onDeleteClicked,
      onDeleteConfirmationClose,
      getDeleteDialogChildren,
      getDeleteConfirmationDialogActions,
    } = this;

    const {
      deleteConfirmationOpen,
    } = this.state;

    return <div style={styles.profileDeleteSection}>
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
  }

}

ProfileDeleteSection.propTypes = {
  deleteUser: PropTypes.func.isRequired,
};

ProfileDeleteSection.defaultProps = {};