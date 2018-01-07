import React, { Component } from 'react';

export class SubmissionNotFound extends Component {

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