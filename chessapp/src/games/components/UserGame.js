import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../shared/components/formElements/Button';
import viewIcon from '../../shared/assets/icons/view.svg';
import editIcon from '../../shared/assets/icons/edit.svg';
import deleteIcon from '../../shared/assets/icons/delete.svg';
import Modal from '../../shared/components/UIElements/Modal';
import SaveGameForm from '../../shared/chessboard/components/forms/SaveGameForm';
import { AuthContext } from '../../store/context/auth-context';
import useHttp from '../../shared/hooks/useHttp';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import './UserGame.css';

const UserGame = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendReq, clearError } = useHttp();
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const deleteGame = async () => {
    try {
      await sendReq(
        `http://localhost:5000/api/games/${props.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token,
        }
      );

      props.onDelete(props.id);
    } catch (err) {}
  };

  const reviewHandler = () => {
    if (props.access === 'public') {
      navigate(`/public/${props.id}`);
    } else if (props.access === 'user') {
      navigate(`/user/${props.id}`);
    }
  };

  const openEditHandler = () => {
    setShowEditModal(true);
  };

  const closeEditHandler = () => {
    setShowEditModal(false);
  };

  const submitEditHandler = async (game) => {
    try {
      await sendReq(
        `http://localhost:5000/api/games/${props.id}`,
        'PATCH',
        JSON.stringify({ gameObject: game, title: game.title }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );

      props.onEdit(game, props.id);

      setShowEditModal(false);
    } catch (err) {}
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
      {error && <ErrorModal message={error} clear={clearError} />}
      {isLoading && <LoadingSpinner />}
      <li key={props.id} className='gamelist__item'>
        <div className='gamelist__item-info'>
          <h4>{props.title}</h4>
          <p>
            {props.wPlayer ? props.wPlayer : 'Unknown'} vs.{' '}
            {props.bPlayer ? props.bPlayer : 'Unknown'}, {props.turns} turns,{' '}
            {props.winner ? props.winner : 'ongoing'}
          </p>
          {props.description && <p>{props.description}</p>}
          {props.username && (
            <p className='gamelist__item-author'>
              Created by: {props.username}
            </p>
          )}
        </div>
        <div className='gamelist__item-actions'>
          <button
            type='button'
            className='gamelist__button-view'
            onClick={reviewHandler}
          >
            <img src={viewIcon} alt='View icon' />
          </button>
          {props.isUser && (
            <button
              type='button'
              className='gamelist__button-edit'
              onClick={openEditHandler}
            >
              <img src={editIcon} alt='Edit icon' />
            </button>
          )}
          {props.isUser && (
            <button
              type='button'
              className='gamelist__button-delete'
              onClick={openDeleteModal}
            >
              <img src={deleteIcon} alt='Delete icon' />
            </button>
          )}
        </div>
      </li>
      {!props.isListEnd && <hr />}
      {showEditModal && !error && (
        <Modal onClick={closeEditHandler}>
          <SaveGameForm
            onSubmit={submitEditHandler}
            initialValues={editDataObject}
            activePlay={!props.winner}
          />
        </Modal>
      )}
      {showDeleteModal && !error && (
        <Modal className='delete-modal' onClick={closeDeleteModal}>
          <h2>Are you sure?</h2>
          <p>This game will be deleted permanently. Do you wish to continue?</p>
          <div className='delete-modal__actions'>
            <Button onClick={closeDeleteModal}>Cancel</Button>
            <Button onClick={deleteGame} danger>
              Delete
            </Button>
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default UserGame;
