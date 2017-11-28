import React, {Component} from 'react';
import {Select, TextField} from 'material-ui';

import './submission-form.css';

export class SubmissionFormComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    // const {
    //   subkleddits
    // } = this.props;

    const subkleddits = ["a", "b", "gifs", "c"];

    return (
      <div className="submission-form-container">
        <div>If you wish to submit a new post, please do it in the form below</div>
        <div className="submission-form-title-input-container">
          <div className="submission-form-label-container">Title</div>
          <TextField
            className="submission-form-title-input"
            style={{margin: "4px"}}
          />
        </div>
        <div className="submission-form-content-input-container">
          <div className="submission-form-label-container">Content</div>
          <TextField
            className="submission-form-content-input"
            multiline={true}
            style={{margin: "4px"}}
          />
        </div>
        <div className="submission-form-subkleddit-input-container">
          <div className="submission-form-label-container">Subkleddit</div>
          <Select value={"gifs"} classes={{root: "submission-form-subkleddit-select-root"}}>
            {subkleddits}
          </Select>
        </div>
      </div>
    );
  }

}