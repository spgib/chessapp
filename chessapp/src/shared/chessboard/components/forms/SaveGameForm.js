import React from 'react';

import Input from '../../../components/formElements/Input';
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_REQUIRE,
} from '../../../util/validators';
import useForm from '../../../hooks/useForm';

import './SaveGameForm.css';

const SaveGameForm = (props) => {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      wPlayer: {
        value: '',
        isValid: false,
      },
      bPlayer: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );
  
  const submitHandler = (e) => {
    e.preventDefault();

    console.log(formState);
  };

  return (
    <form className='save-game-form' onSubmit={submitHandler}>
      <Input
        label='Title*'
        id='title'
        name='title'
        type='text'
        invalidText='Please enter a title for this match.'
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      />
      <Input
        label='White Player'
        id='wPlayer'
        name='white-player'
        type='text'
        invalidText='Please enter the name of the player playing white.'
        validators={[]}
        onInput={inputHandler}
      />
      <Input
        label='Black Player'
        id='bPlayer'
        name='black-player'
        type='text'
        invalidText='Please enter the name of the player playing black.'
        validators={[]}
        onInput={inputHandler}
      />
      <Input
        element='textarea'
        label='Description'
        id='description'
        name='description'
        invalidText='Please enter a short description of the game (no more than 50 characters).'
        validators={[VALIDATOR_MAXLENGTH(50)]}
        onInput={inputHandler}
      />
      <p>Fields marked with * are required.</p>
      <button type='submit'>SAVE</button>
    </form>
  );
};

export default SaveGameForm;
