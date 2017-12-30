import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Divider, Paper } from 'material-ui';
import CommunicationChat from 'material-ui/svg-icons/communication/chat';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import './submission.css';

const iconColor = '#424255';

export class MainPageSubmission extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deleteIconHover: false,
      replyIconHover: false,
      hover: false,
    };
    this.shiftPressed = false;
  }

  getDeleteIcon = () => {
    const { onDelete, submission } = this.props;
    const { deleteIconHover } = this.state;

    return <ActionDelete color={deleteIconHover ? 'red' : iconColor}
                         onMouseEnter={() => this.setState({ deleteIconHover: true })}
                         onMouseLeave={() => this.setState({ deleteIconHover: false })}
                         onClick={() => onDelete(submission.submissionId)}
                         key={2}
    />;
  };

  getIcons = () => {
    const {
      submission,
      toggleShowReplies,
      isShowingReplies,
    } = this.props;
    const { own, submissionId } = submission;
    const { replyIconHover } = this.state;

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
    const { submission, isShowingReplies } = this.props;
    const { hover } = this.state;
    const {
      own,
      title,
      subkleddit,
      author,
      createdAt,
      content,
    } = submission;

    return <Paper zDepth={2}
                  className={`submission-container ${own ? 'submission-container-own' : ''}`}
                  onMouseEnter={() => this.setState({ hover: true })}
                  onMouseLeave={() => this.setState({ hover: false })}
                  key={1}>
      <div className="submission-header-container">
        <div className="submission-title">
          {title}
          <span className="submission-subkleddit">{'\u0020'}[{subkleddit}]</span>
        </div>
        <div
          className={'submission-icon-container ' + (hover || isShowingReplies ? '' : 'submission-icon-container-invisible')}>
          {getIcons()}
        </div>
      </div>
      <div>by <span className="submission-author">{author}</span> {moment(createdAt).fromNow()}</div>
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
  onDelete: PropTypes.func.isRequired,
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
