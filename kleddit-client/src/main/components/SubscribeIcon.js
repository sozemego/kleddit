import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class SubscribeIcon extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  onClick = () => {
    const {
      onClick,
      subscribed,
      subkledditName
    } = this.props;

    onClick(subscribed, subkledditName);
  };

  render() {

  }

}

SubscribeIcon.propTypes = {
  subkledditName: PropTypes.string.isRequired,
  subscribed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};