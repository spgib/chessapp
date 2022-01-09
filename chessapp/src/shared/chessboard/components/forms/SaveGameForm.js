import React, { useState } from 'react';

import Input from '../../../components/formElements/Input';
import { VALIDATOR_MAXLENGTH, VALIDATOR_REQUIRE } from '../../../util/validators';

import './SaveGameForm.css';

const SaveGameForm = (props) => {
  const [title, setTitle] = useState('');
  const [titleIsValid, setTitleIsValid] = useState(false);
  const [wPlayer, setWPlayer] = useState('');
  const [bPlayer, setBPlayer] = useState('');
  const [desc, setDesc] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    if (!titleIsValid) return;
    else {
      props.onSubmit(title.trim(), wPlayer.trim(), bPlayer.trim(), desc.trim());
    }
    props.onClose();
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
      />
      <Input
        label='White Player'
        id='white-player'
        name='white-player'
        type='text'
        invalidText='Please enter the name of the player playing white.'
        validators={[]}
      />
      <Input
        label='Black Player'
        id='black-player'
        name='black-player'
        type='text'
        invalidText='Please enter the name of the player playing black.'
        validators={[]}
      />
      <Input
        element='textarea'
        label='Description'
        id='description'
        name='description'
        invalidText='Please enter a short description of the game (no more than 50 characters).'
        validators={[VALIDATOR_MAXLENGTH(50)]}
      />
      <p>Fields marked with * are required.</p>
      <button type='submit'>SAVE</button>
    </form>
  );
};

export default SaveGameForm;
