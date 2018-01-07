import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

const styles = {
  formInputField: {
    width: '250px',
  },
};

/**
 * A simple wrapper for input fields used in the application.
 */
export class FormInputField extends Component {

  constructor(props) {
    super(props);

    this.onChange = () => {
    };
  }

  render() {
    const {
      value,
      errorText,
      hintText,
      type,
    } = this.props;

    const onChange = this.props.onChange || this.onChange;

    return (
      <TextField style={styles.formInputField}
                 errorText={errorText}
                 value={value}
                 type={type}
                 hintText={hintText}
                 onChange={(event, value) => onChange(value)}
                 name="Form input"
      />
    );
  }

}