import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import UserGame from '../components/UserGame';

const DUMMY_GAMES = [
  {
    id: 1,
    title: 'A sample game',
    wPlayer: 'me',
    bPlayer: 'someone else',
    description: 'a very clever strategy',
    turns: 11,
    victoryState: {
      checkmate: true,
      resignation: false,
      winner: '1-0',
    },
    string:
      'e4 d5 exd5 Qd6 Qf3 Qe6+ dxe6 a6 Qc6+ Bd7 exd7+ Nxd7 Qxc7 Nb6 a3 Ra7 Qxb6 a5 Qc7 b6 Qc8#',
  },
];

const UserGames = (props) => {
  const [games, setGames] = useState(DUMMY_GAMES);
  const navigate = useNavigate();

  const reviewGame = (id) => {
    navigate(`/games/you/${id}`);
  };

  const deleteGame = (id) => {
    setGames((prev) => {
      return prev.filter((game) => game.id !== id);
    });
  };

  let content;

  if (games.length > 0) {
    content = games.map((game) => {
      return (
        <UserGame
          id={game.id}
          key={game.id}
          title={game.title}
          wPlayer={game.wPlayer}
          bPlayer={game.bPlayer}
          victoryState={game.victoryState}
          description={game.description}
          onDelete={deleteGame}
          onReview={reviewGame}
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

export default UserGames;
