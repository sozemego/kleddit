import React from 'react';
import PropTypes from 'prop-types';

import './form.css';
import {LoadingComponentWrapper} from '../LoadingComponent';
import {RaisedButton as MaterialUiRaisedButton} from 'material-ui';

const RaisedButton = (props) => {
  return <MaterialUiRaisedButton {...props} className="form-submit-button"/>
};

export const FormSubmitButton = LoadingComponentWrapper(RaisedButton);

FormSubmitButton.propTypes = {
  label: PropTypes.string.isRequired,
  /**
   * If onClick returns a promise, this button
   * will show a progress bar until the promise resolves.
   */
  onClick: PropTypes.func,
};