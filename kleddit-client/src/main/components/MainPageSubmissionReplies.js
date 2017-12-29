import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, TextField } from 'material-ui';
import { ReplyButton } from '../../submissions/components/ReplyButton';
import moment from 'moment/moment';

const replyContainer = {
  margin: '2px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '1px',
  borderRadius: '4px',
};

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

    };
  }
  getReplyComponent = ({ replyId, content, author, createdAt }, index) => {
    return <div key={replyId}
                style={Object.assign({}, replyContainer, {
                  backgroundColor: index % 2 ? 'rgba(15, 15, 15, 1)' : 'rgba(17, 17, 17, 1)',
                })}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: '2px',
      }}>
        <div style={{ color: 'rgba(190, 190, 190, 0.9)' }}>{author}</div>
        <div style={{ fontSize: '0.75em', color: 'gray', marginLeft: '4px' }}>
          {moment(createdAt).format('LTS')}
        </div>
      </div>
      <div style={{ marginLeft: '4px', width: '100%', padding: '2px' }}>{content}</div>
    </div>;
  };

  onReplyChanged = (event, value) => {
    const {
      onReplyContentChanged,
      submission: { submissionId },
    } = this.props;
    onReplyContentChanged(submissionId, value);
  };

  onReplySubmit = () => {
    const {
      onReplySubmit,
      submission: { submissionId },
    } = this.props;
    return onReplySubmit(submissionId);
  };


  render() {
    const {
      isShowingReplies,
      replies,
      isLoadingReplies,
      inputReply,
      inputReplyError,
    } = this.props;
    const { onReplyChanged, onReplySubmit, getReplyComponent } = this;
    if (!isShowingReplies) return null;

    let loadingElement = null;
    if (isLoadingReplies) {
      loadingElement = <CircularProgress size={32}
                                         style={{ display: 'flex', justifyContent: 'center', width: '100%' }}/>;
    }

    return <div
      style={{ backgroundColor: 'rgb(54, 54, 54)', padding: '4px', margin: '-10px auto auto 6px', width: '90%' }}
      key={2}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <TextField
          hintText={'Reply'}
          multiLine
          style={{ width: '90%', marginBottom: '12px' }}
          onChange={onReplyChanged}
          value={inputReply}
          errorText={inputReplyError}
          onKeyDown={(event) => {
            if (keyCodes[ event.keyCode ] === KEYS.ENTER && !this.shiftPressed) {
              onReplySubmit();
              event.preventDefault();
            }
            this.shiftPressed = keyCodes[ event.keyCode ] === KEYS.SHIFT;
          }}
          onKeyUp={(event) => {
            if (keyCodes[ event.keyCode ] === KEYS.SHIFT) {
              this.shiftPressed = false;
            }
          }}
        />
        <ReplyButton label={'Reply'} primary style={{ margin: '4px' }} onClick={onReplySubmit}/>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {loadingElement}
        {replies.map(getReplyComponent)}
      </div>
    </div>;
  }

}

MainPageSubmissionReplies.propTypes = {
  replies: PropTypes.arrayOf(
    PropTypes.shape({
        replyId: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        createdAt: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
      },
    ),
  ),
  isLoadingReplies: PropTypes.bool,
  onReplyContentChanged: PropTypes.func.isRequired,
  onReplySubmit: PropTypes.func.isRequired,
  inputReply: PropTypes.string,
  inputReplyError: PropTypes.string,
};

MainPageSubmissionReplies.defaultProps = {
  replies: [],
  isLoadingReplies: false,
  inputReply: '',
  inputReplyError: '',
};