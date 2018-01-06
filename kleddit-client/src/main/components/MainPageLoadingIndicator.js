import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui';

const styles = {
  container: {
    minHeight: '64px',
    display: 'flex',
    justifyContent: 'center',
  },
  progress: {
    minHeight: '60px',
  },
};

export const MainPageLoadingIndicator = (props) => {
  return <div style={styles.container}>
    {props.isFetchingNextPage ? <CircularProgress style={styles.progress} size={48} thickness={5}/> : null}
  </div>;
};

MainPageLoadingIndicator.defaultProps = {
  isFetchingNextPage: PropTypes.bool.isRequired,
};