import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './form.css';
import {LinearProgress, RaisedButton} from 'material-ui';

const buttonStyle = {
  margin: "4px",
  whiteSpace: "normal",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const buttonLabelStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  minHeight: "36px"
};

const fetchingButtonStyle = Object.assign({}, {
  opacity: '0.5'
}, buttonStyle);


const progressStyle = {
  top: "-4px"
};

const invisibleProgressStyle = Object.assign({}, {
  display: "none"
}, progressStyle);


export class FormSubmitButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  toggleLoading = () => {
    this.setState({loading: !this.state.loading});
  };

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

  render() {
    const { onClick } = this;
    const { loading } = this.state;
    const buttonProps = _.omit(this.props, ['onClick', 'style']);

    return (
      <div>
        <RaisedButton {...buttonProps}
                      style={loading ? fetchingButtonStyle : buttonStyle}
                      className="form-submit-button"
                      labelStyle={buttonLabelStyle}
                      onClick={onClick}
        />
        <div style={{display: "flex", height: "2px"}}>
          <LinearProgress mode="indeterminate" style={loading ? progressStyle : invisibleProgressStyle}/>
        </div>

      </div>
    );
  }

}

FormSubmitButton.propTypes = {
  label: PropTypes.string.isRequired,
  /**
   * If onClick returns a promise, this button
   * will show a progress bar until the promise resolves.
   */
  onClick: PropTypes.func
};