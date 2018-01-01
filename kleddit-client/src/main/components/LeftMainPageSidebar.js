import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider, List, Subheader } from 'material-ui';
import { SubscribeIcon } from './SubscribeIcon';

import './left-main-page-sidebar.css';

export class LeftMainPageSidebar extends Component {

  isSubscribed = (subkledditName) => {
    return this.props.subscribedToSubkleddits.includes(subkledditName);
  };

  getSubscribeIcon = (subkledditName) => {
    const {
      onSubscribeClicked,
      onUnsubscribeClicked,
    } = this.props;

    const subscribed = this.isSubscribed(subkledditName);

    return <SubscribeIcon subscribed={subscribed}
                          subkledditName={subkledditName}
                          onClick={subscribed ? onUnsubscribeClicked : onSubscribeClicked}
    />;
  };

  getSubkledditElements = () => {
    const {
      subkleddits,
    } = this.props;

    const {
      getSubscribeIcon,
    } = this;

    let elements = [];

    elements.push(
      <Subheader key="A" inset={false}>Default subkleddits</Subheader>,
    );

    elements.push(
      <Divider key={'B'} className="main-page-subkleddit-list-divider"/>,
    );

    const subkledditsElements = subkleddits.map((subkleddit, index) => {
      return <div key={index} className="main-page-subkleddit-list-element-container">
        <div>{subkleddit.name}</div>
        <div className="main-page-subkleddit-list-element-subscribers-container">
          ({subkleddit.subscribers})
          {getSubscribeIcon(subkleddit.name)}
        </div>
      </div>;
    });

    return elements.concat(subkledditsElements);
  };

  getListClassNames = () => {
    const defaultClassNames = ['main-page-subkleddit-list-container'];

    return defaultClassNames.join(' ');
  };

  getContainerClassNames = () => {
    const defaultClassNames = ['main-page-sidebar-container'];

    return defaultClassNames.join(' ');
  };

  render() {
    const {
      getSubkledditElements,
      getListClassNames,
      getContainerClassNames,
    } = this;

    return (
      <div className={getContainerClassNames()}>
        <List className={getListClassNames()} children={getSubkledditElements()}/>
      </div>
    );
  }

}

LeftMainPageSidebar.propTypes = {
  subscribedToSubkleddits: PropTypes.array.isRequired,
  onSubscribeClicked: PropTypes.func.isRequired,
  onUnsubscribeClicked: PropTypes.func.isRequired,
};

LeftMainPageSidebar.defaultProps = {};