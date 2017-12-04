import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './submission.css';
import {Divider, Paper} from 'material-ui';

export class MainPageSubmission extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      submission,
    } = this.props;

    return (
      <Paper zDepth={2} className="submission-container">
        <div className="submission-title">
          {submission.title}
          <span className="submission-subkleddit">{'\u0020'}[{submission.subkleddit}]</span>
        </div>
        <div>by <span className="submission-author">{submission.author}</span> {moment(submission.createdAt).fromNow()}</div>
        <Divider />
        <Paper className="submission-content" zDepth={1}>{submission.content}</Paper>
      </Paper>
    );
  }

}

MainPageSubmission.propTypes = {
  submissionId: PropTypes.string,
  author: PropTypes.string,
  createdAt: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.string,
  subkleddit: PropTypes.string
};
