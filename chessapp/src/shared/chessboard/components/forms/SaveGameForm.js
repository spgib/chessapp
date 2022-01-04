import React, {useState} from 'react';

import './SaveGameForm.css';

const SaveGameForm = (props) => {
  const [title, setTitle] = useState('');
  const [wPlayer, setWPlayer] = useState('');
  const [bPlayer, setBPlayer] = useState('');
  const [desc, setDesc] = useState('');
  
  const submitHandler = (e) => {
    e.preventDefault();

    console.log(title, wPlayer, bPlayer, desc);
  };

  const titleChangeHandler = e => {
    setTitle(e.target.value);
  }

  const wPlayerChangeHandler = e => {
    setWPlayer(e.target.value);
  }

  const bPlayerChangeHandler = e => {
    setBPlayer(e.target.value);
  }

  const descChangeHandler = e => {
    setDesc(e.target.value);
  }

  return (
    <form className='save-game-form' onSubmit={submitHandler}>
      <label htmlFor='title'>Title</label>
      <input id='title' name='title' type='text'  onChange={titleChangeHandler} value={title}/>
      <label htmlFor='white-player'>White Player</label>
      <input id='white-player' name='white-player' type='text' onChange={wPlayerChangeHandler} value={wPlayer}/>
      <label htmlFor='black-player'>Black Player</label>
      <input id='black-player' name='black-player' type='text' onChange={bPlayerChangeHandler} value={bPlayer}/>
      <label htmlFor='Description'>Description</label>
      <textarea id='description' name='description' maxLength='200' onChange={descChangeHandler} value={desc} />
      <button type='submit'>SAVE</button>
    </form>
  );
};

export default SaveGameForm;
