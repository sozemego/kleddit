import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getReplyCountForSubmission } from '../selectors';

const getReplyCountText = (replyCount) => {
  return replyCount !== 1 ? `${replyCount} replies` : `${replyCount} reply`;
};

export const ReplyCount = ({ replyCount, ...other }) => {
  return <div {...other}>{getReplyCountText(replyCount)}</div>;
};

ReplyCount.propTypes = {
  replyCount: PropTypes.number.isRequired,
};

ReplyCount.defaultProps = {};

export const ReplyCountPropsProxy = (WrappedComponent) => ({ submissionId, dispatch, ...other }) =>
  <WrappedComponent {...other}/>;


const mapStateToProps = (state, { submissionId }) => {
  return {
    replyCount: getReplyCountForSubmission(state, submissionId),
  };
};

export default connect(mapStateToProps, null)(ReplyCountPropsProxy(ReplyCount));