import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import UserGame from '../components/UserGame';
import { AuthContext } from '../../store/context/auth-context';

const DUMMY_GAMES = [
  {
    id: 1,
    userId: 'Spencer',
    title: 'A sample game',
    wPlayer: 'me',
    bPlayer: 'someone else',
    description: 'a very clever strategy',
    turns: 10,
    victoryState: {
      checkmate: false,
      resignation: false,
      winner: null,
    },
    public: true,
    string:
      'e4 d5 exd5 Qd6 Qf3 Qe6+ dxe6 a6 Qc6+ Bd7 exd7+ Nxd7 Qxc7 Nb6 a3 Ra7 Qxb6 a5 Qc7 b6',
  },
  {
    id: 2,
    userId: 'Jasmin',
    title: 'A tremendous game',
    wPlayer: 'me',
    bPlayer: 'someone else',
    description: 'a very VERY clever strategy',
    turns: 10,
    victoryState: {
      checkmate: false,
      resignation: false,
      winner: null,
    },
    public: true,
    string:
      'e4 d5 exd5 Qd6 Qf3 Qe6+ dxe6 a6 Qc6+ Bd7 exd7+ Nxd7 Qxc7 Nb6 a3 Ra7 Qxb6 a5 Qc7 b6',
  },
  {
    id: 3,
    userId: 'Jasmin',
    title: 'A terrific game',
    wPlayer: 'me',
    bPlayer: 'someone else',
    description: 'a very VERY clever strategy',
    turns: 10,
    victoryState: {
      checkmate: false,
      resignation: false,
      winner: null,
    },
    public: false,
    string:
      'e4 d5 exd5 Qd6 Qf3 Qe6+ dxe6 a6 Qc6+ Bd7 exd7+ Nxd7 Qxc7 Nb6 a3 Ra7 Qxb6 a5 Qc7 b6',
  },
];

const UserGames = (props) => {
  const auth = useContext(AuthContext);
  const [games, setGames] = useState(DUMMY_GAMES.filter(game => game.userId === auth.userId));
  const navigate = useNavigate();

  const reviewGame = (id) => {
    navigate(`/${id}`);
  };

  const deleteGame = (id) => {
    setGames((prev) => {
      return prev.filter((game) => game.id !== id);
    });
  };

  const editGame = (id, title, wPlayer, bPlayer, description, isPublic) => {
    const game = games.filter(game => game.userId === id);
    const index = games.indexOf()
  };

  let content;

  if (games.length > 0) {
    content = games.map((game) => {
      return (
        <UserGame
          id={game.id}
          key={game.id}
          title={game.title}
          turns={game.turns}
          wPlayer={game.wPlayer}
          bPlayer={game.bPlayer}
          victoryState={game.victoryState}
          description={game.description}
          onDelete={deleteGame}
          onReview={reviewGame}
          onEdit={editGame}
          isUser={auth.isLoggedIn}
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
