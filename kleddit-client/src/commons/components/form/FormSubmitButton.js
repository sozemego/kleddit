import React from 'react';
import PropTypes from 'prop-types';

import { LoadingRaisedButton } from '../buttons/LoadingRaisedButton';
import './form-button.css';

export const FormSubmitButton = (props) => {
  return <LoadingRaisedButton {...props} className={"form-submit-button"}/>
};

FormSubmitButton.propTypes = {
  label: PropTypes.string.isRequired,
  /**
   * If onClick returns a promise, this button
   * will show a progress bar until the promise resolves.
   */
  onClick: PropTypes.func,
};