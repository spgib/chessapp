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
          'http://localhost:5000/api/games/list/public'
        );

        setGames(gamesData.publicGames);
      } catch (err) {}
    };

    fetchGames();
  }, [setGames, sendReq]);

  let content;

  if (games.length > 0) {
    content = games.map((game) => {
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
          access='public'
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

export default PublicGames;
