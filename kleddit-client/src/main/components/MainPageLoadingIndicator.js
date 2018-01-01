import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui';

export const MainPageLoadingIndicator = (props) => {
  return <div style={{ minHeight: '64px', display: 'flex', justifyContent: 'center' }}>
    {props.isFetchingNextPage ? <CircularProgress style={{ minHeight: '60px' }} size={48} thickness={5}/> : null}
  </div>;
};

MainPageLoadingIndicator.defaultProps = {
  isFetchingNextPage: PropTypes.bool.isRequired,
};