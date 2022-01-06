import React, { useState } from 'react';

import Input from '../../../components/formElements/Input';

import './SaveGameForm.css';

const SaveGameForm = (props) => {
  const [title, setTitle] = useState('');
  const [titleIsValid, setTitleIsValid] = useState(false);
  const [titleIsTouched, setTitleIsTouched] = useState(false);
  const [wPlayer, setWPlayer] = useState('');
  const [bPlayer, setBPlayer] = useState('');
  const [desc, setDesc] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(title, wPlayer, bPlayer, desc);
  };

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);

    const input = e.target.value;
    if (input.trim() !== '') {
      setTitleIsValid(true);
    } else {
      setTitleIsValid(false);
    }
  };

  const titleBlurHandler = () => {
    setTitleIsTouched(true);
  };

  const wPlayerChangeHandler = (e) => {
    setWPlayer(e.target.value);
  };

  const bPlayerChangeHandler = (e) => {
    setBPlayer(e.target.value);
  };

  const descChangeHandler = (e) => {
    setDesc(e.target.value);
  };

  return (
    <form className='save-game-form' onSubmit={submitHandler}>
      <Input
        label='Title*'
        name='title'
        type='text'
        value={title}
        onChange={titleChangeHandler}
        onBlur={titleBlurHandler}
        invalidText='Please enter a title for this match.'
        valid={titleIsValid}
        touched={titleIsTouched}
      />
      <Input
        label='White Player'
        name='white-player'
        type='text'
        value={wPlayer}
        onChange={wPlayerChangeHandler}
      />
      <Input
        label='Black Player'
        name='black-player'
        type='text'
        value={bPlayer}
        onChange={bPlayerChangeHandler}
      />
      <Input
        element='textarea'
        label='Description'
        name='description'
        value={desc}
        onChange={descChangeHandler}
      />
      <p>Fields marked with * are required.</p>
      <button type='submit'>SAVE</button>
    </form>
  );
};

export default SaveGameForm;
