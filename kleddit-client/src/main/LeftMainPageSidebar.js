import React, {Component} from 'react';
import {connect} from 'react-redux';
import Divider from 'material-ui/Divider';
import _ from 'lodash';

import * as userActions from '../user/state/actions';
import * as subkledditsActions from '../subkleddit/state/actions';
import * as mainPageActions from './state/actions';
import {getSubscribedToSubkleddits, isLoggedIn} from '../user/state/selectors';
import {getSubkleddits} from '../subkleddit/state/selectors';
import {List, Subheader} from 'material-ui';
import {isLeftSidebarShown} from './state/selectors';

class LeftMainPageSidebar extends Component {

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
    console.log(mainPageSubscribe);
    const action = subscribed ? mainPageUnsubscribe(subkledditName) : mainPageSubscribe(subkledditName);
    console.log(action);
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

  isSubscribed = (subkledditName) => {
    const { subscribedToSubkleddits } = this.props;
    return subscribedToSubkleddits.includes(subkledditName);
  };

  _isLoadingSubscribeIcon = (subkledditName) => {
    return this.state.loadingSubscribeIcons.includes(subkledditName);
  };

  getSubscribeIcon = (subscribed, subkledditName) => {
    const {
      isLoggedIn
    } = this.props;

    if (!isLoggedIn) {
      return null;
    }

    const {
      onSubscribeClicked,
    } = this;

    const onClick = () => onSubscribeClicked(subscribed, subkledditName);
    const isLoading = this._isLoadingSubscribeIcon(subkledditName);
    const classNames = "main-page-subkleddit-list-subscribe-icon " + (isLoading ? "main-page-subkleddit-list-subscribe-icon-loading": "")
    // inline svg because it's much easier to change svg colors this way
    return subscribed ?
      <svg className={classNames}
           fill="red"
           height="24"
           viewBox="0 0 24 24"
           width="24"
           xmlns="http://www.w3.org/2000/svg"
           onClick={onClick}
      >
        <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
      :
      <svg
        className={classNames}
        fill="#3f51b5"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
      >
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
      </svg>;
  };

  getSubkledditElements = () => {
    const {
      subkleddits,
    } = this.props;

    const {
      isSubscribed,
      getSubscribeIcon
    } = this;

    let elements = [];

    elements.push(
      <Subheader key="A" inset={false}>Default subkleddits</Subheader>
    );

    elements.push(
      <Divider key={'B'} className="main-page-subkleddit-list-divider"/>
    );

    const subkledditsElements = subkleddits.map((subkleddit, index) => {
      const subscribed = isSubscribed(subkleddit.name);
      return <div key={index} className="main-page-subkleddit-list-element-container">
        <div>{subkleddit.name}</div>
        <div className="main-page-subkleddit-list-element-subscribers-container">
          ({subkleddit.subscribers})
          {getSubscribeIcon(subscribed, subkleddit.name)}
        </div>
      </div>;
    });

    elements = elements.concat(subkledditsElements);

    return elements;
  };

  getListClassNames = () => {
    const defaultClassNames = ['main-page-subkleddit-list-container'];
    const { isLeftSidebarShown } = this.props;
    if(isLeftSidebarShown) {
      // defaultClassNames.push('main-page-subkleddit-list-container-hidden');
    }

    return defaultClassNames.join(' ');
  };

  getContainerClassNames = () => {
    const defaultClassNames = ['main-page-sidebar-container'];
    const { isLeftSidebarShown } = this.props;
    if(!isLeftSidebarShown) {
      defaultClassNames.push('main-page-subkleddit-list-container-hidden');
    }
    return defaultClassNames.join(' ');
  };

  getSideButtonClassNames = () => {
    return this.props.isLeftSidebarShown ? 'main-page-side-hide-button' : 'main-page-side-show-button';
  };

  render() {
    const {
      getSubkledditElements,
      getListClassNames,
      getContainerClassNames,
      getSideButtonClassNames
    } = this;

    const {
      toggleLeftSidebarVisibility
    } = this.props;

    const children = [
      ...getSubkledditElements(),
    ];

    return (
      <div className={getContainerClassNames()}>
        <List className={getListClassNames()} children={children}/>
        <div className={getSideButtonClassNames()}
             onClick={() => toggleLeftSidebarVisibility()}>
        </div>
      </div>
    );
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

export default connect(mapStateToProps, {...userActions, ...subkledditsActions, ...mainPageActions})(LeftMainPageSidebar);