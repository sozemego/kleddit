import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, TextField } from 'material-ui';
import moment from 'moment/moment';
import MainPageMoreReplies from '../../containers/MainPageMoreReplies';

const replyContainer = {
  margin: '2px',
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '2px',
  borderRadius: '4px',
};

const oddReplyContainer = Object.assign({}, replyContainer, {
  backgroundColor: 'rgba(15, 15, 15, 1)',
});

const eventReplyContainer = Object.assign({}, replyContainer, {
  backgroundColor: 'rgba(17, 17, 17, 1)',
});

const KEYS = {
  SHIFT: 'SHIFT',
  ENTER: 'ENTER',
};

const keyCodes = {
  13: KEYS.ENTER,
  16: KEYS.SHIFT,
};

export class MainPageSubmissionReplies extends Component {

  constructor(props) {
    super(props);
    this.state = {
      replyText: '',
    };
  }

  getReplyComponent = ({ replyId, content, author, createdAt }, index) => {
    return <div key={replyId}
                style={index % 2 ? eventReplyContainer : oddReplyContainer}>
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
    </div>;
  };

  onReplyChanged = (event, replyText) => {
    this.setState({ replyText });
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
    const {
      isShowingReplies,
      replies,
      isLoadingReplies,
      submissionId,
    } = this.props;

    const {
      replyText,
    } = this.state;

    const {
      onReplyChanged,
      getReplyComponent,
      onReplyTextKeyDown,
      onReplyTextKeyUp,
    } = this;

    if (!isShowingReplies) return null;

    let loadingElement = null;
    if (isLoadingReplies) {
      loadingElement = <CircularProgress size={32}
                                         style={{ display: 'flex', justifyContent: 'center', width: '100%' }}/>;
    }

    return <div
      style={{
        backgroundColor: 'rgb(54, 54, 54)',
        padding: '4px',
        marginLeft: '6px',
        marginTop: '-4px',
        width: '90%',
        borderTop: '1px dotted black',
      }}
      key={2}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <TextField
          hintText={'Reply'}
          multiLine
          style={{ width: '100%' }}
          onChange={onReplyChanged}
          value={replyText}
          onKeyDown={onReplyTextKeyDown}
          onKeyUp={onReplyTextKeyUp}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {loadingElement}
        {replies.map(getReplyComponent)}
        <MainPageMoreReplies submissionId={submissionId}/>
      </div>
    </div>;
  }

}

MainPageSubmissionReplies.propTypes = {
  submissionId: PropTypes.string.isRequired,
  replies: PropTypes.arrayOf(
    PropTypes.shape({
        replyId: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        createdAt: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
      },
    ),
  ),
  isShowingReplies: PropTypes.bool,
  isLoadingReplies: PropTypes.bool,
  onReplySubmit: PropTypes.func.isRequired,
};

MainPageSubmissionReplies.defaultProps = {
  replies: [],
  isLoadingReplies: false,
};