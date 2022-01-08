import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Chessboard from '../../shared/chessboard/Chessboard';

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

const Main = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  const gameId = params.gameId;
  let gameToLoad;
  if (gameId) {
    gameToLoad = DUMMY_GAMES.find((game) => game.id === gameId);
  }

  const saveGame = (gameObject) => {
    console.log(gameObject);

    navigate('/games/you');
  };

  return <Chessboard onSaveGame={saveGame} gameToLoad={gameToLoad} />;
};

export default Main;
