import React from 'react';

import Input from '../../shared/components/formElements/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import useForm from '../../shared/hooks/useForm';

import './auth.css';

const Signup = () => {
  const [formState, inputHandler] = useForm({
    name: {
      value: '',
      isValid: false
    },
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    },
    // verifyPassword: {
    //   value: '',
    //   isValid: false
    // }
  }, false)

  const formSubmitHandler = e => {
    e.preventDefault();

    console.log(formState);
  }

  return (
    <React.Fragment>
      <h2>Sign Up</h2>
    <form onSubmit={formSubmitHandler}>
      <Input
        id='name'
        name='name'
        label='Name'
        type='text'
        invalidText='Please enter your name.'
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
      {/* <Input
        id='verifyPassword'
        name='password'
        label='Re-enter Password'
        type='password'
        invalidText='Please enter the same password as you entered above.'
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH()]}
        onInput={inputHandler}
      /> */}
      <button type='submit' disabled={!formState.formIsValid}>SIGN UP</button>
    </form>
    </React.Fragment>
  );
};

export default Signup;
