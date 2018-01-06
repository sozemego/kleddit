import React from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from 'material-ui';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    borderBottom: '1px solid white',
  },
  element: {
    width: '33.3%',
    display: 'flex',
  },
  elements: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '15px 25px 15px 25px',
    backgroundColor: 'rgba(15, 15, 15, 1)',
    zIndex: '800',
  },
  progressFetching: {},
  progressNotFetching: {
    visibility: 'hidden',
  },
};

styles.leftElement = Object.assign({}, styles.element, {
  flexDirection: 'row',
  justifyContent: 'flex-start',
});

styles.appName = Object.assign({}, styles.element, {
  fontSize: '1.5rem',
  justifyContent: 'center',
});

styles.rightElement = Object.assign({}, styles.element, {
  flexDirection: 'row',
  justifyContent: 'flex-end',
});

export const Header = (props) => {
  const {
    navigateToMain,
    isFetching,
    buttons,
    leftButtons,
  } = props;

  return (
    <div style={styles.container}>
      <div style={styles.elements}>
        <div style={styles.leftElement}>
          {leftButtons}
        </div>
        <div style={styles.appName}>
          <div onClick={navigateToMain}>KLEDDIT</div>
        </div>
        <div style={styles.rightElement}>{buttons}</div>
      </div>
      <LinearProgress mode="indeterminate" style={isFetching ? styles.progressFetching : styles.progressNotFetching}/>
    </div>
  );
};

Header.propTypes = {
  navigateToMain: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  buttons: PropTypes.node.isRequired,
  leftButtons: PropTypes.node,
};

Header.defaultProps = {
  leftButtons: '',
};