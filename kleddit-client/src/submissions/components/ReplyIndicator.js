import React from 'react';
import PropTypes from 'prop-types';
import { TypingIndicator } from '../../commons/components/TypingIndicator/TypingIndicator';

export const ReplyIndicator = (props) => {
  if(!props.show) {
    return null;
  }

  return <div style={{display: "flex", flexDirection: "row"}}>
    <TypingIndicator/>
    <div style={{flexGrow: 1, fontSize: "0.75em", color: "gray"}}>{props.text}</div>
  </div>;
};

ReplyIndicator.propTypes = {
  text: PropTypes.string.isRequired,
};

ReplyIndicator.defaultProps = {};