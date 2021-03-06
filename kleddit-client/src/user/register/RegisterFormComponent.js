import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form } from '../../commons/components/form/Form';
import { FormInputField } from '../../commons/components/form/FormInputField';
import { FormSubmitButton } from '../../commons/components/form/FormSubmitButton';

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    marginTop: '48px',
  },
};

export class RegisterFormComponent extends Component {

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
      usernameRegistrationError,
      passwordRegistrationError,
    } = this.props;

    const {
      username,
      password,
    } = this.state;

    return (
      <div style={styles.container}>
        <Form title="Register">
          <FormInputField value={username}
                          onChange={onUsernameChange}
                          hintText='Username'
                          errorText={usernameRegistrationError}
          />
          <FormInputField value={password}
                          type='password'
                          hintText='Password'
                          errorText={passwordRegistrationError}
                          onChange={onPasswordChange}
          />
          <FormSubmitButton onClick={onSubmit}
                            label='Register'
                            secondary={true}
          />
        </Form>
      </div>

    );
  }
}

RegisterFormComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
};