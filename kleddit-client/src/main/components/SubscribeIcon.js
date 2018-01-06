import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ContentClear from 'material-ui/svg-icons/content/clear';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import './subscribe-icon.css';

const styles = {
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
  subscribeIcon: {
    opacity: '0.65',
  },
  subscribeIconLoading: {
    animationName: 'subscribe-icon-loading-animation',
    animationDuration: '0.5s',
    animationIterationCount: 'infinite',
  },
  subscribeIconHover: {
    opacity: '1',
  },
};

export class SubscribeIcon extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      hover: false,
    };
  }

  onClick = () => {
    const { toggleLoading } = this;
    const { onClick, subkledditName } = this.props;
    const { loading } = this.state;

    if (!loading && onClick) {
      const result = onClick(subkledditName);
      if (result && result.then && typeof result.then === 'function') {
        toggleLoading();
        result.then(() => toggleLoading());
      }
    }
  };

  toggleLoading = () => {
    this.setState({ loading: !this.state.loading });
  };

  onMouseEnter = () => {
    this.setState({hover: true});
  };

  onMouseLeave = () => {
    this.setState({hover: false});
  };

  render() {
    const {
      onClick,
    } = this;

    const {
      subscribed,
    } = this.props;

    const {
      loading,
      hover,
    } = this.state;

    let style = loading ? styles.subscribeIconLoading: styles.subscribeIcon;
    style = hover ? Object.assign({}, style, styles.subscribeIconHover) : style;

    return subscribed ?
           <ContentClear onClick={onClick}
                         color="red"
                         style={style}
                         onMouseEnter={this.onMouseEnter}
                         onMouseLeave={this.onMouseLeave}
           />
           :
           <ContentAddCircle onClick={onClick}
                             color="#3f51b5"
                             onMouseEnter={this.onMouseEnter}
                             onMouseLeave={this.onMouseLeave}
                             style={style}/>;
  }

}

SubscribeIcon.propTypes = {
  subkledditName: PropTypes.string.isRequired,
  subscribed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};