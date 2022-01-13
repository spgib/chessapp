import React, {useContext} from 'react';
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
    auth.updateGames(auth.games.push(gameObject));

    navigate('/games/you');
  };

  return <Chessboard onSaveGame={saveGame} gameToLoad={gameToLoad} />;
};

export default Main;
