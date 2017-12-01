import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './submission.css';

export class MainPageSubmission extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      submission,
    } = this.props;

    return (
      <div className="submission-container">
        <div className="submission-title">
          {submission.title}
          <span className="submission-subkleddit">{'\u0020'}[{submission.subkleddit}]</span>
        </div>
        <div>by {submission.author} {moment(submission.createdAt).fromNow()}</div>
        <div>{submission.content}</div>
      </div>
    );
  }

}

MainPageSubmission.propTypes = {
  submission: PropTypes.object.isRequired,
};