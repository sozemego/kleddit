import React from 'react';
import PropTypes from 'prop-types';
import {Col} from 'react-flexbox-grid';

export const MainPageContentColumn = (props) => {
  const {
    isLeftSidebarShown,
    ...other,
  } = props;

  return <Col lg={10}
              className={isLeftSidebarShown ? 'main-page-content-container' : 'main-page-content-container-full'}
              {...other}
  />;
};

MainPageContentColumn.propTypes = {
  isLeftSidebarShown: PropTypes.bool.isRequired,
};