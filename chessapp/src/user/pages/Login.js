import React from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../../shared/components/formElements/Input';
import useForm from '../../shared/hooks/useForm';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';

import './auth.css';

const Login = (props) => {
  const navigate = useNavigate();
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const formSubmitHandler = (e) => {
    e.preventDefault();

    console.log(formState.inputs.email.value, formState.inputs.password.value);
    navigate('/');
  };

  return (
    <React.Fragment>
      <h2>Login</h2>
      <form onSubmit={formSubmitHandler}>
        <Input
          id='email'
          name='email'
          label='Email'
          type='email'
          invalidText='Please enter the email address associated with your account.'
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          onInput={inputHandler}
        />
        <Input
          id='password'
          name='password'
          label='Password'
          type='password'
          invalidText='Please enter your password (at least 6 characters).'
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <button type='submit' disabled={!formState.formIsValid}>
          LOGIN
        </button>
      </form>
    </React.Fragment>
  );
};

export default Login;
