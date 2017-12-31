import { connect } from 'react-redux';

import * as mainPageActions from '../actions';
import * as submissionsActions from '../../submissions/actions';
import {
  isLoadingReplies,
  isShowingReplies,
  makeGetRepliesForMainPageSubmission,
} from '../../submissions/selectors';
import { MainPageSubmissionReplies } from '../components/Submissions/MainPageSubmissionReplies';

const makeMapStateToProps = () => {
  const getRepliesForMainPageSubmission = makeGetRepliesForMainPageSubmission();
  return (state, { submissionId }) => {
    return {
      isShowingReplies: isShowingReplies(state, submissionId),
      isLoadingReplies: isLoadingReplies(state, submissionId),
      replies: getRepliesForMainPageSubmission(state, submissionId),
      submissionId,
    };
  };
};

export default connect(makeMapStateToProps, { ...mainPageActions, ...submissionsActions })(MainPageSubmissionReplies);