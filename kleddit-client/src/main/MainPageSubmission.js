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
        <div className="submission-title">
          {title}
          <span className="submission-subkleddit">{'\u0020'}[{subkleddit}]</span>
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
  }).isRequired
};
