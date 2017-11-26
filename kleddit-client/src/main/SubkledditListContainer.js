import React, {Component} from 'react';
import {connect} from 'react-redux';
import subscribe from './subscribe.svg';
import {getDefaultSubkleddits, mainPageRoot} from './state/selectors';

class SubkledditListContainer extends Component {

  constructor(props) {
    super(props);
  }

  getDefaultSubkledditElements = () => {
    const {
      defaultSubkleddits
    } = this.props;

    return defaultSubkleddits.map((subkleddit, index) => {
      return <div key={index} className="main-page-subkleddit-list-element-container">
        <div>{subkleddit.name}</div>
        <div className="main-page-subkleddit-list-element-subscribers-container">
          ({subkleddit.subscribers})
          <img src={subscribe}/>
        </div>
      </div>
    });
  };

  render() {
    const {
      defaultSubkleddits
    } = this.props;

    const {
      getDefaultSubkledditElements
    } = this;

    return [
        getDefaultSubkledditElements()
    ];
  }

}

const mapStateToProps = (state) => {
  const mainRoot = mainPageRoot(state);
  return {
    defaultSubkleddits: getDefaultSubkleddits(mainRoot)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubkledditListContainer);