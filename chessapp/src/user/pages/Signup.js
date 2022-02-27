import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../../shared/components/formElements/Input';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/formElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import useForm from '../../shared/hooks/useForm';
import useHttp from '../../shared/hooks/useHttp';
import { AuthContext } from '../../store/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import './auth.css';

const Signup = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendReq, clearError } = useHttp();
  const [formState, inputHandler] = useForm(
    {
      username: {
        value: '',
        isValid: false,
      },
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

    const { username, email, password } = formState.inputs;

    let userData;
    try {
      userData = await sendReq(
        'http://localhost:5000/api/users/signup',
        'POST',
        JSON.stringify({
          username: username.value,
          email: email.value,
          password: password.value,
        }),
        { 'Content-Type': 'application/json' }
      );

      const { username: resUsername, token, userId } = userData;
      auth.login(userId, resUsername, token);
      navigate('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      {error && <ErrorModal clear={clearError} message={error} />}
      {isLoading && <LoadingSpinner />}
      <Card className='auth'>
        <h2>Sign Up</h2>
        <hr />
        <form onSubmit={formSubmitHandler}>
          <Input
            id='username'
            name='username'
            label='Username'
            type='text'
            invalidText='Please enter a username for your account.'
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <Input
            id='email'
            name='email'
            label='Email Address'
            type='email'
            invalidText='Please enter a valid email address.'
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
            onInput={inputHandler}
          />
          <Input
            id='password'
            name='password'
            label='Password'
            type='password'
            invalidText='Please enter a password (at least 6 characters).'
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
            onInput={inputHandler}
          />
          <Button type='submit' disabled={!formState.formIsValid}>
            SIGN UP
          </Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default Signup;
