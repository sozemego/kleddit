import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const style = {
  cursor: "pointer",
  color: "inherit",
  textDecoration: "none",
};

export const StylelessLink = ({children, to, ...other}) => {
  return <Link to={to} {...other} style={style}>
    {children}
  </Link>
};

export default StylelessLink;

StylelessLink.propTypes = {
  to: PropTypes.string.isRequired,
};

StylelessLink.defaultProps = {};