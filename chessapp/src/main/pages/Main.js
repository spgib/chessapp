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

  const saveGame = async (gameObject) => {
    if (!auth.userId) return;

    const game = {
      ...gameObject,
      userId: auth.userId,
    };

    if (loadedGame) {
      try {
        const update = await fetch(
          `http://localhost:5000/api/games/${gameId}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + auth.token,
            },
            body: JSON.stringify({
              gameObject: game,
              title: game.title,
              string: game.string,
            }),
          }
        );

        const updateData = await update.json();

        if (!update.ok) {
          throw new Error(updateData.message);
        }

        navigate(`/games/${auth.userId}`);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const save = await fetch('http://localhost:5000/api/games/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token,
          },
          body: JSON.stringify({
            gameObject: game,
            title: game.title,
            string: game.string,
          }),
        });

        const saveData = await save.json();

        if (!save.ok) {
          throw new Error(saveData.message);
        }

        navigate(`/games/${auth.userId}`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const branchGame = () => {
    setLoadedGame(null);
  };

  return (
    <Chessboard
      onSaveGame={saveGame}
      gameToLoad={loadedGame}
      onBranch={branchGame}
    />
  );
};

export default Main;
