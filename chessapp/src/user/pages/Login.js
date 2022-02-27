import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../shared/components/formElements/Button';
import Input from '../../shared/components/formElements/Input';
import useForm from '../../shared/hooks/useForm';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import { AuthContext } from '../../store/context/auth-context';
import useHttp from '../../shared/hooks/useHttp';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Card from '../../shared/components/UIElements/Card';

import './auth.css';

const Login = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendReq, clearError } = useHttp();
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

    let userData;
    try {
      userData = await sendReq(
        process.env.REACT_APP_BACKEND_URL + '/users/login',
        'POST',
        JSON.stringify({ email: email.value, password: password.value }),
        { 'Content-Type': 'application/json' }
      );
      const { userId, username, token } = userData;
      auth.login(userId, username, token);
      navigate('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      {error && <ErrorModal message={error} clear={clearError} />}
      {isLoading && <LoadingSpinner />}
      <Card className='auth'>
        <h2>Login</h2>
        <hr></hr>
        <form onSubmit={formSubmitHandler} className='auth__form'>
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
          <Button type='submit' disabled={!formState.formIsValid}>
            LOGIN
          </Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default Login;
