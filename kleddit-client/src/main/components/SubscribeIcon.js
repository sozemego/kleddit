import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ContentClear from 'material-ui/svg-icons/content/clear';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';

export class SubscribeIcon extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  onClick = () => {
    const { toggleLoading } = this;
    const { onClick, subkledditName } = this.props;
    const { loading } = this.state;

    if(!loading && onClick) {
      const result = onClick(subkledditName);
      if(result && result.then && typeof result.then === 'function') {
        toggleLoading();
        result.then(() => toggleLoading());
      }
    }
  };

  toggleLoading = () => {
    this.setState({loading: !this.state.loading});
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
    } = this.state;

    const classNames = "main-page-subkleddit-list-subscribe-icon " + (loading ? "main-page-subkleddit-list-subscribe-icon-loading": "");

    return subscribed ?
      <ContentClear onClick={onClick}
                    color="red"
                    className={classNames}/>
      :
      <ContentAddCircle onClick={onClick}
                        color="#3f51b5"
                        className={classNames}/>
  }

}

SubscribeIcon.propTypes = {
  subkledditName: PropTypes.string.isRequired,
  subscribed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};