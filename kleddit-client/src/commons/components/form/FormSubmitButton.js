import React from 'react';
import PropTypes from 'prop-types';

import { LoadingRaisedButton } from '../buttons/LoadingRaisedButton';

const style = {
  margin: "24px auto 6px auto",
};

export const FormSubmitButton = (props) => {
  return <LoadingRaisedButton {...props} style={style}/>;
};

FormSubmitButton.propTypes = {
  label: PropTypes.string.isRequired,
  /**
   * If onClick returns a promise, this button
   * will show a progress bar until the promise resolves.
   */
  onClick: PropTypes.func,
};