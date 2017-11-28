import React, {Component} from 'react';
import FormControl from 'material-ui/Form/FormControl';
import FormHelperText from 'material-ui/Form/FormHelperText';
import InputLabel from 'material-ui/Input/InputLabel';
import Input from 'material-ui/Input';

import './form.css';

/**
 * A simple wrapper for input fields used in the application.
 */
export class FormInputField extends Component {

  constructor(props) {
    super(props);

    this.onChange = () => {};
  }

  render() {
    const {
      value,
      errorText,
      hintText,
      type
    } = this.props;

    const onChange = this.props.onChange || this.onChange;

    return (
      <FormControl classes={{root: 'form-input-field'}}
                   error={!!errorText}
                   margin='dense'
      >
        <InputLabel>
          {hintText}
        </InputLabel>
        <Input value={value}
               onChange={(event) => onChange(event.target.value)}
               type={type}
        />
        <FormHelperText classes={{root: 'form-input-field-error'}}>
          {errorText}
        </FormHelperText>
      </FormControl>
    );
  }

}