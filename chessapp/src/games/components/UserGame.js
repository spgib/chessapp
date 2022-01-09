import React from 'react';

import './UserGame.css';

const UserGame = (props) => {
  const deleteHandler = () => {
    props.onDelete(props.id);
  };

  const reviewHandler = () => {
    props.onReview(props.id);
  };

  return (
    <li key={props.id} className='gamelist__item'>
      <h2>{props.title}</h2>
      <h3>
        {props.wPlayer ? props.wPlayer : 'Unknown'} vs.{' '}
        {props.bPlayer ? props.bPlayer : 'Unknown'}
      </h3>
      <h3>{props.turns} turns</h3>
      <h3>
        Outcome:{' '}
        {props.victoryState.winner ? props.victoryState.winner : 'ongoing'}
      </h3>
      {props.description && <p>{props.description}</p>}
      <button type='button' onClick={reviewHandler}>
        {props.victoryState.winner ? 'REVIEW' : 'CONTINUE'}
      </button>
      <button type='button' onClick={deleteHandler}>
        DELETE
      </button>
    </li>
  );
};

export default UserGame;
