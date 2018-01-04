import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SubmissionNotFound extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>This submission was not found :(</div>
        <a href="/">Go back</a>
      </div>
    );
  }

}

SubmissionNotFound.propTypes = {};

SubmissionNotFound.defaultProps = {};