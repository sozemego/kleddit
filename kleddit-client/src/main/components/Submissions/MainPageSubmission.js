import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Divider, Paper } from 'material-ui';
import CommunicationChat from 'material-ui/svg-icons/communication/chat';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ReplyCount from '../../../submissions/components/ReplyCount';
import StylelessLink from '../../../app/components/StylelessLink';
import './submission.css';

const styles = {
  submissionContainer: {
    margin: '4px',
    padding: '4px',
  },
  replyIconStyle: {
    marginTop: '2px',
  },
  submissionHeaderContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  submissionTitle: {
    fontSize: '1.1em',
  },
  submissionSubkleddit: {
    opacity: '0.45',
    fontSize: '0.75em',
  },
  submissionIconContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  submissionAuthor: {
    opacity: '0.45',
    fontSize: '0.75em',
  },
  replyCount: {
    fontSize: '0.85em',
    padding: '2px 0 2px 0',
  },
  submissionContent: {
    backgroundColor: 'rgba(127, 127, 127, 0.5)',
    margin: '6px 6px',
    wordBreak: 'break-all',
    padding: '4px',
  },
};

styles.submissionIconContainerInvisible = Object.assign({}, styles.submissionIconContainer, {
  visibility: 'hidden',
});


const iconColor = '#424255';

export class MainPageSubmission extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deleteIconHover: false,
      replyIconHover: false,
      hover: false,
      submission: props.submission, //for css transitions
    };
    this.shiftPressed = false;
  }

  getDeleteIcon = () => {
    const { submission } = this.state;
    const { deleteSubmission } = this.props;
    const { deleteIconHover } = this.state;

    return <ActionDelete color={deleteIconHover ? 'red' : iconColor}
                         onMouseEnter={() => this.setState({ deleteIconHover: true })}
                         onMouseLeave={() => this.setState({ deleteIconHover: false })}
                         onClick={() => deleteSubmission(submission.submissionId)}
                         key={2}
    />;
  };

  getIcons = () => {
    const {
      toggleShowReplies,
      isShowingReplies,
    } = this.props;
    const { replyIconHover, submission } = this.state;
    const { own, submissionId } = submission;

    const icons = [];

    icons.push(
      <CommunicationChat style={styles.replyIconStyle}
                         color={replyIconHover || isShowingReplies ? 'orange' : iconColor}
                         onMouseEnter={() => this.setState({ replyIconHover: true })}
                         onMouseLeave={() => this.setState({ replyIconHover: false })}
                         onClick={() => toggleShowReplies(submissionId)}
                         key={1}
      />,
    );

    if (own) {
      icons.push(this.getDeleteIcon());
    }

    return icons;
  };

  render() {
    const { getIcons } = this;
    const { isShowingReplies } = this.props;
    const { hover, submission } = this.state;
    const {
      submissionId,
      title,
      subkleddit,
      author,
      createdAt,
      content,
    } = submission;

    return <Paper zDepth={2}
                  style={styles.submissionContainer}
                  onMouseEnter={() => this.setState({ hover: true })}
                  onMouseLeave={() => this.setState({ hover: false })}
                  key={1}>
      <div style={styles.submissionHeaderContainer}>
        <div style={styles.submissionTitle}>
          {title}
          <span style={styles.submissionSubkleddit}>{'\u0020'}[{subkleddit}]</span>
        </div>
        <div
          style={hover || isShowingReplies ? styles.submissionIconContainer : styles.submissionIconContainerInvisible}>
          {getIcons()}
        </div>
      </div>
      <div>by <span style={styles.submissionAuthor}>{author}</span> {moment(createdAt).fromNow()}</div>
      <StylelessLink to={`/submission/${submissionId}`}>
        <ReplyCount submissionId={submissionId} style={styles.replyCount}/>
      </StylelessLink>
      <Divider/>
      <Paper style={styles.submissionContent} zDepth={1}>{content}</Paper>
    </Paper>;
  }

}

MainPageSubmission.propTypes = {
  submission: PropTypes.shape({
    submissionId: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    subkleddit: PropTypes.string.isRequired,
    own: PropTypes.bool.isRequired,
  }).isRequired,
  deleteSubmission: PropTypes.func.isRequired,
  toggleShowReplies: PropTypes.func.isRequired,
  isShowingReplies: PropTypes.bool,
};

MainPageSubmission.defaultProps = {
  isShowingReplies: false,
  replies: [],
  isLoadingReplies: false,
  inputReply: '',
  inputReplyError: '',
};
