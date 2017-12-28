import React, {Component} from 'react';
import {connect} from 'react-redux';
import Divider from 'material-ui/Divider';
import _ from 'lodash';

import * as userActions from '../../user/state/actions';
import * as mainPageActions from '../actions';
import {getSubscribedToSubkleddits, isLoggedIn} from '../../user/state/selectors';
import {List, Subheader} from 'material-ui';
import {isLeftSidebarShown, getSubkleddits} from '../selectors';
import {LeftMainPageSidebar} from '../components/LeftMainPageSidebar';

class LeftMainPageSidebarContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loadingSubscribeIcons: []
    }
  }

  componentWillMount() {
    this.props.getSubscribedToSubkleddits();
  }

  onSubscribeClicked = (subscribed, subkledditName) => {
    const { mainPageSubscribe, mainPageUnsubscribe } = this.props;
    const { addLoadingSubkleddit, removeLoadingSubkleddit } = this;

    addLoadingSubkleddit(subkledditName);
    const action = subscribed ? mainPageUnsubscribe(subkledditName) : mainPageSubscribe(subkledditName);
    action.then(() => removeLoadingSubkleddit(subkledditName));
  };

  addLoadingSubkleddit = (subkledditName) => {
    const loadingSubscribeIcons = [...this.state.loadingSubscribeIcons];
    loadingSubscribeIcons.push(subkledditName);
    this.setState({loadingSubscribeIcons});
  };

  removeLoadingSubkleddit = (subkledditName) => {
    const loadingSubscribeIcons = [...this.state.loadingSubscribeIcons];
    _.remove(loadingSubscribeIcons, n => n === subkledditName);
    this.setState({loadingSubscribeIcons});
  };

  render() {
    return <LeftMainPageSidebar {...this.props}/>;
  }

}

const mapStateToProps = (state) => {
  return {
    subkleddits: getSubkleddits(state),
    subscribedToSubkleddits: getSubscribedToSubkleddits(state),
    isLoggedIn: isLoggedIn(state),
    isLeftSidebarShown: isLeftSidebarShown(state)
  };
};

export default connect(mapStateToProps, {...userActions, ...mainPageActions})(LeftMainPageSidebarContainer);