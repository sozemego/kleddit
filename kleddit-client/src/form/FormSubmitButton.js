import React, {Component} from 'react';
import Button from 'material-ui/Button';

import './form.css';

export class FormSubmitButton extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      onClick,
      label
    } = this.props;

    return (
      <Button onClick={onClick}
              raised={true}
              color="primary"
              className="form-submit-button">
        {label}
      </Button>
    );
  }

}