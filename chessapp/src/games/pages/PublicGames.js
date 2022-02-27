import React, { useEffect, useState } from 'react';

import UserGame from '../components/UserGame';
import useHttp from '../../shared/hooks/useHttp';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import './gamelist.css';

const PublicGames = () => {
  const [games, setGames] = useState([]);
  const { isLoading, error, sendReq, clearError } = useHttp();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesData = await sendReq(
          process.env.REACT_APP_BACKEND_URL + '/games/list/public'
        );

        setGames(gamesData.publicGames);
      } catch (err) {}
    };

    fetchGames();
  }, [setGames, sendReq]);

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
          public={true}
          username={game.username}
          isListEnd={index === games.length - 1}
          access='public'
        />
      );
    });
  }

  return (
    <React.Fragment>
      {error && <ErrorModal message={error} clear={clearError} />}
      {isLoading && <LoadingSpinner />}
      {!content && !isLoading && (
        <h2 className='gamelist__default-text'>
          No games found! Go play some chess!
        </h2>
      )}
      {content && (
        <div className='gamelist'>
          <ul>{content}</ul>
        </div>
      )}
    </React.Fragment>
  );
};

export default PublicGames;
