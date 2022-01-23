import React, { useEffect, useState } from 'react';

import UserGame from '../components/UserGame';

const PublicGames = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const games = await fetch(
          'http://localhost:5000/api/games/list/public'
        );

        const gamesData = await games.json();

        if (!games.ok) {
          throw new Error(gamesData.message);
        }
        
        setGames(gamesData.publicGames);
      } catch (err) {
        console.log(err);
      }
    };

    fetchGames();
  }, [setGames]);

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
          userName={game.name}
        />
      );
    });
  }

  return (
    <React.Fragment>
      {content && <ul className='gamelist'>{content}</ul>}
      {!content && <h2>No games found! Go play some chess!</h2>}
    </React.Fragment>
  );
};

export default PublicGames;
