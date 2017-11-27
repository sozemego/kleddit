import React, {Component} from 'react';
import {connect} from 'react-redux';

import './main-page.css';
import SubkledditListContainer from './SubkledditListContainer';
import {init} from './state/actions';

class MainPageContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {
      init
    } = this.props;

    init();
  }

  render() {
    return (
      <div className="main-page-container">
        <SubkledditListContainer />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    init: () => {
      dispatch(init());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPageContainer);