import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class PropsPrinter extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {Object.entries(this.props).map(([key, value]) => {
          return <div style={{display: "flex", flexDirection: "row"}}>
            <div>
              {key}
            </div>
            <div style={{width: "12px"}}>:</div>
            <div>
              {value}
            </div>
          </div>
        })}
      </div>
    );
  }

}

PropsPrinter.propTypes = {};

PropsPrinter.defaultProps = {};