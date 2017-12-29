import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import * as userActions from '../../user/state/actions';
import * as mainPageActions from '../actions';
import {getSubscribedToSubkleddits, isLoggedIn} from '../../user/state/selectors';
import {isLeftSidebarShown, getSubkleddits} from '../selectors';
import {LeftMainPageSidebar} from '../components/LeftMainPageSidebar';

class LeftMainPageSidebarContainer extends Component {

  componentWillMount() {
    this.props.getSubscribedToSubkleddits();
  }

  onUnsubscribeClicked = (subkledditName) => {
    const { mainPageUnsubscribe } = this.props;
    return mainPageUnsubscribe(subkledditName);
  };

  onSubscribeClicked = (subkledditName) => {
    const { mainPageSubscribe } = this.props;

    return mainPageSubscribe(subkledditName);
  };

  render() {
    const {
      onUnsubscribeClicked,
      onSubscribeClicked,
    } = this;

    return <LeftMainPageSidebar {...this.props}
                                onUnsubscribeClicked={onUnsubscribeClicked}
                                onSubscribeClicked={onSubscribeClicked}
    />;
  }

}

const mapStateToProps = (state) => {
  return {
    subkleddits: getSubkleddits(state),
    subscribedToSubkleddits: getSubscribedToSubkleddits(state),
    isLoggedIn: isLoggedIn(state)
  };
};

export default connect(mapStateToProps, {...userActions, ...mainPageActions})(LeftMainPageSidebarContainer);