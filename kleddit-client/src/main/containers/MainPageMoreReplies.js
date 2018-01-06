import React from 'react';
import PropTypes from 'prop-types';

import NavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import { connect } from 'react-redux';
import { getReplyCountForSubmission } from '../../submissions/selectors';
import { getMaxRepliesShown } from '../selectors';
import StylelessLink from '../../app/components/StylelessLink';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
};

export const MainPageMoreReplies = ({ replyCount, maxRepliesShown, submissionId, ...other }) => {
  if (replyCount <= maxRepliesShown) return null;

  return <div style={styles.container} {...other}>
    <NavigationArrowForward/>
    <StylelessLink to={`/submission/${submissionId}`}>There are {replyCount - maxRepliesShown} more replies, click
      here...
    </StylelessLink>
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

const MainPageMoreRepliesPropsProxy = (WrappedComponent) => ({ dispatch, ...other }) =>
  <WrappedComponent {...other}/>;

export default connect(mapStateToProps, null)(MainPageMoreRepliesPropsProxy(MainPageMoreReplies));

