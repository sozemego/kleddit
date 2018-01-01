import React from 'react';
import PropTypes from 'prop-types';

import NavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import { connect } from 'react-redux';
import { getReplyCountForSubmission } from '../../submissions/selectors';
import { getMaxRepliesShown } from '../selectors';

export const MainPageMoreReplies = ({ replyCount, maxRepliesShown, ...other }) => {
  if (replyCount < maxRepliesShown) return null;

  return <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} {...other}>
    <NavigationArrowForward/>
    <span>There are {replyCount - maxRepliesShown} more replies, click here...</span>
  </div>;
};

MainPageMoreReplies.propTypes = {
  replyCount: PropTypes.number.isRequired,
  maxRepliesShown: PropTypes.number.isRequired,
};

const mapStateToProps = (state, { submissionId }) => {
  return {
    replyCount: getReplyCountForSubmission(state, submissionId),
    maxRepliesShown: getMaxRepliesShown(state),
  };
};

const MainPageMoreRepliesPropsProxy = (WrappedComponent) => ({ submissionId, dispatch, ...other }) =>
  <WrappedComponent {...other}/>;

export default connect(mapStateToProps, null)(MainPageMoreRepliesPropsProxy(MainPageMoreReplies));

