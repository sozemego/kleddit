import React, { Component } from 'react';

import { FormInputField } from '../../commons/components/form/FormInputField';
import { Form } from '../../commons/components/form/Form';
import { FormSubmitButton } from '../../commons/components/form/FormSubmitButton';

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    marginTop: '48px',
  },
};


export class LoginFormComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  onUsernameChange = (username) => {
    const {
      onUsernameChange,
    } = this.props;

    onUsernameChange(username);
    this.setState({ username });
  };

  onPasswordChange = (password) => {
    const {
      onPasswordChange,
    } = this.props;

    onPasswordChange(password);
    this.setState({ password });
  };

  onSubmit = () => {
    const {
      onSubmit,
    } = this.props;

    const {
      username,
      password,
    } = this.state;

    return onSubmit(username, password);
  };

  render() {
    const {
      onUsernameChange,
      onPasswordChange,
      onSubmit,
    } = this;

    const {
      loginError,
    } = this.props;

    const {
      username,
      password,
    } = this.state;

    return (
      <div style={styles.container}>
        <Form title="Login">
          <FormInputField value={username}
                          onChange={onUsernameChange}
                          hintText="Username"
                          errorText={loginError}
          />
          <FormInputField value={password}
                          type="password"
                          hintText="Password"
                          onChange={onPasswordChange}
          />
          <FormSubmitButton onClick={onSubmit}
                            label="Login"
                            secondary
          />
        </Form>
      </div>
    );
  }

}