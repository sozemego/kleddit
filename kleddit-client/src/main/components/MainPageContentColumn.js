import React from 'react';
import PropTypes from 'prop-types';
import {Col} from 'react-flexbox-grid';

export const MainPageContentColumn = (props) => {
  return <Col lg={10}
              className={props.isLeftSidebarShown ? 'main-page-content-container' : 'main-page-content-container-full'}
              {...props}
  />;
};

MainPageContentColumn.propTypes = {
  isLeftSidebarShown: PropTypes.bool.isRequired,
};