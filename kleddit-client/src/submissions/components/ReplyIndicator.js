import React from 'react';
import PropTypes from 'prop-types';
import { TypingIndicator } from '../../commons/components/TypingIndicator/TypingIndicator';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '14px',
  },
  text: {
    flexGrow: 1,
    fontSize: '0.75em',
    color: 'gray',
  },
};

styles.invisible = Object.assign({}, styles.container, {
  visibility: 'hidden',
});


export const ReplyIndicator = (props) => {

  return <div style={props.show ? styles.container : styles.invisible}>
    <TypingIndicator/>
    <div style={styles.text}>{props.text}</div>
  </div>;
};

ReplyIndicator.propTypes = {
  text: PropTypes.string.isRequired,
};

ReplyIndicator.defaultProps = {};