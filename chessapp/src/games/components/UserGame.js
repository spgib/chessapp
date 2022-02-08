import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import Modal from '../../shared/components/UIElements/Modal';
import Button from '../../shared/components/formElements/Button';
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

  const deleteHandler = async () => {
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
      <Card className='gamelist__item'>
        <li key={props.id}>
          <h3>{props.title}</h3>
          <hr />
          <h4>
            {props.wPlayer ? props.wPlayer : 'Unknown'} vs.{' '}
            {props.bPlayer ? props.bPlayer : 'Unknown'}, {props.turns} turns,{' '}
            {props.winner ? props.winner : 'ongoing'}
          </h4>
          {props.description && <p>{props.description}</p>}

          <Button type='button' onClick={reviewHandler}>
            {props.winner ? 'VIEW' : 'CONTINUE'}
          </Button>
          {props.isUser && (
            <Button type='button' onClick={deleteHandler}>
              DELETE
            </Button>
          )}
          {props.isUser && (
            <Button type='button' onClick={openEditHandler}>
              EDIT
            </Button>
          )}
        </li>
      </Card>
      {showEditModal && !error && (
        <Modal onClick={closeEditHandler}>
          <SaveGameForm
            onSubmit={submitEditHandler}
            initialValues={editDataObject}
            activePlay={!props.winner}
          />
        </Modal>
      )}
    </React.Fragment>
  );
};

export default UserGame;
