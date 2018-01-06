import React, { Component } from 'react';
import Radium from 'radium';

const styles = {
  propContainer: {
    display: "flex",
    flexDirection: "row",
  },
  separator: {
    width: "12px",
  },
};

class PropsPrinter extends Component {

  render() {
    return (
      <div>
        {Object.entries(this.props).map(([key, value]) => {
          return <div style={styles.propContainer} key={key}>
            <div>
              {key}
            </div>
            <div style={styles.separator}>:</div>
            <div>
              {value}
            </div>
          </div>
        })}
      </div>
    );
  }

}

PropsPrinter.propTypes = {

};

PropsPrinter.defaultProps = {

};

export default Radium(PropsPrinter);