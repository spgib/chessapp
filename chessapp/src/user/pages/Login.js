import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../../shared/components/formElements/Input';
import useForm from '../../shared/hooks/useForm';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import { AuthContext } from '../../store/context/auth-context';
import useHttp from '../../shared/hooks/useHttp';

import './auth.css';

const Login = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const sendReq = useHttp();
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

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const { email, password } = formState.inputs;

    const userData = await sendReq(
      'http://localhost:5000/api/users/login',
      'POST',
      JSON.stringify({ email: email.value, password: password.value }),
      { 'Content-Type': 'application/json' }
    );
    const { userId, username, token } = userData;
    auth.login(userId, username, token);
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
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
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
