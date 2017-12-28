import React, {Component} from 'react';

import './form.css';
import Divider from 'material-ui/Divider';

export class Form extends Component {

  render() {
    const {
      title,
      children
    } = this.props;

    if (React.Children.toArray(children).length === 0) {
      console.warn('Form without children, you probably did not want this.');
    }

    return (
      <div className="form-container">
        {title ?
          <div className="form-header">
            <span className="form-title">{title}</span>
          </div>
          : null
        }
        <Divider className="form-divider"/>
        <div className="form-children-container">
          {this.props.children}
        </div>
      </div>
    );
  }

}