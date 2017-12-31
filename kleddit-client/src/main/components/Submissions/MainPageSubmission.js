import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Divider, Paper } from 'material-ui';
import CommunicationChat from 'material-ui/svg-icons/communication/chat';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import './submission.css';
import ReplyCount from '../../../submissions/components/ReplyCount';

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
      <CommunicationChat style={{ marginTop: '2px' }}
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
                  className={`submission-container`}
                  onMouseEnter={() => this.setState({ hover: true })}
                  onMouseLeave={() => this.setState({ hover: false })}
                  key={1}>
      <div className="submission-header-container">
        <div className="submission-title">
          {title}
          <span className="submission-subkleddit">{'\u0020'}[{subkleddit}]</span>
        </div>
        <div className={'submission-icon-container ' + (hover || isShowingReplies ? '' : 'submission-icon-container-invisible')}>
          {getIcons()}
        </div>
      </div>
      <div>by <span className="submission-author">{author}</span> {moment(createdAt).fromNow()}</div>
      <ReplyCount submissionId={submissionId} style={{fontSize: "0.85em", padding: "2px 0 2px 0"}}/>
      <Divider/>
      <Paper className="submission-content" zDepth={1}>{content}</Paper>
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
