import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {List, Subheader, Divider} from 'material-ui';
import {SubscribeIcon} from './SubscribeIcon';


export class LeftMainPageSidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loadingSubscribeIcons: []
    }
  }

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
      return <div key={index} className="main-page-subkleddit-list-element-container">
        <div>{subkleddit.name}</div>
        <div className="main-page-subkleddit-list-element-subscribers-container">
          ({subkleddit.subscribers})
          {getSubscribeIcon(subkleddit.name)}
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

    return (
      <div className={getContainerClassNames()}>
        <List className={getListClassNames()} children={getSubkledditElements()}/>
        <div className={getSideButtonClassNames()}
             onClick={toggleLeftSidebarVisibility}>
        </div>
      </div>
    );
  }

}

LeftMainPageSidebar.propTypes = {
  subscribedToSubkleddits: PropTypes.array.isRequired,
  onSubscribeClicked: PropTypes.func.isRequired,
  onUnsubscribeClicked: PropTypes.func.isRequired,
};

LeftMainPageSidebar.defaultProps = {

};