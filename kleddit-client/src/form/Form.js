import React, {Component} from 'react';

import './form.css';
import Divider from 'material-ui/Divider';

export class Form extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      title,
      children
    } = this.props;

    if (!children || children.length === 0) {
      console.warn('Form without children, you probably did not want this.');
    }

    return (
      <div className="form-container">
        <div className="form-header">
          <span className="form-title">{title}</span>
        </div>
        <Divider className="form-divider" light={true}/>
        <div className="form-children-container">
          {this.props.children}
        </div>
      </div>
    );
  }

}