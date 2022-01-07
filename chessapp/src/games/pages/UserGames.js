import React from 'react';

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
  const content = DUMMY_GAMES.map((game) => {
    return (
      <li key={game.id} className='gamelist__item'>
        <h2>{game.title}</h2>
        <h3>
          {game.wPlayer ? game.wPlayer : 'Unknown'} vs.{' '}
          {game.bPlayer ? game.bPlayer : 'Unknown'}
        </h3>
        <h3>
          Outcome:{' '}
          {game.victoryState.winner ? game.victoryState.winner : 'ongoing'}
        </h3>
        {game.description && <p>{game.description}</p>}
        <button type='button'>
          {game.victoryState.winner ? 'REVIEW' : 'CONTINUE'}
        </button>
        <button type='button'>DELETE</button>
      </li>
    );
  });

  return <ul className='gamelist'>{content}</ul>;
};

export default UserGames;
