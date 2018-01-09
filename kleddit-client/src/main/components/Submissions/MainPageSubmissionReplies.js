import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, TextField } from 'material-ui';
import moment from 'moment/moment';
import MainPageMoreReplies from '../../containers/MainPageMoreReplies';
import { TypingIndicator } from '../../../commons/components/TypingIndicator/TypingIndicator';
import { ReplyIndicator } from '../../../submissions/components/ReplyIndicator';
import ReplyTextField from '../../../submissions/containers/ReplyTextField';

const styles = {
  repliesContainer: {
    backgroundColor: 'rgb(54, 54, 54)',
    padding: '4px',
    marginLeft: '6px',
    marginTop: '-4px',
    width: '90%',
    borderTop: '1px dotted black',
  },
  replyContainer: {
    margin: '2px',
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '2px',
    borderRadius: '4px',
  },
  replyHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    padding: '2px',
  },
  replyHeaderAuthor: {
    color: 'rgba(190, 190, 190, 0.9)',
  },
  replyHeaderTimestamp: {
    color: 'gray',
    marginLeft: '4px',
  },
  replyContent: {
    marginLeft: '4px',
    width: '100%',
    padding: '2px',
  },
  loadingElementStyle: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  replyTextField: {
    width: '100%',
  },
  repliesListContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
};

styles.oddReplyContainer = Object.assign({}, styles.replyContainer, {
  backgroundColor: 'rgba(15, 15, 15, 1)',
});

styles.eventReplyContainer = Object.assign({}, styles.replyContainer, {
  backgroundColor: 'rgba(17, 17, 17, 1)',
});

export class MainPageSubmissionReplies extends Component {

  getReplyComponent = ({ replyId, content, author, createdAt }, index) => {
    return <div key={replyId}
                style={index % 2 ? styles.eventReplyContainer : styles.oddReplyContainer}>
      <div style={styles.replyHeaderContainer}>
        <div style={styles.replyHeaderAuthor}>{author}</div>
        <div style={styles.replyHeaderTimestamp}>
          {moment(createdAt).format('LTS')}
        </div>
      </div>
      <div style={styles.replyContent}>{content}</div>
    </div>;
  };

  render() {
    const {
      isShowingReplies,
      replies,
      isLoadingReplies,
      submissionId,
    } = this.props;

    const {
      getReplyComponent,
    } = this;

    if (!isShowingReplies) return null;

    let loadingElement = null;
    if (isLoadingReplies) {
      loadingElement = <CircularProgress size={32}
                                         style={styles.loadingElementStyle}/>;
    }

    return <div style={styles.repliesContainer} key={2}>
      <ReplyTextField submissionId={submissionId}/>
      <div style={styles.repliesListContainer}>
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
  ).isRequired,
  isShowingReplies: PropTypes.bool,
  isLoadingReplies: PropTypes.bool,
  onReplySubmit: PropTypes.func.isRequired,
  onReplyTextChanged: PropTypes.func.isRequired,
  someoneTypingReply: PropTypes.bool.isRequired,
};

MainPageSubmissionReplies.defaultProps = {
  isLoadingReplies: false,
};