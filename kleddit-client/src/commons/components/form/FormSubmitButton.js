import React from 'react';
import PropTypes from 'prop-types';

import {RaisedButton as MaterialUiRaisedButton} from 'material-ui';
import {LoadingComponentWrapperFunction} from '../LoadingComponentWrapper';

import './form-button.css';

const RaisedButton = (props) => {
  return <MaterialUiRaisedButton {...props} className={"form-submit-button"}/>
};

export const FormSubmitButton = LoadingComponentWrapperFunction(RaisedButton);

FormSubmitButton.propTypes = {
  label: PropTypes.string.isRequired,
  /**
   * If onClick returns a promise, this button
   * will show a progress bar until the promise resolves.
   */
  onClick: PropTypes.func,
};