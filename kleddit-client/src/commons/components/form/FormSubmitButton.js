import React from 'react';
import PropTypes from 'prop-types';

import './form.css';
import {LoadingComponent} from '../../LoadingComponent';
import {RaisedButton} from 'material-ui';

export const FormSubmitButton = (props) => {
  const {
    onClick,
    ...other
  } = props;

  return <LoadingComponent onClick={onClick}>
    <RaisedButton {...other} className="form-submit-button"/>
  </LoadingComponent>;
};

FormSubmitButton.propTypes = {
  label: PropTypes.string.isRequired,
  /**
   * If onClick returns a promise, this button
   * will show a progress bar until the promise resolves.
   */
  onClick: PropTypes.func
};