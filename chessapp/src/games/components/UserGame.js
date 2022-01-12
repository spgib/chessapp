import React, { useState } from 'react';

import Modal from '../../shared/components/UIElements/Modal';
import SaveGameForm from '../../shared/chessboard/components/forms/SaveGameForm';

import './UserGame.css';

const UserGame = (props) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const deleteHandler = () => {
    props.onDelete(props.id);
  };

  const reviewHandler = () => {
    props.onReview(props.id);
  };

  const openEditHandler = () => {
    setShowEditModal(true);
  };

  const closeEditHandler = () => {
    setShowEditModal(false);
  }

  const submitEditHandler = (title, wPlayer, bPlayer, description, isPublic) => {
    props.onEdit(props.id, title, wPlayer, bPlayer, description, isPublic)
  };

  return (
    <React.Fragment>
    <li key={props.id} className='gamelist__item'>
      <h2>{props.title}</h2>
      {props.userId && <h2>{props.userId}</h2>}
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
        {props.isPublic
          ? 'VIEW'
          : props.victoryState.winner
          ? 'REVIEW'
          : 'CONTINUE'}
      </button>
      {!props.isPublic && (
        <button type='button' onClick={deleteHandler}>
          DELETE
        </button>
      )}
      {props.isUser && (
        <button type='button' onClick={openEditHandler}>
          EDIT
        </button>
      )}
    </li>
    {showEditModal && <Modal onClick={closeEditHandler}><SaveGameForm onSubmit={submitEditHandler}/></Modal>}
    </React.Fragment>
  );
};

export default UserGame;
