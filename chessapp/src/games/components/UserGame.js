import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '../../shared/components/UIElements/Modal';
import SaveGameForm from '../../shared/chessboard/components/forms/SaveGameForm';
import { AuthContext } from '../../store/context/auth-context';

import './UserGame.css';

const UserGame = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [showEditModal, setShowEditModal] = useState(false);

  const deleteHandler = () => {
    props.onDelete(props.id);
  };

  const reviewHandler = () => {
    navigate(`/${props.id}`);
  };

  const openEditHandler = () => {
    setShowEditModal(true);
  };

  const closeEditHandler = () => {
    setShowEditModal(false);
  };

  const submitEditHandler = (game) => {
    const gameIndex = auth.games.findIndex((g) => g.id === props.id);
    const newGamesList = [...auth.games];
    const editedGame = {
      ...newGamesList[gameIndex],
      title: game.title,
      wPlayer: game.wPlayer,
      bPlayer: game.bPlayer,
      description: game.description,
      public: game.public,
    };
    newGamesList[gameIndex] = editedGame;

    auth.updateGames(newGamesList);
    setShowEditModal(false);
  };

  const editDataObject = {
    title: props.title,
    wPlayer: props.wPlayer ? props.wPlayer : '',
    bPlayer: props.bPlayer ? props.bPlayer : '',
    description: props.description ? props.description : '',
    public: props.public,
  };

  return (
    <React.Fragment>
      <li key={props.id} className='gamelist__item'>
        <h2>{props.title}</h2>
        {props.userName && <h2>{props.userName}</h2>}
        <h3>
          {props.wPlayer ? props.wPlayer : 'Unknown'} vs.{' '}
          {props.bPlayer ? props.bPlayer : 'Unknown'}
        </h3>
        <h3>{props.turns} turns</h3>
        <h3>Outcome: {props.winner ? props.winner : 'ongoing'}</h3>
        {props.description && <p>{props.description}</p>}
        <button type='button' onClick={reviewHandler}>
          {props.winner ? 'VIEW' : 'CONTINUE'}
        </button>
        {props.isUser && (
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
      {showEditModal && (
        <Modal onClick={closeEditHandler}>
          <SaveGameForm
            onSubmit={submitEditHandler}
            initialValues={editDataObject}
          />
        </Modal>
      )}
    </React.Fragment>
  );
};

export default UserGame;
