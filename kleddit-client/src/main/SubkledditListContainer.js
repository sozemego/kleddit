import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Divider from "material-ui/Divider";

import * as userActions from '../user/state/actions';
import * as mainActions from './state/actions';
import {getDefaultSubkleddits, mainPageRoot} from './state/selectors';
import {getSubscribedToSubkleddits, isLoggedIn, getUserRoot} from '../user/state/selectors';

class SubkledditListContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getSubscribedToSubkleddits();
  }

  onSubscribeClicked = (subscribed, subkledditName) => {
    const {
      subscribe,
      unsubscribe,
      getDefaultSubkleddits
    } = this.props;

    const action = subscribed ? unsubscribe(subkledditName) : subscribe(subkledditName);
    action.then(() => getDefaultSubkleddits());
  };

  _isSubscribed = (subkledditName) => {
    const {
      subscribedToSubkleddits
    } = this.props;

    return subscribedToSubkleddits.findIndex(subscription => subscription === subkledditName) > -1;
  };

  getSubscribeIcon = (subscribed, subkledditName) => {
    const {
      isLoggedIn
    } = this.props;

    if(!isLoggedIn) {
      return null;
    }

    const {
      onSubscribeClicked
    } = this;

    const onClick = () => onSubscribeClicked(subscribed, subkledditName);

    // inline svg because it's much easier to change svg colors this way
    return subscribed ?
      <svg className="main-page-subkleddit-list-subscribe-icon"
           fill="red"
           height="24"
           viewBox="0 0 24 24"
           width="24"
           xmlns="http://www.w3.org/2000/svg"
           onClick={onClick}
      >
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
      :
      <svg
        className="main-page-subkleddit-list-subscribe-icon"
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

  getDefaultSubkledditElements = () => {
    const {
      defaultSubkleddits,
    } = this.props;

    const {
      _isSubscribed,
      getSubscribeIcon
    } = this;

    let elements = [];

    elements.push(
      <div key={"A"} className="main-page-subkleddit-list-header-container">
        <span className="main-page-subkleddit-list-title">Default subkleddits</span>
      </div>
    );

    elements.push(
      <Divider key={"B"} className="main-page-subkleddit-list-divider"/>
    );

    const defaultSubkledditsElements = defaultSubkleddits.map((subkleddit, index) => {
      const subscribed = _isSubscribed(subkleddit.name);
      return <div key={index} className="main-page-subkleddit-list-element-container">
        <div>{subkleddit.name}</div>
        <div className="main-page-subkleddit-list-element-subscribers-container">
          ({subkleddit.subscribers})
          {getSubscribeIcon(subscribed, subkleddit.name)}
        </div>
      </div>
    });

    elements = elements.concat(defaultSubkledditsElements);

    return elements;
  };

  render() {
    const {
      getDefaultSubkledditElements
    } = this;

    return (
      <div className="main-page-subkleddit-list-container">
        {getDefaultSubkledditElements()}
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    defaultSubkleddits: getDefaultSubkleddits(state),
    subscribedToSubkleddits: getSubscribedToSubkleddits(state),
    isLoggedIn: isLoggedIn(state)
  };
};

export default connect(mapStateToProps, {...userActions, ...mainActions})(SubkledditListContainer);