import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
        <div>{submission.title}</div>
        <div>{submission.content}</div>
      </div>
    );
  }

}

MainPageSubmission.propTypes = {
  submission: PropTypes.object.isRequired,
};