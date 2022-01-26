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

  const deleteHandler = async () => {
    try {
      const game = await fetch(`http://localhost:5000/api/games/${props.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + auth.token
        }
      });

      const gameData = await game.json();

      if (!game.ok) {
        throw new Error(gameData.message);
      }

      props.onDelete(props.id);
    } catch (err) {
      console.log(err);
    }

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

  const submitEditHandler = async (game) => {
    try {
      const edit = await fetch(`http://localhost:5000/api/games/${props.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        },
        body: JSON.stringify({ gameObject: game, title: game.title })
      });

      const editData = await edit.json();

      if (!edit.ok) {
        throw new Error(editData.message);
      }

      props.onEdit(game, props.id);
    } catch (err) {
      console.log(err);
    }
    
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
        {props.username && <h2>{props.username}</h2>}
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
