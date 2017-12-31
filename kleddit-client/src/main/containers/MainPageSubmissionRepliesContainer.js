import { connect } from 'react-redux';

import * as mainPageActions from '../actions';
import * as submissionsActions from '../../submissions/actions';
import { getRepliesForSubmission, isLoadingReplies, isShowingReplies } from '../../submissions/selectors';
import { MainPageSubmissionReplies } from '../components/Submissions/MainPageSubmissionReplies';

const mapStateToProps = (state, {submissionId}) => {
  return {
    isShowingReplies: isShowingReplies(state, submissionId),
    isLoadingReplies: isLoadingReplies(state, submissionId),
    replies: getRepliesForSubmission(state, submissionId),
    submissionId,
  }
};

export default connect(mapStateToProps, {...mainPageActions, ...submissionsActions})(MainPageSubmissionReplies);