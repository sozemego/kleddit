import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './submission.css';
import {Divider, Paper} from 'material-ui';

export class MainPageSubmission extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deleteIconHover: false
    };
  }

  getDeleteIcon = () => {
    const { onDelete, submission } = this.props;
    const { deleteIconHover } = this.state;

    return <svg fill={deleteIconHover ? "red": "#424255"} height="24"
                viewBox="0 0 24 24" width="24"
                onMouseEnter={() => this.setState({deleteIconHover: true})}
                onMouseLeave={() => this.setState({deleteIconHover: false})}
                onClick={() => onDelete(submission.id)}
                xmlns="http://www.w3.org/2000/svg">
      <path d="M15 16h4v2h-4zm0-8h7v2h-7zm0 4h6v2h-6zM3 18c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8H3v10zM14 5h-3l-1-1H6L5 5H2v2h12z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
  };

  render() {
    const { getDeleteIcon } = this;
    const { submission } = this.props;
    const {
      own,
      title,
      subkleddit,
      author,
      createdAt,
      content
    } = submission;

    return (
      <Paper zDepth={2} className={"submission-container " + (own ? "submission-container-own": "")}>
        <div className="submission-header-container">
          <div className="submission-title">
            {title}
            <span className="submission-subkleddit">{'\u0020'}[{subkleddit}]</span>
          </div>
          <div className="submission-icon-container">
            {own ? getDeleteIcon() : null}
          </div>
        </div>
        <div>by <span className="submission-author">{author}</span> {moment(createdAt).fromNow()}</div>
        <Divider />
        <Paper className="submission-content" zDepth={1}>{content}</Paper>
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
  onDelete: PropTypes.func.isRequired
};
