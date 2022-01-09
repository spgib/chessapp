import React from 'react';

import Input from '../../shared/components/formElements/Input';

import './auth.css';

const Signup = (props) => {
  return (
    <React.Fragment>
      <h2>Sign Up</h2>
    <form>
      <Input
        id='name'
        name='name'
        label='Name'
        type='text'
        invalidText='Please enter your name.'
      />
      <Input
        id='email'
        name='email'
        label='Email Address'
        type='email'
        invalidText='Please enter a valid email address.'
      />
      <Input
        id='password'
        name='password'
        label='Password'
        type='password'
        invalidText='Please enter a password (at least 6 characters).'
      />
      <Input
        id='verify-password'
        name='password'
        label='Re-enter Password'
        type='password'
        invalidText='Please enter the same password as you entered above.'
      />
      <button type='submit'>SIGN UP</button>
    </form>
    </React.Fragment>
  );
};

export default Signup;
