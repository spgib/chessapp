import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Chessboard from '../../shared/chessboard/Chessboard';
import { AuthContext } from '../../store/context/auth-context';
import useHttp from '../../shared/hooks/useHttp';

const Main = () => {
  const [loadedGame, setLoadedGame] = useState(null);
  const sendReq = useHttp();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();

  const publicGameId = params.publicGameId;
  const userGameId = params.userGameId;
  const gameId = publicGameId ? publicGameId : userGameId;
  
  useEffect(() => {
    const fetchGame = async () => {
      let gameData;
      if (publicGameId) {
        gameData = await sendReq(`http://localhost:5000/api/games/public/${publicGameId}`);
      }

      if (userGameId) {
        gameData = await sendReq(`http://localhost:5000/api/games/user/${userGameId}`, 'GET', null, { Authorization: 'Bearer ' + auth.token })
      }

      if (gameId === undefined) {
        return;
      }

      setLoadedGame(gameData.game);
    };

    fetchGame();
  }, [auth.token, gameId, publicGameId, userGameId, sendReq, setLoadedGame]);

  const saveGame = async (gameObject) => {
    if (!auth.userId) return;

    const game = {
      ...gameObject,
      userId: auth.userId,
    };

    if (loadedGame) {
      await sendReq(
        `http://localhost:5000/api/games/${gameId}`,
        'PATCH',
        JSON.stringify({ gameObject: game, title: game.title }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );

      navigate(`/games/${auth.userId}`);
    } else {
      await sendReq(
        'http://localhost:5000/api/games/',
        'SAVE',
        JSON.stringify({
          gameObject: game,
          title: game.title,
          string: game.string,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );

      navigate(`/games/${auth.userId}`);
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
