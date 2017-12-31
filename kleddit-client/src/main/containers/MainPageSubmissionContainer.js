import { connect } from 'react-redux';

import * as mainPageActions from '../actions';
import * as submissionsActions from '../../submissions/actions';
import { getSubmissionById, isShowingReplies } from '../../submissions/selectors';
import { MainPageSubmission } from '../components/Submissions/MainPageSubmission';

const mapStateToProps = (state, {submissionId}) => {
  return {
    submission: getSubmissionById(state, submissionId),
    isShowingReplies: isShowingReplies(state, submissionId),
  }
};

export default connect(mapStateToProps, {...mainPageActions, ...submissionsActions})(MainPageSubmission);