import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Divider, Paper, TextField} from 'material-ui';
import CommunicationChat from 'material-ui/svg-icons/communication/chat';
import './submission.css';
import {RaisedButton} from '../../commons/buttons/RaisedButton';

const iconColor = "#424255";

export class MainPageSubmission extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deleteIconHover: false,
      replyIconHover: false,
      hover: false
    };
  }

  getDeleteIcon = () => {
    const { onDelete, submission } = this.props;
    const { deleteIconHover } = this.state;

    return <svg fill={deleteIconHover ? "red": iconColor} height="24"
                viewBox="0 0 24 24" width="24"
                onMouseEnter={() => this.setState({deleteIconHover: true})}
                onMouseLeave={() => this.setState({deleteIconHover: false})}
                onClick={() => onDelete(submission.submissionId)}
                xmlns="http://www.w3.org/2000/svg">
      <path d="M15 16h4v2h-4zm0-8h7v2h-7zm0 4h6v2h-6zM3 18c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8H3v10zM14 5h-3l-1-1H6L5 5H2v2h12z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
  };

  getIcons = () => {
    const {
      submission,
      toggleShowReplies,
      isShowingReplies
    } = this.props;
    const { own, submissionId } = submission;
    const { replyIconHover } = this.state;

    const icons = [];

    icons.push(
      <CommunicationChat style={{marginTop: "2px"}}
                         color={replyIconHover || isShowingReplies ? "orange" : iconColor}
                         onMouseEnter={() => this.setState({replyIconHover: true})}
                         onMouseLeave={() => this.setState({replyIconHover: false})}
                         onClick={() => toggleShowReplies(submissionId)}
      />
    );

    if(own) {
      icons.push(this.getDeleteIcon());
    }

    return icons;
  };

  getRepliesSection = () => {
    const { isShowingReplies } = this.props;
    if(!isShowingReplies) return null;

    return <div style={{backgroundColor: "rgb(54, 54, 54)", padding: "4px"}}>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        <TextField hintText={"Reply"} multiLine style={{width: "90%"}} />
        <RaisedButton label={"Reply"} style={{width: "10%", height: "100%", alignSelf: "flex-end"}}/>
      </div>
      <div>
        REPLIES
      </div>
    </div>
  };

  render() {
    const { getIcons, getRepliesSection } = this;
    const { submission } = this.props;
    const { hover } = this.state;
    const {
      own,
      title,
      subkleddit,
      author,
      createdAt,
      content,
    } = submission;

    return (
        <Paper zDepth={2}
               className={`submission-container ${own ? "submission-container-own": ""}`}
               onMouseEnter={() => this.setState({hover: true})}
               onMouseLeave={() => this.setState({hover: false})}
        >
          <div className="submission-header-container">
            <div className="submission-title">
              {title}
              <span className="submission-subkleddit">{'\u0020'}[{subkleddit}]</span>
            </div>
            <div className={"submission-icon-container " + (hover ? "" : "submission-icon-container-invisible")}>
              {getIcons()}
            </div>
          </div>
          <div>by <span className="submission-author">{author}</span> {moment(createdAt).fromNow()}</div>
          <Divider />
          <Paper className="submission-content" zDepth={1}>{content}</Paper>
          {getRepliesSection()}
        </Paper>
    );
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
    own: PropTypes.bool.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  toggleShowReplies: PropTypes.func.isRequired,
  isShowingReplies: PropTypes.bool
};

MainPageSubmission.defaultProps = {
  isShowingReplies: false
};
