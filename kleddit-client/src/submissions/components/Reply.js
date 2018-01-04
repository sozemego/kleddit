import React, { Component } from 'react';
import moment from 'moment/moment';
import PropTypes from 'prop-types';
import { Paper } from 'material-ui';

export class Reply extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      reply,
    } = this.props;

    const {
      replyId,
      createdAt,
      author,
      content,
    } = reply;

    return (
      <Paper zDepth={1} style={{margin: "8px 0px 8px 0px", backgroundColor: 'rgba(16, 16, 16, 1)'}}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          width: '100%',
          padding: '2px',
        }}>
          <div style={{ color: 'rgba(190, 190, 190, 0.9)' }}>{author}</div>
          <div style={{ color: 'gray', marginLeft: '4px' }}>
            {moment(createdAt).format('LTS')}
          </div>
        </div>
        <div style={{ marginLeft: '4px', width: '100%', padding: '2px' }}>{content}</div>
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