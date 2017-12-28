import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './form.css';
import {LoadingComponent} from '../../LoadingComponent';
import {RaisedButton} from 'material-ui';

export const FormSubmitButton = (props) => {
  const buttonProps = _.omit(props, ['onClick']);

  return <LoadingComponent onClick={props.onClick}>
    <RaisedButton {...buttonProps} className="form-submit-button"/>
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