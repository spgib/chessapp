import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Chessboard from '../../shared/chessboard/Chessboard';
import { AuthContext } from '../../store/context/auth-context';

const Main = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();

  const gameId = parseInt(params.gameId);

  let gameToLoad;
  if (gameId) {
    gameToLoad = auth.games.find((game) => game.id === gameId);
  }

  const saveGame = (gameObject) => {
    let id;
    if (gameId) {
      id = gameId;
    } else {
      id = Math.random();
    }

    const game = {
      ...gameObject,
      userId: auth.userId,
      id,
    };

    const games = JSON.parse(JSON.stringify(auth.games));
    if (gameId) {
      const i = games.findIndex((game) => game.id === gameId);
      games[i] = game;
    } else {
      games.push(game);
    }

    auth.updateGames(games);

    navigate(`/games/${auth.userId}`);
  };

  return <Chessboard onSaveGame={saveGame} gameToLoad={gameToLoad} />;
};

export default Main;
