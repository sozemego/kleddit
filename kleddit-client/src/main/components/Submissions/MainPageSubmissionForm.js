import React, { Component } from 'react';
import { MenuItem, RaisedButton, SelectField, TextField } from 'material-ui';

const styles = {
  submissionFormContainer: {
    display: 'flex',
    backgroundColor: 'black',
    flexDirection: 'column',
    padding: '6px',
  },
  submissionFormInputContainer: {},
  submissionFormTitleInput: {
    margin: '6px',
    width: '100%',
  },
  submissionFormContentInput: {
    flexGrow: '1',
  },
  submissionFormLabelContainer: {
    width: '80px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  submissionFormButtonInputContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
};

styles.submissionFormSubkledditInputContainer = Object.assign({}, styles.submissionFormInputContainer, {
  display: 'flex',
  alignItems: 'center',
});

styles.submissionFormTitleInputContainer = Object.assign({}, styles.submissionFormInputContainer, {
  display: 'flex',
  alignItems: 'center',
});

styles.submissionFormContentInputContainer = Object.assign({}, styles.submissionFormInputContainer, {
  display: 'flex',
  alignItems: 'center',
});

export class MainPageSubmissionForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      subkleddit: 0,
    };
  }

  onSubmit = () => {
    const {
      onSubmit,
      subkleddits,
    } = this.props;

    const {
      title,
      content,
      subkleddit,
    } = this.state;

    onSubmit(subkleddits[subkleddit], title, content);
    this.setState({
      title: '',
      content: '',
    });
  };

  onContentChange = (content) => {
    const { onChange } = this.props;
    const nextState = { ...this.state, content };
    onChange(nextState);
    this.setState(nextState);
  };

  onTitleChange = (title) => {
    const { onChange } = this.props;
    const nextState = { ...this.state, title };
    onChange(nextState);
    this.setState(nextState);
  };

  render() {
    const {
      onSubmit,
      onTitleChange,
      onContentChange,
    } = this;

    const {
      subkleddits = [],
      submissionErrors,
    } = this.props;

    if (subkleddits.length === 0) {
      return <div style={styles.submissionFormContainer}>Subscribe to at least one subkleddit to post!</div>;
    }

    const {
      title,
      content,
      subkleddit,
    } = this.state;

    return (
      <div style={styles.submissionFormContainer}>
        <div>If you wish to submit a new post, please do it in the form below</div>
        <div style={styles.submissionFormSubkledditInputContainer}>
          <div style={styles.submissionFormLabelContainer}>Subkleddit</div>
          <SelectField multiple={false}
                       value={subkleddit !== null ? subkleddits[subkleddit] : subkleddits[0] || null}
                       onChange={(event, subkleddit) => this.setState({ subkleddit })}
                       labelStyle={{ display: 'flex', justifyContent: 'center' }}
          >
            {subkleddits.map((subkleddit, index) => {
              return <MenuItem key={index}
                               value={subkleddit}
                               primaryText={subkleddit}
              />;
            })}
          </SelectField>
        </div>
        <div style={styles.submissionFormTitleInputContainer}>
          <div style={styles.submissionFormLabelContainer}>Title</div>
          <TextField
            style={styles.submissionFormTitleInput}
            value={title}
            errorText={submissionErrors.title}
            onChange={(event, title) => onTitleChange(title)}
          />
        </div>
        <div style={styles.submissionFormContentInputContainer}>
          <div style={styles.submissionFormLabelContainer}>Content</div>
          <TextField
            multiLine={true}
            style={styles.submissionFormContentInput}
            value={content}
            errorText={submissionErrors.content}
            onChange={(event, content) => onContentChange(content)}
          />
        </div>
        <div style={styles.submissionFormButtonInputContainer}>
          <RaisedButton label="Submit"
                        onClick={onSubmit}
                        primary={true}
                        fullWidth={false}
          />
        </div>
      </div>
    );
  }

}