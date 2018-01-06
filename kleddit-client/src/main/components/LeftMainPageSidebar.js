import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider, List, Subheader } from 'material-ui';
import { SubscribeIcon } from './SubscribeIcon';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '186px',
    height: '100%',
    minHeight: 'calc(100vh - 67px)',
    borderRight: '1px solid white',
    borderRadius: '2px',
    backgroundColor: 'rgba(37, 37, 37, 1)',
    boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
  },
  subkledditListDivider: {
    width: '100%',
  },
  subkledditListElementContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2px 4px',
    height: '24px',
  },
  subkledditListElementSubscribersContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  subkledditListContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
  },
  mainPageSubkledditListHeaderContainer: {
    display: 'flex',
    width: '100%',
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  mainPageSubkledditListTitle: {
    padding: '6px 6px',
    backgroundColor: 'black',
  },
  mainPageSubkledditListSubscribeIcon: {
    opacity: '0.65',
  },
  mainPageSubkledditListSubscribeIconLoading: {
    animationName: 'subscribe-icon-loading-animation',
    animationDuration: '0.5s',
    animationIterationCount: 'infinite',
  },
  mainPageSubkledditListSubscribeIconHover: {
    opacity: '1',
  },
};

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
      <Divider key={'B'} style={styles.subkledditListDivider}/>,
    );

    const subkledditsElements = subkleddits.map((subkleddit, index) => {
      return <div key={index} style={styles.subkledditListElementContainer}>
        <div>{subkleddit.name}</div>
        <div style={styles.subkledditListElementSubscribersContainer}>
          ({subkleddit.subscribers})
          {getSubscribeIcon(subkleddit.name)}
        </div>
      </div>;
    });

    return elements.concat(subkledditsElements);
  };

  render() {
    const {
      getSubkledditElements,
    } = this;

    return (
      <div style={styles.container}>
        <List style={styles.subkledditListContainer} children={getSubkledditElements()}/>
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