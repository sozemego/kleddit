import React, {Component} from 'react';

import './form.css';
import {RaisedButton} from 'material-ui';

export class FormSubmitButton extends Component {

  render() {
    const {
      onClick,
      label
    } = this.props;

    return (
      <RaisedButton label={label}
                    className="form-submit-button"
                    primary={true}
                    onClick={onClick}
      />

    );
  }

}