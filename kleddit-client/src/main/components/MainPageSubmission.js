import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { CircularProgress, Divider, Paper, TextField } from 'material-ui';
import CommunicationChat from 'material-ui/svg-icons/communication/chat';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import './submission.css';
import { ReplyButton } from '../../submissions/components/ReplyButton';

const iconColor = '#424255';

const replyContainer = {
  margin: "2px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "1px",
  borderRadius: "4px"
};

export class MainPageSubmission extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deleteIconHover: false,
      replyIconHover: false,
      hover: false,
    };
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

  getRepliesSection = () => {
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
    if(isLoadingReplies) {
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
          style={{ width: '90%', marginBottom: "12px" }}
          onChange={onReplyChanged}
          value={inputReply}
          errorText={inputReplyError}
        />
        <ReplyButton label={'Reply'} primary style={{ margin: '4px' }} onClick={onReplySubmit}/>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {loadingElement}
        {replies.map(getReplyComponent)}
      </div>
    </div>;
  };

  getReplyComponent = ({replyId, content, author, createdAt}, index) => {
    return <div key={replyId}
                style={Object.assign({}, replyContainer, {
                  backgroundColor: index % 2 ? "rgba(15, 15, 15, 1)" : "rgba(17, 17, 17, 1)"
                })}>
      <div style={{display: "flex", flexDirection: "column", color: "gray", minWidth: "64px"}}>
        <span>{author}</span>
        <span style={{fontSize: "0.75em"}}>
          {moment(createdAt).format('LTS')}
        </span>
      </div>
      <div style={{marginLeft: "4px"}}>{content}</div>
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
    onReplySubmit(submissionId);
  };

  render() {
    const { getIcons, getRepliesSection } = this;
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

    return [
      <Paper zDepth={2}
             className={`submission-container ${own ? 'submission-container-own' : ''}`}
             onMouseEnter={() => this.setState({ hover: true })}
             onMouseLeave={() => this.setState({ hover: false })}
             key={1}
      >
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
      </Paper>,
      getRepliesSection(),
    ];
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

MainPageSubmission.defaultProps = {
  isShowingReplies: false,
  replies: [],
  isLoadingReplies: false,
  inputReply: "",
  inputReplyError: ""
};
