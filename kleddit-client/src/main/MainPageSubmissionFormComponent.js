import React, {Component} from 'react';
import {MenuItem, RaisedButton, SelectField, TextField} from 'material-ui';

import './submission-form.css';

export class MainPageSubmissionFormComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: "",
      content: "",
      subkleddit: 0
    }
  }

  onSubmit = () => {
    const {
      onSubmit,
      subkleddits
    } = this.props;

    const {
      title,
      content,
      subkleddit
    } = this.state;

    onSubmit(subkleddits[subkleddit], title, content);
    this.setState({
      title: "",
      content: "",
      subkleddit: 0
    })
  };

  onContentChange = (content) => {
    const { onChange } = this.props;
    const nextState = {...this.state, content};
    onChange(nextState);
    this.setState(nextState);
  };

  onTitleChange = (title) => {
    const { onChange } = this.props;
    const nextState = {...this.state, title};
    onChange(nextState);
    this.setState(nextState);
  };

  render() {
    const {
      onSubmit,
      onTitleChange,
      onContentChange
    } = this;

    const {
      subkleddits = [],
      submissionErrors
    } = this.props;

    if(subkleddits.length === 0) {
      return <div className="submission-form-container">Subscribe to at least one subkleddit to post!</div>;
    }

    const {
      title,
      content,
      subkleddit
    } = this.state;

    return (
      <div className="submission-form-container">
        <div>If you wish to submit a new post, please do it in the form below</div>
        <div className="submission-form-subkleddit-input-container">
          <div className="submission-form-label-container">Subkleddit</div>
          <SelectField multiple={false}
                       value={subkleddit !== null ? subkleddits[subkleddit] : subkleddits[0] || null}
                       onChange={(event, subkleddit) => this.setState({subkleddit})}
                       labelStyle={{display: "flex", justifyContent: "center"}}
          >
            {subkleddits.map((subkleddit, index) => {
              return <MenuItem key={index}
                               value={subkleddit}
                               primaryText={subkleddit}
              />
            })}
          </SelectField>
        </div>
        <div className="submission-form-title-input-container">
          <div className="submission-form-label-container">Title</div>
          <TextField
            className="submission-form-title-input"
            style={{margin: "4px"}}
            value={title}
            errorText={submissionErrors.title}
            onChange={(event, title) => onTitleChange(title)}
          />
        </div>
        <div className="submission-form-content-input-container">
          <div className="submission-form-label-container">Content</div>
          <TextField
            className="submission-form-content-input"
            multiLine={true}
            style={{margin: "4px"}}
            value={content}
            errorText={submissionErrors.content}
            onChange={(event, content) => onContentChange(content)}
          />
        </div>
        <div className="submission-form-button-input-container">
          <RaisedButton label="Submit"
                        onClick={onSubmit}
                        primary={true}
                        fullWidth={false}
                        // style={{width: "125px"}}
          />
        </div>
      </div>
    );
  }

}