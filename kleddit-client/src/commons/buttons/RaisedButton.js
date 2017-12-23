import React, {Component} from 'react';
import _ from 'lodash';
import {LinearProgress, RaisedButton as MaterialUiRaisedButton} from 'material-ui';

import './buttons.css';

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
  // top: "-4px"
};

const invisibleProgressStyle = Object.assign({}, {
  visibility: "hidden"
}, progressStyle);


export class RaisedButton extends Component {

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
        <MaterialUiRaisedButton {...buttonProps}
                                style={loading ? fetchingButtonStyle : buttonStyle}
                                className="button"
                                labelStyle={buttonLabelStyle}
                                onClick={onClick}
                                labelPosition={"before"}
        >
          <div style={{display: 'flex', height: '2px'}}>
            <LinearProgress mode="indeterminate" style={loading ? progressStyle : invisibleProgressStyle}/>
          </div>
      </MaterialUiRaisedButton>
    );
  }

}