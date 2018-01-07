import React, { Component } from 'react';
import moment from 'moment/moment';
import PropTypes from 'prop-types';
import { Paper } from 'material-ui';

const styles = {
  container: { margin: '8px 0px 8px 0px', backgroundColor: 'rgba(16, 16, 16, 1)' },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    padding: '2px',
  },
  author: {
    color: 'rgba(190, 190, 190, 0.9)',
  },
  timestamp: {
    color: 'gray',
    marginLeft: '4px',
  },
  content: {
    marginLeft: '4px',
    width: '100%',
    padding: '2px',
  },
};

export class Reply extends Component {

  render() {
    const {
      reply,
    } = this.props;

    const {
      createdAt,
      author,
      content,
    } = reply;

    return (
      <Paper zDepth={1} style={styles.container}>
        <div style={styles.infoContainer}>
          <div style={styles.author}>{author}</div>
          <div style={styles.timestamp}>
            {moment(createdAt).format('LTS')}
          </div>
        </div>
        <div style={styles.content}>{content}</div>
      </Paper>
    );
  }

}

Reply.propTypes = {
  reply: PropTypes.shape({
    replyId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
  }),
};

Reply.defaultProps = {};