import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getSubmissions} from '../subkleddit/state/selectors';
import {MainPageSubmission} from './MainPageSubmission';

class MainPageSubmissionsContainer extends Component {

  render() {
    const {
      submissions
    } = this.props;

    return (
      <div className="main-page-submissions-container">
        {submissions.map((submission, index) => {
          return <MainPageSubmission key={index} submission={submission}/>;
        })}
      </div>
    )
  }

}

MainPageSubmissionsContainer.propTypes = {
  submissions: PropTypes.array
};

MainPageSubmissionsContainer.defaultProps = {
  submission: []
};

const mapStateToProps = (state) => {
  return {
    submissions: getSubmissions(state)
  };
};

export default connect(mapStateToProps)(MainPageSubmissionsContainer);