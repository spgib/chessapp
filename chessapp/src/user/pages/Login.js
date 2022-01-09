import React from 'react';

import Input from '../../shared/components/formElements/Input';

import './auth.css';

const Login = (props) => {
  return (
    <React.Fragment>
      <h2>Login</h2>
      <form>
        <Input
          id='email'
          name='email'
          label='Email'
          type='email'
          invalidText='Please enter the email address associated with your account.'
        />
        <Input id='password' name='password' label='Password' type='password' invalidText='Please enter your password (at least 6 characters).' />
        <button type='submit'>LOGIN</button>
      </form>
    </React.Fragment>
  );
};

export default Login;
