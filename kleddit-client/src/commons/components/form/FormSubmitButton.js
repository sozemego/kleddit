import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {RaisedButton} from '../../buttons/RaisedButton';

import './form.css';

export class FormSubmitButton extends Component {

  render() {
    return <RaisedButton {...this.props} className="form-submit-button"/>
  }

}

FormSubmitButton.propTypes = {
  label: PropTypes.string.isRequired,
  /**
   * If onClick returns a promise, this button
   * will show a progress bar until the promise resolves.
   */
  onClick: PropTypes.func
};