import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'material-ui';
import * as submissionsActions from '../actions';
import { ReplyIndicator } from '../components/ReplyIndicator';
import { isTypingReply } from '../selectors';
import { connect } from 'react-redux';

const styles = {
  container: {
    width: "100%",
  },
  replyTextField: {
    width: '100%',
  },
};

const KEYS = {
  SHIFT: 'SHIFT',
  ENTER: 'ENTER',
};

const keyCodes = {
  13: KEYS.ENTER,
  16: KEYS.SHIFT,
};

class ReplyTextField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      replyText: '',
    };
  }

  onReplyChanged = (event, replyText) => {
    const { onReplyTextChanged, submissionId } = this.props;
    this.setState({ replyText });
    onReplyTextChanged(submissionId);
  };

  onReplySubmit = () => {
    const {
      onReplySubmit,
      submissionId,
    } = this.props;
    const { replyText } = this.state;
    return onReplySubmit(submissionId, replyText).then((replyText = '') => {
      this.setState({ replyText });
    });
  };

  onReplyTextKeyDown = (event) => {
    const { onReplySubmit } = this;
    if (keyCodes[event.keyCode] === KEYS.ENTER && !this.shiftPressed) {
      onReplySubmit();
      event.preventDefault();
    }
    this.shiftPressed = keyCodes[event.keyCode] === KEYS.SHIFT;
  };

  onReplyTextKeyUp = (event) => {
    if (keyCodes[event.keyCode] === KEYS.SHIFT) {
      this.shiftPressed = false;
    }
  };

  render() {
    const { replyText } = this.state;
    const {
      onReplyChanged,
      onReplyTextKeyDown,
      onReplyTextKeyUp,
    } = this;

    const { someoneTypingReply } = this.props;

    return (
      <div style={styles.container}>
        <TextField
          hintText={'Reply'}
          multiLine
          style={styles.replyTextField}
          onChange={onReplyChanged}
          value={replyText}
          onKeyDown={onReplyTextKeyDown}
          onKeyUp={onReplyTextKeyUp}
          name="Reply"
        />
        <ReplyIndicator text={'Someone is typing a reply...'} show={someoneTypingReply}/>
      </div>
    );
  }

}

ReplyTextField.propTypes = {
  submissionId: PropTypes.string.isRequired,
  someoneTypingReply: PropTypes.bool.isRequired,
  onReplyTextChanged: PropTypes.func.isRequired,
  onReplySubmit: PropTypes.func.isRequired,
};

ReplyTextField.defaultProps = {};

const mapStateToProps = (state, {submissionId}) => {
  return {
    someoneTypingReply: isTypingReply(state, submissionId),
  };
};

export default connect(mapStateToProps, submissionsActions)(ReplyTextField);