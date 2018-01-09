import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, TextField } from 'material-ui';
import moment from 'moment/moment';

import { Reply } from '../Reply';
import ReplyTextField from '../../containers/ReplyTextField';

const KEYS = {
  SHIFT: 'SHIFT',
  ENTER: 'ENTER',
};

const keyCodes = {
  13: KEYS.ENTER,
  16: KEYS.SHIFT,
};

const styles = {
  container: {
    margin: '12px',
  },
  topContainer: {
    padding: '12px',
  },
  infoContainer: { fontSize: '0.9em', marginTop: '6px', color: 'gray' },
  content: { border: '1px solid gray', marginTop: '12px', padding: '12px' },
  replyTextFieldContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    margin: '12px 0px 12px 0px',
    padding: '0px 4px 0px 4px',
  }
};

export class Submission extends Component {

  render() {
    const { submission, replies } = this.props;
    const {
      submissionId,
      title,
      createdAt,
      author,
      content,
      subkleddit,
    } = submission;

    return (
      <div style={styles.container}>
        <Paper zDepth={0} style={styles.topContainer}>
          <div>
            {title}
          </div>
          <div style={styles.infoContainer}>
            {moment(createdAt).fromNow()} by {author} in [{subkleddit}]
          </div>
          <div style={styles.content}>
            {content}
          </div>
        </Paper>
        <Paper zDepth={3} style={styles.replyTextFieldContainer}>
          <ReplyTextField submissionId={submissionId}/>
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