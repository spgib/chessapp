import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Chessboard from '../../shared/chessboard/Chessboard';
import { AuthContext } from '../../store/context/auth-context';

const Main = () => {
  const [loadedGame, setLoadedGame] = useState(null);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();

  const gameId = params.gameId;

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const game = await fetch(`http://localhost:5000/api/games/${gameId}`);

        const gameData = await game.json();

        if (!game.ok) {
          throw new Error(gameData.message);
        }
        
        setLoadedGame(gameData.game);
      } catch (err) {
        console.log(err);
      }
    };

    if (!gameId) return;
    fetchGame();
  }, [gameId, setLoadedGame]);
  
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

  return <Chessboard onSaveGame={saveGame} gameToLoad={loadedGame} />;
};

export default Main;
