import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import UserGame from '../components/UserGame';
import { AuthContext } from '../../store/context/auth-context';
import useHttp from '../../shared/hooks/useHttp';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import './gamelist.css';

const UserGames = (props) => {
  const [games, setGames] = useState([]);
  const auth = useContext(AuthContext);
  const params = useParams();
  const { isLoading, error, sendReq, clearError } = useHttp();

  const uid = params.uid;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesData = await sendReq(
          `${process.env.REACT_APP_BACKEND_URL}/games/list/user/${uid}`,
          'GET',
          null,
          {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token,
          }
        );

        setGames(gamesData.userGames);
      } catch (err) {}
    };

    fetchGames();
  }, [setGames, uid, auth.token, sendReq]);

  const updateListDelete = (id) => {
    setGames((prev) => {
      return prev.filter((g) => g.id !== id);
    });
  };

  const updateListEdit = (game, id) => {
    const gameIndex = games.findIndex((g) => g.id === id);

    setGames((prev) => {
      const oldGame = prev[gameIndex];
      const editedGame = {
        ...oldGame,
        title: game.title,
        wPlayer: game.wPlayer,
        bPlayer: game.bPlayer,
        description: game.description,
        public: game.public,
      };

      const newGames = [...prev];

      newGames[gameIndex] = editedGame;
      return newGames;
    });
  };

  let content;
  if (games.length > 0) {
    content = games.map((game, index) => {
      return (
        
          <UserGame
            id={game.id}
            key={game.id}
            title={game.title}
            turns={game.turns}
            wPlayer={game.wplayer}
            bPlayer={game.bplayer}
            checkmate={game.checkmate}
            resignation={game.resignation}
            winner={game.winner}
            description={game.description}
            isUser={auth.isLoggedIn}
            public={game.public}
            access='user'
            isListEnd={index === games.length - 1}
            onDelete={updateListDelete}
            onEdit={updateListEdit}
          />
        
      );
    });
  }

  return (
    <React.Fragment>
      {error && <ErrorModal message={error} clear={clearError} />}
      {isLoading && <LoadingSpinner />}
      <div className='gamelist'>
        {content && <ul>{content}</ul>}
        {!content && !isLoading && <h2 className='gamelist__default-text'>No games found! Go play some chess!</h2>}
      </div>
    </React.Fragment>
  );
};

export default UserGames;
