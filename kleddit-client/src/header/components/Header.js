import React from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from 'material-ui';

import './header.css';

export const Header = (props) => {
  const {
    navigateToMain,
    isFetching,
    buttons,
    leftButtons
  } = props;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid white' }}>
      <div className="header-container">
        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", width: "33.33%"}}>
          {leftButtons}
        </div>
        <div className="header-section header-app-name">
          <div className="link" onClick={navigateToMain}>KLEDDIT</div>
        </div>
        <div className="header-section header-buttons-container">{buttons}</div>
      </div>
      <LinearProgress mode="indeterminate" style={isFetching ? {} : { visibility: 'hidden' }}/>
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
  leftButtons: ""
};