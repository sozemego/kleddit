import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, TextField } from 'material-ui';
import moment from 'moment/moment';

import { Reply } from '../Reply';

const KEYS = {
  SHIFT: 'SHIFT',
  ENTER: 'ENTER',
};

const keyCodes = {
  13: KEYS.ENTER,
  16: KEYS.SHIFT,
};

export class Submission extends Component {

  constructor(props) {
    super(props);
    this.state = {
      replyText: '',
    };
  }

  onReplyChanged = (event, replyText) => {
    this.setState({ replyText });
  };

  onReplySubmit = () => {
    const {
      onReplySubmit,
      submission: { submissionId },
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
    const {
      onReplyChanged,
      onReplyTextKeyDown,
      onReplyTextKeyUp,
    } = this;
    const { replyText } = this.state;
    const { submission, replies } = this.props;
    const {
      title,
      createdAt,
      author,
      content,
      subkleddit,
    } = submission;

    return (
      <div style={{ margin: '12px' }}>
        <Paper zDepth={0} style={{ padding: '12px' }}>
          <div>
            {title}
          </div>
          <div style={{ fontSize: '0.9em', marginTop: '6px', color: 'gray' }}>
            {moment(createdAt).fromNow()} by {author} in [{subkleddit}]
          </div>
          <div style={{ border: '1px solid gray', marginTop: '12px', padding: '12px' }}>
            {content}
          </div>
        </Paper>
        <Paper zDepth={3} style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          margin: '12px 0px 12px 0px',
          padding: '0px 4px 0px 4px',
        }}>
          <TextField
            underlineShow={false}
            hintText={'Reply'}
            multiLine
            style={{ width: '100%' }}
            onChange={onReplyChanged}
            value={replyText}
            onKeyDown={onReplyTextKeyDown}
            onKeyUp={onReplyTextKeyUp}
          />
        </Paper>
        <div>
          {replies.map(reply => <Reply reply={reply} key={reply.replyId}/>)}
        </div>
      </div>
    );
  }

}

Submission.propTypes = {
  submission: PropTypes.shape({
    submissionId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    replyCount: PropTypes.number.isRequired,
  }).isRequired,
  replies: PropTypes.arrayOf(
    PropTypes.shape({
      replyId: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      createdAt: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onReplySubmit: PropTypes.func.isRequired,
};

Submission.defaultProps = {};