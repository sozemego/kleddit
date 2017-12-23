import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './form.css';
import {RaisedButton} from '../commons/buttons/RaisedButton';

export class FormSubmitButton extends Component {

  render() {
    return <RaisedButton {...this.props}/>
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