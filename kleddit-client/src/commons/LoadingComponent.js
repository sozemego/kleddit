import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {LinearProgress} from 'material-ui';

const progressStyle = {
  top: "-6px"
};

const invisibleProgressStyle = Object.assign({}, {
  visibility: "hidden"
}, progressStyle);

/**
 * This is an attempt to make an universal component,
 * which will wrap clickable elements,
 * display a load animation and prevent more clicks
 * until the 'loading' action is resolved.
 *
 * This component will wrap at most one component.
 * The reason is we want to catch the onClick event from that one
 * component and stop loading animation when it's resolved.
 * This also required that if we want the loading animation,
 * we need the onClick handler to be a promise.
 */
export class LoadingComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  onClick = () => {
    const { toggleLoading } = this;
    const { onClick } = this.props;
    const { loading } = this.state;
    if(!loading && onClick) {
      const result = onClick();
      if(result && result.then && typeof result.then === 'function') {
        toggleLoading();
        result.then(() => toggleLoading());
      }
    }
  };

  toggleLoading = () => {
    this.setState({loading: !this.state.loading});
  };

  validateChildren = () => {
    const {
      children
    } = this.props;

    if(React.Children.toArray(children).length > 1) {
      throw new Error('This component can only wrap one child element!');
    }
  };

  render() {
    this.validateChildren();

    const {
      onClick
    } = this;

    const {
      children
    } = this.props;

    const {
      loading,
    } = this.state;

    return (
      <div onClick={onClick}>
        {children}
        <div style={{display: 'flex', height: '2px'}}>
          <LinearProgress mode="indeterminate" style={loading ? progressStyle : invisibleProgressStyle}/>
        </div>
      </div>
    )
  }

}

LoadingComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};