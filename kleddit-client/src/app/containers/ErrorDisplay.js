import React from 'react';
import { Snackbar } from 'material-ui';
import { connect } from 'react-redux';
import { getErrorMessage } from '../selectors';

const ErrorDisplay = (props) => {
  return <Snackbar message={props.message} open={!!props.message}/>;
};

const mapStateToProps = (state) => {
  return {
    message: getErrorMessage(state),
  };
};

export default connect(mapStateToProps, null)(ErrorDisplay);